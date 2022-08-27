/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
<<<<<<< HEAD
  },
=======
  }
>>>>>>> b3675fcf26ebc98931e25756f6dee81c42ebabd3
}

module.exports = nextConfig
