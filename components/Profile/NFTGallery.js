import { useState, useEffect } from 'react';

export default function NFTGallery({ publicKey }) {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!publicKey) {
      setError('No public key provided');
      setLoading(false);
      return;
    }

    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/nfts/${publicKey}`);
        if (!response.ok) throw new Error('Failed to fetch NFTs');
        const data = await response.json();
        setNfts(data.nfts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [publicKey]);

  if (loading) return <div>Loading NFTs...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!nfts.length) return <div>No NFTs found for this wallet</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {nfts.map((nft) => (
        <div key={nft.id} className="border rounded-lg overflow-hidden">
          <img 
            src={nft.image} 
            alt={nft.name} 
            className="w-full h-48 object-cover"
            onError={(e) => e.target.src = '/placeholder-nft.png'}
          />
          <div className="p-2">
            <h3 className="font-medium truncate">{nft.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}