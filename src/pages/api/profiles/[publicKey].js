export default async function handler(req, res) {
  const { publicKey } = req.query;

  try {
    // Fetch NFTs using Helius
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '1',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: publicKey,
          page: 1,
          limit: 1000
        }
      })
    });

    const { result } = await response.json();
    
    res.status(200).json({
      nfts: result?.items || []
    });
    
  } catch (error) {
    console.error('Helius API error:', error);
    res.status(500).json({ error: 'Failed to fetch NFTs' });
  }
}