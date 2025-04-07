import { useState, useEffect } from 'react';
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
  const [hcaptchaReady, setHcaptchaReady] = useState(false);

  useEffect(() => {
    // Check if hCaptcha is already loaded
    if (window.hcaptcha) {
      setHcaptchaReady(true);
      return;
    }

    // Load hCaptcha script
    const script = document.createElement('script');
    script.src = `https://js.hcaptcha.com/1/api.js?render=explicit&onload=hcaptchaOnLoad`;
    script.async = true;
    script.defer = true;
    
    window.hcaptchaOnLoad = () => {
      setHcaptchaReady(true);
    };

    document.body.appendChild(script);

    return () => {
      if (window.hcaptchaOnLoad) {
        delete window.hcaptchaOnLoad;
      }
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (connected && captchaToken) {
      router.push('/feed');
    }
  }, [connected, captchaToken, router]);

  return (
    <div className="welcome-container">
      <Head>
        <title>SolSocial</title>
      </Head>
      
      <div className="welcome-content">
        <h1>Welcome to SolSocial</h1>
        
        {hcaptchaReady ? (
          <div
            className="h-captcha"
            data-sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
            data-callback={(token) => setCaptchaToken(token)}
            data-error-callback={() => console.error('hCaptcha error')}
          />
        ) : (
          <p className="text-yellow-500">Loading security verification...</p>
        )}

        {captchaToken && (
          <div className="mt-4">
            <WalletMultiButton className="connect-button" />
          </div>
        )}
      </div>

      <style jsx>{`
        .welcome-container {
          background-image: url('/images/background.jpg');
          background-size: cover;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .welcome-content {
          background: rgba(0, 0, 0, 0.8);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          max-width: 500px;
          width: 100%;
        }
        .connect-button {
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}