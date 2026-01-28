import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimize package imports for faster builds and smaller bundles
  experimental: {
    optimizePackageImports: [
      'firebase',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'shiki',
      '@google/genai',
    ],
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google profile pictures
      },
    ],
  },

  // Logging configuration for production
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // COOP/COEP headers required for FFmpeg WASM SharedArrayBuffer
  async headers() {
    const keyframesEnabled = process.env.NEXT_PUBLIC_DISABLE_KEYFRAMES !== 'true';
    const csp = [
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob:",
      "worker-src 'self' blob:",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // COOP/COEP only where SharedArrayBuffer is required (FFmpeg WASM)
      {
        source: '/dashboard/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
          ...(keyframesEnabled
            ? [
              {
                key: 'Cross-Origin-Opener-Policy',
                value: 'same-origin',
              },
              {
                key: 'Cross-Origin-Embedder-Policy',
                value: 'require-corp',
              },
              {
                key: 'Cross-Origin-Resource-Policy',
                value: 'same-origin',
              },
            ]
            : []),
        ],
      },
      // CORS headers for ffmpeg worker chunks
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
      // Cache static assets
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for clean URLs
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
