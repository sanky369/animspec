import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS, PACK_CREDITS, type PackType } from '@/types/database';
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-signature');

    if (!signature || !WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    const payload = await request.text();

    // Verify webhook signature
    if (!verifyWebhookSignature(payload, signature, WEBHOOK_SECRET)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const data = JSON.parse(payload);
    const eventName = data.meta.event_name;

    // Only process order_created events
    if (eventName !== 'order_created') {
      return NextResponse.json({ received: true });
    }

    const orderData = data.data;
    const orderId = orderData.id;
    const customData = data.meta.custom_data;
    const userId = customData?.user_id;
    const packType = customData?.pack_type as PackType;

    if (!userId || !packType) {
      console.error('Missing custom data in webhook:', customData);
      return NextResponse.json(
        { error: 'Missing user_id or pack_type' },
        { status: 400 }
      );
    }

    // Check for idempotency - make sure we haven't processed this order already
    const existingPurchase = await adminDb
      .collection(COLLECTIONS.PURCHASES)
      .where('lemonSqueezyOrderId', '==', orderId)
      .get();

    if (!existingPurchase.empty) {
      console.log('Order already processed:', orderId);
      return NextResponse.json({ received: true, duplicate: true });
    }

    const credits = PACK_CREDITS[packType];
    const amountCents = orderData.attributes.total;
    const currency = orderData.attributes.currency;

    // Get user profile
    const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);
    const profileSnap = await profileRef.get();

    if (!profileSnap.exists) {
      console.error('User profile not found:', userId);
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Add credits in a transaction
    await adminDb.runTransaction(async (transaction) => {
      const profileDoc = await transaction.get(profileRef);
      const currentBalance = profileDoc.data()?.creditsBalance ?? 0;
      const newBalance = currentBalance + credits;

      // Update profile
      transaction.update(profileRef, {
        creditsBalance: newBalance,
        isPaidUser: true,
        updatedAt: FieldValue.serverTimestamp(),
      });

      // Create purchase record
      const purchaseRef = adminDb.collection(COLLECTIONS.PURCHASES).doc();
      transaction.set(purchaseRef, {
        userId,
        packType,
        credits,
        amountCents,
        currency,
        lemonSqueezyOrderId: orderId,
        status: 'completed',
        createdAt: FieldValue.serverTimestamp(),
      });

      // Create credit transaction record
      const txRef = adminDb.collection(COLLECTIONS.CREDIT_TRANSACTIONS).doc();
      transaction.set(txRef, {
        userId,
        amount: credits,
        type: 'purchase',
        quality: null,
        description: `${packType.charAt(0).toUpperCase() + packType.slice(1)} Pack purchase`,
        analysisId: null,
        purchaseId: purchaseRef.id,
        createdAt: FieldValue.serverTimestamp(),
      });
    });

    console.log(`Added ${credits} credits to user ${userId} for order ${orderId}`);

    return NextResponse.json({ received: true, success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
