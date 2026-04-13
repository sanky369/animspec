import { NextRequest, NextResponse } from 'next/server';
import { getAppOrigin, getAuthorizationServerMetadata } from '@/lib/oauth/config';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const origin = getAppOrigin(request.nextUrl.origin);
  return NextResponse.json(getAuthorizationServerMetadata(origin), {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
