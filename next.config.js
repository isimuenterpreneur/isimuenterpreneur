/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // JANGAN GUNAKAN INI. Ini adalah penyebab utama masalah.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Untuk gambar dari Google Drive
      },
    ],
  },
};

module.exports = nextConfig;