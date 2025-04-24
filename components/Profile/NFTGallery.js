import { useState, useEffect } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';

export default function NFTGallery({ publicKey }) {
  const { connection } = useConnection();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/nfts/${publicKey}`);
        const data = await response.json();
        setNfts(data);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (publicKey) fetchNFTs();
  }, [publicKey, connection]);

  if (loading) return <div>Loading NFTs...</div>;
  if (!nfts.length) return <div>No NFTs found</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {nfts.map((nft) => (
        <div key={nft.mint} className="border rounded-lg overflow-hidden">
          <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
          <div className="p-2">
            <h3 className="font-medium truncate">{nft.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}