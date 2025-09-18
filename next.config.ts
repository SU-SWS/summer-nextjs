import type {NextConfig} from "next"
import {INFINITE_CACHE} from "next/dist/lib/constants"

const drupalUrl = new URL(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string)

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    cacheLife: {
      default: {
        stale: undefined,
        revalidate: INFINITE_CACHE,
        expire: INFINITE_CACHE,
      },
    },
  },
  typescript: {
    // Disable build errors since dev dependencies aren't loaded on prod. Rely on GitHub actions to throw any errors.
    ignoreBuildErrors: process.env.CI !== "true",
  },
  images: {
    remotePatterns: [
      {
        // Allow any stanford domain for images, but require https.
        protocol: "https",
        hostname: "**.stanford.edu",
      },
      {
        protocol: drupalUrl.protocol === "https:" ? "https" : "http",
        hostname: drupalUrl.hostname,
      },
      {
        protocol: "https",
        hostname: "localist-images.azureedge.net",
      },
      {
        hostname: "**.gitpod.io",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        source: "/wp-:path",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/wp-:slug/:path*",
        destination: "/not-found",
        permanent: true,
      },
      {
        source: "/node/:slug",
        destination: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + "/node/:slug",
        permanent: true,
      },
      {
        source: "/user/:slug*",
        destination: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + "/user/login",
        permanent: true,
      },
      {
        source: "/saml/login",
        destination: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + "/user/login",
        permanent: true,
      },
    ]
  },
  async headers() {
    if (process.env.NEXT_PUBLIC_DOMAIN) {
      return []
    }
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex,nofollow,noarchive",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({enabled: true})
  module.exports = withBundleAnalyzer(nextConfig)
}
