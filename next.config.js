/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
<<<<<<< HEAD
  }}
=======
  }
}
>>>>>>> cf9424f7212e91d53a420394c6f0b32e697377b0

module.exports = nextConfig
