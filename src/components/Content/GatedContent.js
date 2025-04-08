export default function GatedContent({ requiredCollection, content }) {
  const { userNFTs } = useAuth();
  const hasAccess = userNFTs.some(nft => 
    nft.collection === requiredCollection
  );

  return (
    <div className="gated-content">
      {hasAccess ? (
        <div>{content}</div>
      ) : (
        <div className="p-4 bg-gray-800 rounded-lg">
          <p>This content requires ownership of {requiredCollection}</p>
          <button className="mt-2 px-4 py-2 bg-purple-600 rounded-lg">
            Unlock with NFT
          </button>
        </div>
      )}
    </div>
  );
}