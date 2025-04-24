'use client';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import NFTGallery from './NFTGallery';

export default function NFTProfilePage({ publicKey }) {
  const { connected } = useWallet();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div>Loading...</div>;
  if (!connected) return <div>Please connect your wallet</div>;

  return (
    <div className="p-6">
      <NFTGallery publicKey={publicKey} />
    </div>
  );
}