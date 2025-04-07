export default function TokenHeader({ token }) {
  return (
    <div className="token-header">
      <h1 className="text-2xl font-bold">{token.name} ({token.symbol})</h1>
      <p className="text-gray-500">{token.contract_address}</p>
    </div>
  );
}