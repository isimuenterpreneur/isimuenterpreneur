/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // JANGAN GUNAKAN INI. Ini adalah penyebab utama masalah.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://drive.google.com/file/d/1wgllVj5PnBi7JOxuOe_TTLdiAXgr8I60/view?usp=drive_link",
      },
      // Tambahkan hostname lain di sini jika Anda menggunakan gambar dari domain lain
    ],
  },
};

module.exports = nextConfig;