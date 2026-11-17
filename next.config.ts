import type { NextConfig } from 'next';

// GITHUB_PAGES=true builds a static site for https://<owner>.github.io/ai-workshop-101/.
// See .github/workflows/pages.yml.
const isPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = isPages
  ? {
      output: 'export',
      basePath: '/ai-workshop-101',
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
