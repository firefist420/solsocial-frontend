export default function TokenInfo({ token }) {
  return (
    <div className="token-info p-4 bg-gray-100 rounded-lg">
      <h2 className="font-bold mb-2">Token Details</h2>
      <div className="space-y-2">
        <p>Price: ${token.price}</p>
        <p>Market Cap: ${token.market_cap}</p>
        <p>24h Volume: ${token.volume_24h}</p>
      </div>
    </div>
  );
}