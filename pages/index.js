import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PhantomLoginButton = () => {
  const { connect, connected, publicKey, select } = useWallet();
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      router.push('/feed');
    }
  }, [connected, publicKey, router]);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      select('Phantom');
      await connect();
    } catch (error) {
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="mx-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center"
    >
      {isConnecting ? 'Connecting...' : (
        <>
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none">
            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#AB9FF2"/>
            <path d="M13.6555 6H17.5L16.5 7.5H13.6555C12.7503 7.5 12 8.2503 12 9.1555V14.8445C12 15.7497 12.7503 16.5 13.6555 16.5H16.5L17.5 18H13.6555C11.6459 18 10 16.3541 10 14.3445V9.6555C10 7.64594 11.6459 6 13.6555 6Z" fill="white"/>
          </svg>
          Connect Phantom Wallet
        </>
      )}
    </button>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>SolSocial</title>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            background: url('/images/background.jpg') no-repeat center center fixed;
            background-size: cover;
          }
        `}</style>
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-black bg-opacity-80 p-8 rounded-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Welcome to SolSocial</h1>
          <PhantomLoginButton />
        </div>
      </div>
    </>
  );
}