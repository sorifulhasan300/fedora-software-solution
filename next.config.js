/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app-generator.dev',
        pathname: '/static/**',
      },
    ],
  },
};

module.exports = nextConfig;
