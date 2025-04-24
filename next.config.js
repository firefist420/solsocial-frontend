module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.dexscreener.com'
      },
      {
        protocol: 'https',
        hostname: 'arweave.net'
      },
      {
        protocol: 'https',
        hostname: 'nftstorage.link'
      }
    ]
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
  },
  experimental: {
    esmExternals: 'loose',
    serverActions: true
  },
  output: 'standalone'
};