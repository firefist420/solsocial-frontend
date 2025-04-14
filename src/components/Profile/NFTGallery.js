export default function NFTGallery({ nfts }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {nfts.map(nft => (
        <div key={nft.id} className="border rounded-lg overflow-hidden">
          <img 
            src={nft.content?.links?.image || '/default-nft.png'} 
            className="w-full h-48 object-cover"
            alt={nft.content?.metadata?.name || 'NFT'}
          />
          <div className="p-2">
            <p className="font-bold truncate">
              {nft.content?.metadata?.name || 'Untitled'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}