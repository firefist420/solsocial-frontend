import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const HCaptcha = dynamic(() => import('@hcaptcha/react-hcaptcha'), { ssr: false });
const WalletMultiButton = dynamic(() => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton), { ssr: false });

export default function Home() {
  const { connected } = useWallet();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaExpired, setCaptchaExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (connected && captchaVerified) {
      router.push('/feed');
    }
  }, [connected, captchaVerified, router]);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to SolSocial</h1>
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
          onVerify={() => {
            setCaptchaVerified(true);
            setCaptchaExpired(false);
          }}
          onExpire={() => setCaptchaExpired(true)}
        />
        {captchaExpired && <p className="error">Captcha expired. Please verify again.</p>}
        {captchaVerified && (
          <WalletMultiButton className="connect-button" />
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
        .error {
          color: #ff6b6b;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}