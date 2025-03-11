/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  transpilePackages: ['three', 'gsap'],
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      {
        source: '/video/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, must-revalidate' }],
      },
    ];
  },
};

export default nextConfig;
