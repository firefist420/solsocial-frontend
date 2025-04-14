export default function NFTGallery({ publicKey }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="border rounded-lg overflow-hidden">
        <div className="w-full h-48 bg-gray-800"></div>
      </div>
    </div>
  );
}