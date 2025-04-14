import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function Home() {
  const { connected } = useWallet();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [hcaptchaLoaded, setHcaptchaLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => setHcaptchaLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onCaptchaVerify = (token) => {
    setCaptchaVerified(true);
  };

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
          
          {!captchaVerified && hcaptchaLoaded && (
            <div className="h-captcha mb-4 flex justify-center" 
                 data-sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
                 data-callback={onCaptchaVerify} />
          )}

          {captchaVerified && (
            <div className="animate-fade-in">
              <WalletMultiButton className="mx-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}