import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function TipButton({ recipient }) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const sendTip = async (amount) => {
    try {
      const transaction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipient,
        lamports: amount * LAMPORTS_PER_SOL,
      });
      
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      alert(`Tip sent successfully! Transaction: ${signature}`);
    } catch (error) {
      console.error('Error sending tip:', error);
      alert('Failed to send tip: ' + error.message);
    }
  };

  return (
    <button 
      onClick={() => sendTip(0.1)}
      className="px-2 py-1 bg-yellow-500 text-black rounded text-sm hover:bg-yellow-600 transition-colors"
    >
      Tip 0.1 SOL
    </button>
  );
}