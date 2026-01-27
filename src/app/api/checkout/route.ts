import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS, PACK_CREDITS, PACK_PRICES, type PackType } from '@/types/database';

export const runtime = 'nodejs';

const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;
const LEMON_SQUEEZY_STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID;
const LEMON_SQUEEZY_CREATOR_VARIANT_ID = process.env.LEMON_SQUEEZY_CREATOR_VARIANT_ID;
const LEMON_SQUEEZY_PRO_VARIANT_ID = process.env.LEMON_SQUEEZY_PRO_VARIANT_ID;
const LEMON_SQUEEZY_TEST_MODE = process.env.LEMON_SQUEEZY_TEST_MODE === 'true';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const sessionCookie = request.cookies.get('__session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let userId: string;
    let userEmail: string;

    try {
      const decodedToken = await adminAuth.verifyIdToken(sessionCookie);
      userId = decodedToken.uid;
      userEmail = decodedToken.email || '';
    } catch {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const packType = body.packType as PackType;

    if (!packType || !['creator', 'pro'].includes(packType)) {
      return NextResponse.json({ error: 'Invalid pack type' }, { status: 400 });
    }

    // Check if Lemon Squeezy is configured
    if (!LEMON_SQUEEZY_API_KEY || !LEMON_SQUEEZY_STORE_ID) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    // Get variant ID for the pack
    const variantId =
      packType === 'creator'
        ? LEMON_SQUEEZY_CREATOR_VARIANT_ID
        : LEMON_SQUEEZY_PRO_VARIANT_ID;

    if (!variantId) {
      return NextResponse.json(
        { error: 'Product not configured' },
        { status: 500 }
      );
    }

    // Create Lemon Squeezy checkout
    const checkoutResponse = await fetch(
      'https://api.lemonsqueezy.com/v1/checkouts',
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${LEMON_SQUEEZY_API_KEY}`,
        },
        body: JSON.stringify({
          data: {
            type: 'checkouts',
            attributes: {
              checkout_data: {
                email: userEmail,
                custom: {
                  user_id: userId,
                  pack_type: packType,
                },
              },
              test_mode: LEMON_SQUEEZY_TEST_MODE,
              product_options: {
                redirect_url: `${APP_URL}/dashboard/account?success=true`,
              },
            },
            relationships: {
              store: {
                data: {
                  type: 'stores',
                  id: LEMON_SQUEEZY_STORE_ID,
                },
              },
              variant: {
                data: {
                  type: 'variants',
                  id: variantId,
                },
              },
            },
          },
        }),
      }
    );

    if (!checkoutResponse.ok) {
      const errorText = await checkoutResponse.text();
      let errorData: unknown = errorText;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        // leave errorData as raw text
      }
      console.error('Lemon Squeezy error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create checkout session', lemon: errorData },
        { status: 500 }
      );
    }

    const checkoutData = await checkoutResponse.json();
    const checkoutUrl = checkoutData.data.attributes.url;

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
