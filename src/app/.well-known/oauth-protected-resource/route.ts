import { NextRequest, NextResponse } from 'next/server';
import { getAppOrigin, getMcpResourceUrl, getProtectedResourceMetadata } from '@/lib/oauth/config';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const origin = getAppOrigin(request.nextUrl.origin);
  return NextResponse.json(getProtectedResourceMetadata(origin, getMcpResourceUrl(origin)), {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
