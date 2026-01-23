/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production"
const basePath = isProduction ? "/rohit-portfolio" : ""

const nextConfig = {
  output: "export",
  trailingSlash: true,
  
  // Asset configuration for consistent rendering
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  
  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
  
  // Enable type checking and linting for build safety
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Ensure static generation completes
  staticPageGenerationTimeout: 120,
  
  // Headers for caching optimization
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, s-maxage=3600",
        },
      ],
    },
  ],
}

module.exports = nextConfig
