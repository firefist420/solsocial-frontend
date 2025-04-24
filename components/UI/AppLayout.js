import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';

export default function AppLayout({ children }) {
  const { publicKey } = useWallet();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-64 p-4 border-r border-gray-800 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">SolSocial</h1>
        <nav className="space-y-2">
          <Link href="/feed" className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800">
            <span className="text-xl mr-3">🏠</span>
            <span>Home</span>
          </Link>
          {publicKey && (
            <Link 
              href={`/profile/${publicKey.toString()}`} 
              className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800"
            >
              <span className="text-xl mr-3">👤</span>
              <span>Profile</span>
            </Link>
          )}
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}