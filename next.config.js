module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.dexscreener.com', 'arweave.net', 'nftstorage.link'],
  },
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose']
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify')
    };
    return config;
  }
};