/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com", "res.cloudinary.com", "images.unsplash.com"],
  },
  webpack: (config) => {
    // Don’t bundle undici in the browser
    config.resolve.alias["undici"] = false;
    return config;
  },
};

module.exports = nextConfig;
