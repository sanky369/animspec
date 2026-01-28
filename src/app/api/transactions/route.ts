import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS } from '@/types/database';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Get the session token from Authorization header or cookies
    const authHeader = request.headers.get('Authorization');
    const sessionCookie = request.cookies.get('__session')?.value;
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : sessionCookie;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token
    let userId: string;
    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      userId = decodedToken.uid;
    } catch {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Get transactions for user
    const snapshot = await adminDb
      .collection(COLLECTIONS.CREDIT_TRANSACTIONS)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const transactions = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
      };
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
