import { type NextRequest, NextResponse } from 'next/server';
import { uploadVideoToGemini } from '@/lib/storage/gemini-files';
import { authenticateApiKeyRequest } from '@/lib/public-api/auth';
import { ACCEPTED_VIDEO_MIME_TYPES, MAX_VIDEO_SIZE_BYTES } from '@/lib/public-api/metadata';

export const runtime = 'nodejs';
export const maxDuration = 300;

function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Missing or invalid API key' },
    { status: 401 }
  );
}

export async function POST(request: NextRequest) {
  const auth = await authenticateApiKeyRequest(request);
  if (!auth) {
    return unauthorizedResponse();
  }

  try {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!(ACCEPTED_VIDEO_MIME_TYPES as readonly string[]).includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ACCEPTED_VIDEO_MIME_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    const uploaded = await uploadVideoToGemini(file, geminiApiKey);
    return NextResponse.json(uploaded);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
