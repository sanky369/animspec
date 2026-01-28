import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// R2 configuration
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'animspec-videos';

// Presigned URL expiration (1 hour for uploads)
const UPLOAD_URL_EXPIRY = 3600;
// Download URL expiration (1 hour)
const DOWNLOAD_URL_EXPIRY = 3600;

let s3Client: S3Client | null = null;

function getR2Client(): S3Client {
  if (s3Client) return s3Client;

  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error('Cloudflare R2 credentials not configured');
  }

  s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });

  return s3Client;
}

export function isR2Configured(): boolean {
  return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);
}

/**
 * Generate a presigned URL for uploading a video to R2
 * Objects are auto-deleted after 3 days via R2 lifecycle rules
 */
export async function getUploadPresignedUrl(
  userId: string,
  fileName: string,
  contentType: string,
  contentLength: number
): Promise<{ uploadUrl: string; objectKey: string }> {
  const client = getR2Client();
  
  // Generate unique object key with user context
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const objectKey = `uploads/${userId}/${timestamp}-${sanitizedFileName}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: objectKey,
    ContentType: contentType,
    ContentLength: contentLength,
    // Metadata for tracking
    Metadata: {
      'user-id': userId,
      'upload-time': new Date().toISOString(),
      'original-filename': fileName,
    },
  });

  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: UPLOAD_URL_EXPIRY,
  });

  return { uploadUrl, objectKey };
}

/**
 * Generate a presigned URL for downloading/reading a video from R2
 */
export async function getDownloadPresignedUrl(objectKey: string): Promise<string> {
  const client = getR2Client();

  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: objectKey,
  });

  const downloadUrl = await getSignedUrl(client, command, {
    expiresIn: DOWNLOAD_URL_EXPIRY,
  });

  return downloadUrl;
}

/**
 * Delete a video from R2 (manual cleanup if needed)
 */
export async function deleteObject(objectKey: string): Promise<void> {
  const client = getR2Client();

  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: objectKey,
  });

  await client.send(command);
}

/**
 * Get the public R2 URL for an object (if bucket has public access)
 * Note: This requires the bucket to be configured for public access
 */
export function getPublicUrl(objectKey: string): string {
  if (!R2_ACCOUNT_ID) {
    throw new Error('R2 account ID not configured');
  }
  return `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${objectKey}`;
}
