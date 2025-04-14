export default function Navbar() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">SolSocial</h1>
        <div className="flex space-x-4">
          <button className="px-3 py-1 rounded hover:bg-gray-700">Feed</button>
          <button className="px-3 py-1 rounded hover:bg-gray-700">Profile</button>
        </div>
      </div>
    </header>
  );
}