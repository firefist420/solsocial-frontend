import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const PhantomLoginButton = () => {
  const { connect, connected, publicKey } = useWallet();
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
          <img src="/phantom-icon.png" alt="Phantom" className="w-6 h-6 mr-2"/>
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