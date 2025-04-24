import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { 
    ssr: false,
    loading: () => <div className="w-full h-10 bg-gray-700 rounded animate-pulse"></div>
  }
);

export default function Home() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      router.push('/feed');
    }
  }, [connected, publicKey, router]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const onCaptchaVerify = () => setCaptchaVerified(true);

  return (
    <>
      <Head>
        <title>SolSocial</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-black bg-opacity-80 p-8 rounded-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Welcome to SolSocial</h1>
          <div 
            className="h-captcha mb-4 flex justify-center" 
            data-sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
            data-callback={onCaptchaVerify}
          />
          <div className={`transition-opacity duration-500 ${captchaVerified ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <WalletMultiButton className="mx-auto !bg-purple-600 hover:!bg-purple-700 !text-white font-bold py-2 px-4 rounded" />
          </div>
        </div>
      </div>
    </>
  );
}