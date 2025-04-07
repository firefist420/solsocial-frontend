import { useEffect, useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);

export default function Home() {
  const { connected } = useWallet();
  const router = useRouter();
  const [captchaToken, setCaptchaToken] = useState(null);
  const hcaptchaRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://js.hcaptcha.com/1/api.js?render=explicit&onload=hcaptchaOnLoad`;
    script.async = true;
    script.defer = true;
    
    window.hcaptchaOnLoad = () => {
      if (window.hcaptcha) {
        hcaptchaRef.current = window.hcaptcha.render('hcaptcha-container', {
          sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY,
          theme: 'dark',
          callback: (token) => setCaptchaToken(token)
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.hcaptchaOnLoad) delete window.hcaptchaOnLoad;
    };
  }, []);

  useEffect(() => {
    if (connected && captchaToken) {
      router.push('/feed');
    }
  }, [connected, captchaToken, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <Head>
        <title>SolSocial</title>
        <script src={`https://js.hcaptcha.com/1/api.js?render=explicit&onload=hcaptchaOnLoad`} async defer />
      </Head>

      <div className="bg-black bg-opacity-80 p-8 rounded-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Welcome to SolSocial</h1>
        
        <div id="hcaptcha-container" className="flex justify-center mb-4"></div>

        {captchaToken && (
          <WalletMultiButton className="mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        )}
      </div>
    </div>
  );
}