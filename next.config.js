/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "res.cloudinary.com"],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

module.exports = nextConfig;
