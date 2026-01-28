import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';
export const maxDuration = 300; // 300 seconds timeout

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload MP4, WebM, or MOV files.' },
        { status: 400 }
      );
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 100MB.' },
        { status: 400 }
      );
    }

    // Upload to Gemini Files API
    const client = new GoogleGenAI({ apiKey });

    // Convert File to Blob for upload
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    const uploadResult = await client.files.upload({
      file: blob,
      config: {
        mimeType: file.type,
        displayName: file.name,
      },
    });

    // Wait for processing to complete
    let fileInfo = uploadResult;
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max wait
    const fileName = fileInfo.name;

    if (!fileName) {
      return NextResponse.json(
        { error: 'Failed to get file name from upload' },
        { status: 500 }
      );
    }

    while (fileInfo.state === 'PROCESSING' && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      fileInfo = await client.files.get({ name: fileName });
      attempts++;
    }

    if (fileInfo.state === 'PROCESSING') {
      return NextResponse.json(
        { error: 'File processing timed out. Please try again.' },
        { status: 408 }
      );
    }

    if (fileInfo.state === 'FAILED') {
      return NextResponse.json(
        { error: 'File processing failed. Please try a different video.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      name: fileName,
      uri: fileInfo.uri,
      mimeType: fileInfo.mimeType,
      sizeBytes: fileInfo.sizeBytes,
      state: fileInfo.state,
    });
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
