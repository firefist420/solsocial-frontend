export default function TokenSocial({ token }) {
  return (
    <div className="token-social p-4 bg-gray-100 rounded-lg mt-4">
      <h2 className="font-bold mb-2">Community</h2>
      <div className="flex space-x-4">
        {token.twitter && (
          <a href={`https://twitter.com/${token.twitter}`} className="text-blue-500">
            Twitter
          </a>
        )}
        {token.website && (
          <a href={token.website} className="text-blue-500">
            Website
          </a>
        )}
      </div>
    </div>
  );
}