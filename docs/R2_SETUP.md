# Cloudflare R2 Setup for AnimSpec

AnimSpec uses Cloudflare R2 to handle video uploads larger than Vercel's 4.5MB body limit.

## Setup Steps

### 1. Create R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to R2 → Create bucket
3. Name it `animspec-videos` (or your preferred name)
4. Select your preferred location

### 2. Configure Object Lifecycle (Auto-Delete)

1. Go to your bucket settings
2. Click "Object lifecycle rules"
3. Add a rule:
   - **Rule name**: `auto-delete-uploads`
   - **Prefix filter**: `uploads/`
   - **Action**: Delete objects
   - **Days after upload**: `3`
4. Save the rule

This ensures all uploaded videos are automatically deleted after 3 days.

### 3. Configure CORS

1. Go to bucket settings → CORS policy
2. Add this configuration:

```json
[
  {
    "AllowedOrigins": [
      "https://animspec.com",
      "https://www.animspec.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "PUT", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

### 4. Create API Token

1. Go to R2 → Manage R2 API Tokens
2. Create a new token with:
   - **Permissions**: Object Read & Write
   - **Bucket scope**: Your bucket only
3. Copy the Access Key ID and Secret Access Key

### 5. Add Environment Variables

Add these to your `.env.local` and Vercel project settings:

```env
CLOUDFLARE_R2_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key
CLOUDFLARE_R2_BUCKET_NAME=animspec-videos
```

Find your Account ID in the Cloudflare dashboard URL or R2 overview page.

## How It Works

1. **Small files (<4MB)**: Sent directly to `/api/analyze` as base64
2. **Medium files (4-20MB)**: 
   - Client requests presigned URL from `/api/upload-url`
   - Client uploads directly to R2 (bypasses Vercel)
   - Server fetches from R2 for analysis
   - Object deleted after analysis (or after 3 days via lifecycle)
3. **Large files (>20MB)**: Use Gemini Files API

## Pricing

R2 pricing is very affordable:
- Storage: $0.015/GB/month
- Class A operations (writes): $4.50/million
- Class B operations (reads): $0.36/million
- Egress: Free!

For AnimSpec's use case (temporary video storage), costs should be minimal.
