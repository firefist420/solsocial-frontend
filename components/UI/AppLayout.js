export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-64 p-4 border-r border-gray-800 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">SolSocial</h1>
        <nav className="space-y-2">
          <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800">
            <span className="text-xl mr-3">??</span>
            <span>Home</span>
          </button>
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}