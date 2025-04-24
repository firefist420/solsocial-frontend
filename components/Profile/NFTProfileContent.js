'use client';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import NFTGallery from './NFTGallery';

export default function NFTProfileContent({ publicKey }) {
  const { connected } = useWallet();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div>Loading wallet...</div>;
  if (!connected) return <div>Please connect your wallet</div>;

  return (
    <div className="p-6">
      <NFTGallery publicKey={publicKey} />
    </div>
  );
}