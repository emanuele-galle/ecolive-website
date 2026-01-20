import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.fodivps2.cloud',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
      },
    ],
  },

  // Headers di sicurezza con frame-src per Sketchfab
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "frame-src 'self' https://sketchfab.com https://superspl.at",
              "connect-src 'self' https://api.fodivps2.cloud wss://fodivps2.cloud wss://api.fodivps2.cloud",
              "worker-src 'self' blob:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; ')
          }
        ]
      }
    ]
  },

  async redirects() {
    return [
      // Redirect vecchi URL WordPress
      {
        source: '/category/news/:path*',
        destination: '/news/:path*',
        permanent: true,
      },
      {
        source: '/il-sistema-x-frame',
        destination: '/x-frame',
        permanent: true,
      },
    ]
  },
}

export default withPayload(nextConfig)
