import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function AppLayout({ children }) {
  const { publicKey } = useWallet();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-64 p-4 border-r border-gray-800 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">SolSocial</h1>
        <nav className="space-y-2">
          <a href="/feed" className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800">
            <span className="text-xl mr-3">🏠</span>
            <span>Home</span>
          </a>
          {publicKey && (
            <a 
              href={`/profile/${publicKey.toString()}`} 
              className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800"
            >
              <span className="text-xl mr-3">👤</span>
              <span>Profile</span>
            </a>
          )}
        </nav>
        <div className="mt-8">
          <WalletMultiButton className="w-full bg-purple-600 hover:bg-purple-700" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}