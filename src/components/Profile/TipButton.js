import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function TipButton({ recipient }) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const sendTip = async (amount) => {
    const tx = await sendTransaction(
      new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipient,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      ),
      connection
    );
  };

  return (
    <button 
      onClick={() => sendTip(0.1)}
      className="px-4 py-2 bg-yellow-500 rounded-lg"
    >
      Tip 0.1 SOL
    </button>
  );
}