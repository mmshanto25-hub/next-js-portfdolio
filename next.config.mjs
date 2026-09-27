/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages
  ? process.env.NEXT_PUBLIC_BASE_PATH ?? "/next-js-portfdolio"
  : "";

const nextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath,
  trailingSlash: isGitHubPages,
  reactStrictMode: true,
  images: {
    unoptimized: isGitHubPages,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
