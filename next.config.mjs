/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.metmuseum.org',
        port: '',
        pathname: '**/*',
      },
    ],
  },
};

export default nextConfig;
