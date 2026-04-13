import { type NextRequest, NextResponse } from 'next/server';
import { authenticateApiKeyRequest } from '@/lib/public-api/auth';
import { ACCEPTED_VIDEO_MIME_TYPES, MAX_VIDEO_SIZE_BYTES } from '@/lib/public-api/metadata';
import { getUploadPresignedUrl, isR2Configured } from '@/lib/storage/r2';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const auth = await authenticateApiKeyRequest(request);
  if (!auth) {
    return NextResponse.json(
      { error: 'Missing or invalid API key' },
      { status: 401 }
    );
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      { error: 'Cloud storage not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const fileName = typeof body?.fileName === 'string' ? body.fileName : '';
    const contentType = typeof body?.contentType === 'string' ? body.contentType : '';
    const contentLength = typeof body?.contentLength === 'number'
      ? body.contentLength
      : Number(body?.contentLength ?? 0);

    if (!fileName || !contentType || !Number.isFinite(contentLength) || contentLength <= 0) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, contentType, contentLength' },
        { status: 400 }
      );
    }

    if (!(ACCEPTED_VIDEO_MIME_TYPES as readonly string[]).includes(contentType)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ACCEPTED_VIDEO_MIME_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    if (contentLength > MAX_VIDEO_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    const { uploadUrl, objectKey } = await getUploadPresignedUrl(
      auth.userId,
      fileName,
      contentType,
      contentLength
    );

    return NextResponse.json({
      uploadUrl,
      objectKey,
      expiresIn: 3600,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate upload URL';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
