/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: true
  },
  // Disable font optimization to avoid nanoid dependency
  optimizeFonts: false,
  // Configure SWC to handle React imports
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };
    config.experiments = { ...config.experiments, topLevelAwait: true };
    
    // Alias nanoid to our custom implementation
    config.resolve.alias = {
      ...config.resolve.alias,
      'nanoid': require.resolve('./src/utils/nanoid'),
      'nanoid/non-secure': require.resolve('./src/utils/nanoid/non-secure'),
    };
    
    return config;
  },
};

module.exports = nextConfig;
