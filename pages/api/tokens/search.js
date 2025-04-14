import { PublicKey } from '@solana/web3.js';

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${query}`);
    const data = await response.json();
    
    const validTokens = data.pairs.filter(pair => 
      pair.baseToken && new PublicKey(pair.baseToken.address)
    ).map(pair => ({
      address: pair.baseToken.address,
      name: pair.baseToken.name,
      symbol: pair.baseToken.symbol,
      price: pair.priceUsd,
      liquidity: pair.liquidity.usd
    }));

    res.status(200).json(validTokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}