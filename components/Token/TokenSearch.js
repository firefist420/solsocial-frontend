import { useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';

export default function TokenSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const { connection } = useConnection();

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/tokens/search?query=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full p-2 pl-10 bg-gray-800 rounded-lg text-white"
          placeholder="Search tokens..."
        />
        <button 
          onClick={handleSearch}
          className="absolute left-3 top-2.5 text-gray-400"
        >
          ??
        </button>
      </div>
      {results.length > 0 && (
        <div className="mt-2 bg-gray-800 rounded-lg p-2">
          {results.map(token => (
            <div key={token.address} className="p-2 hover:bg-gray-700 rounded cursor-pointer">
              {token.name} ({token.symbol})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}