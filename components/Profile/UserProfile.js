<<<<<<< HEAD
export default function UserProfile({ publicKey }) {
  return (
    <div className="profile-container bg-gray-800 rounded-lg p-6">
      <div className="flex items-start">
        <div className="w-24 h-24 rounded-full border-4 border-purple-500 bg-gray-700"></div>
        <div className="ml-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="text-gray-400">@{publicKey?.slice(0,8)}</p>
=======
import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import TipButton from './TipButton';

export default function UserProfile({ publicKey }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (publicKey) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/users/${publicKey}`);
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [publicKey]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!profile) return <div className="p-6">Profile not found</div>;

  return (
    <div className="profile-container bg-gray-800 rounded-lg p-6">
      <div className="flex items-start">
        <div className="w-24 h-24 rounded-full border-4 border-purple-500 bg-gray-700 overflow-hidden">
          {profile.avatar && (
            <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="ml-6 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{profile.name || 'Anonymous'}</h1>
              <p className="text-gray-400">@{publicKey.slice(0, 8)}...</p>
              <p className="mt-2">{profile.bio}</p>
            </div>
            <TipButton recipient={new PublicKey(publicKey)} />
          </div>
>>>>>>> c145543 (Your commit message)
        </div>
      </div>
    </div>
  );
}