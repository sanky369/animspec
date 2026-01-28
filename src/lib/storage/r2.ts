import { AwsClient } from 'aws4fetch';

// R2 configuration
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'animspec-videos';

// Presigned URL expiration (1 hour)
const URL_EXPIRY_SECONDS = 3600;

let r2Client: AwsClient | null = null;

function getR2Client(): AwsClient {
  if (r2Client) return r2Client;

  if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error('Cloudflare R2 credentials not configured');
  }

  r2Client = new AwsClient({
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
    region: 'auto',
    service: 's3',
  });

  return r2Client;
}

function getR2Endpoint(): string {
  if (!R2_ACCOUNT_ID) {
    throw new Error('R2 account ID not configured');
  }
  return `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
}

export function isR2Configured(): boolean {
  return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);
}

/**
 * Generate a presigned URL for uploading a video to R2
 */
export async function getUploadPresignedUrl(
  userId: string,
  fileName: string,
  contentType: string,
  contentLength: number
): Promise<{ uploadUrl: string; objectKey: string }> {
  const client = getR2Client();
  const endpoint = getR2Endpoint();

  // Generate unique object key
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const objectKey = `uploads/${userId}/${timestamp}-${sanitizedFileName}`;

  const url = new URL(`${endpoint}/${R2_BUCKET_NAME}/${objectKey}`);
  
  // Add query params for presigned URL
  url.searchParams.set('X-Amz-Expires', URL_EXPIRY_SECONDS.toString());

  // Sign the request
  const signedRequest = await client.sign(
    new Request(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Content-Length': contentLength.toString(),
      },
    }),
    {
      aws: { signQuery: true },
    }
  );

  return {
    uploadUrl: signedRequest.url,
    objectKey,
  };
}

/**
 * Generate a presigned URL for downloading/reading a video from R2
 */
export async function getDownloadPresignedUrl(objectKey: string): Promise<string> {
  const client = getR2Client();
  const endpoint = getR2Endpoint();

  const url = new URL(`${endpoint}/${R2_BUCKET_NAME}/${objectKey}`);
  url.searchParams.set('X-Amz-Expires', URL_EXPIRY_SECONDS.toString());

  const signedRequest = await client.sign(
    new Request(url.toString(), {
      method: 'GET',
    }),
    {
      aws: { signQuery: true },
    }
  );

  return signedRequest.url;
}

/**
 * Delete a video from R2
 */
export async function deleteObject(objectKey: string): Promise<void> {
  const client = getR2Client();
  const endpoint = getR2Endpoint();

  const url = `${endpoint}/${R2_BUCKET_NAME}/${objectKey}`;

  const response = await client.fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete object: ${response.status}`);
  }
}

/**
 * Fetch video from R2 and return as base64
 */
export async function fetchAsBase64(objectKey: string): Promise<{ base64: string; contentType: string }> {
  const downloadUrl = await getDownloadPresignedUrl(objectKey);
  
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch from R2: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const contentType = response.headers.get('content-type') || 'video/mp4';

  return { base64, contentType };
}
