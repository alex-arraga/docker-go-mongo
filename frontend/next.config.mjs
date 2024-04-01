/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.RENDER_EXTERNAL_URL || "https://docker-go-mongo.onrender.com" || "http://localhost:4000"
  },
  output: "standalone"
};

export default nextConfig;
