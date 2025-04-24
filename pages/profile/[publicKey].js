import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';
import AppLayout from '../../components/UI/AppLayout';

export default function ProfilePage() {
  const router = useRouter();
  const { publicKey: currentUserKey } = useWallet();
  const { publicKey } = router.query;
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    themeColor: '#7e22ce'
  });

  useEffect(() => {
    if (publicKey) {
      fetchProfile();
    }
  }, [publicKey]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/profiles/${publicKey}`);
      const data = await res.json();
      setProfile(data);
      setFormData({
        name: data.name || '',
        bio: data.bio || '',
        themeColor: data.themeColor || '#7e22ce'
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/profiles/${publicKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchProfile();
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <AppLayout>
      <div className="p-6">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 bg-gray-700 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full p-2 bg-gray-700 rounded"
                  rows={3}
                />
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-purple-600 rounded-lg"
                >
                  Save
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name || 'Anonymous'}</h1>
                  <p className="text-gray-400">@{publicKey?.slice(0, 8)}...</p>
                </div>
                {currentUserKey?.toString() === publicKey && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-purple-600 rounded-lg"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              <p className="mt-4">{profile.bio || 'No bio yet'}</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}