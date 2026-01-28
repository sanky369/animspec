import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { getUploadPresignedUrl, isR2Configured } from '@/lib/storage/r2';

export const runtime = 'nodejs';

// Maximum file size: 500MB (R2 supports up to 5GB per object)
const MAX_FILE_SIZE = 500 * 1024 * 1024;

// Allowed video MIME types
const ALLOWED_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime', // .mov
  'video/x-msvideo', // .avi
  'video/x-matroska', // .mkv
];

async function verifyAuth(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('Authorization');
  const sessionCookie = request.cookies.get('__session')?.value;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : sessionCookie;

  if (!token) return null;

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.uid;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if R2 is configured
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: 'Cloud storage not configured' },
        { status: 503 }
      );
    }

    // Verify authentication
    const userId = await verifyAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { fileName, contentType, contentLength } = body;

    // Validate inputs
    if (!fileName || !contentType || !contentLength) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, contentType, contentLength' },
        { status: 400 }
      );
    }

    // Validate content type
    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate file size
    if (contentLength > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // Generate presigned URL
    const { uploadUrl, objectKey } = await getUploadPresignedUrl(
      userId,
      fileName,
      contentType,
      contentLength
    );

    return NextResponse.json({
      uploadUrl,
      objectKey,
      expiresIn: 3600, // 1 hour
    });
  } catch (error) {
    console.error('Failed to generate upload URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
