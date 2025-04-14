module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.dexscreener.com', 'arweave.net', 'nftstorage.link', 'ipfs.io'],
  },
  env: {
    NEXT_PUBLIC_HCAPTCHA_SITEKEY: process.env.HCAPTCHA_SITEKEY,
    NEXT_PUBLIC_SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
    NEXT_PUBLIC_HELIUS_API_KEY: process.env.HELIUS_API_KEY,
    NEXT_PUBLIC_MONGODB_URI: process.env.MONGODB_URI,
    NEXT_PUBLIC_MONGODB_DB: process.env.MONGODB_DB,
    NEXT_PUBLIC_DEXSCREENER_API: process.env.DEXSCREENER_API,
    JWT_SECRET: process.env.JWT_SECRET
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      bufferutil: false,
      'utf-8-validate': false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify')
    };
    return config;
  },
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose']
  }
};