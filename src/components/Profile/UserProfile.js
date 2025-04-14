import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function UserProfile({ publicKey }) {
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { publicKey: currentUser } = useWallet();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/profiles/${publicKey}`);
      setProfile(await res.json());
    };
    fetchProfile();
  }, [publicKey]);

  return (
    <div className="profile-container bg-gray-800 rounded-lg p-6">
      <div className="flex items-start">
        <img 
          src={profile?.avatar || '/default-avatar.png'} 
          className="w-24 h-24 rounded-full border-4 border-purple-500"
          alt="Profile"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold">{profile?.name || 'Anonymous'}</h1>
          <p className="text-gray-400">@{profile?.username || publicKey.slice(0,8)}</p>
          <p className="mt-2">{profile?.bio}</p>
          
          <div className="flex mt-4 space-x-4">
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-full ${isFollowing ? 'bg-gray-700' : 'bg-purple-600'}`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button className="px-4 py-2 bg-gray-700 rounded-full">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}