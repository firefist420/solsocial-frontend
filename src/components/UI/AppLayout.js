export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-64 p-4 border-r border-gray-800">
        <h1 className="text-2xl font-bold mb-8">SolSocial</h1>
        <nav className="space-y-2">
          <NavItem icon="??" label="Home" />
          <NavItem icon="??" label="Explore" />
          <NavItem icon="??" label="Reels" />
          <NavItem icon="??" label="Messages" />
          <NavItem icon="??" label="Profile" />
          <NavItem icon="??" label="Settings" />
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      <div className="w-80 p-4 border-l border-gray-800">
        <TrendingTopics />
        <SuggestedProfiles />
      </div>
    </div>
  );
}

function NavItem({ icon, label }) {
  return (
    <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800">
      <span className="text-xl mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
}