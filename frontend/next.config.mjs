/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.API_URL || "http://localhost:4000"
  },
  output: "standalone"
};

export default nextConfig;
