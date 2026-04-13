import { NextRequest, NextResponse } from 'next/server';
import { getAppOrigin, getProtectedResourceMetadata } from '@/lib/oauth/config';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ resource?: string[] }> }
) {
  const origin = getAppOrigin(request.nextUrl.origin);
  const { resource = [] } = await context.params;
  const resourceUrl = resource.length > 0 ? `${origin}/${resource.join('/')}` : `${origin}/api/mcp`;

  return NextResponse.json(getProtectedResourceMetadata(origin, resourceUrl), {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
