module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.dexscreener.com', 'your-image-host.com'],
  },
  env: {
    NEXT_PUBLIC_HCAPTCHA_SITEKEY: process.env.HCAPTCHA_SITEKEY,
    NEXT_PUBLIC_SOLANA_RPC_URL: process.env.SOLANA_RPC_URL,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      bufferutil: false,
      'utf-8-validate': false,
    };
    return config;
  },
};