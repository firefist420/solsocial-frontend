export default function UserProfile({ publicKey }) {
  return (
    <div className="profile-container bg-gray-800 rounded-lg p-6">
      <div className="flex items-start">
        <div className="w-24 h-24 rounded-full border-4 border-purple-500 bg-gray-700"></div>
        <div className="ml-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="text-gray-400">@{publicKey?.slice(0,8)}</p>
          <div className="mt-4 flex space-x-4">
            <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}