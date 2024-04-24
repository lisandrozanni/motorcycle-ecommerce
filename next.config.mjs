/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bucket-rn-40-dev-test.s3.amazonaws.com',
      },
    ],
  },
  publicRuntimeConfig: {
    API_TOKEN: process.env.TOKEN,
    EXCHANGE_API_TOKEN: process.env.EXCHANGE_API_URL,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
};

export default nextConfig;
