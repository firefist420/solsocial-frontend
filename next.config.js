module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.dexscreener.com'],
  },
  env: {
    NEXT_PUBLIC_HCAPTCHA_SITEKEY: process.env.HCAPTCHA_SITEKEY,
    NEXT_PUBLIC_SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
    NEXT_PUBLIC_HELIUS_API_KEY: process.env.HELIUS_API_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      bufferutil: false,
      'utf-8-validate': false
    };
    return config;
  }
};