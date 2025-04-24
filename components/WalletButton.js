import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect } from 'react';

export default function CustomWalletButton() {
  const { wallet, connect, connecting, connected } = useWallet();

  useEffect(() => {
    if (wallet && !connected && !connecting) {
      connect().catch(() => {});
    }
  }, [wallet, connect, connected, connecting]);

  return (
    <WalletMultiButton 
      className="wallet-multi-button"
      style={{
        backgroundColor: '#9945FF',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '600'
      }}
    />
  );
}