import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';
import AppLayout from '../../components/UI/AppLayout';
import ProfileEditor from '../../components/Profile/ProfileEditor';
import PostList from '../../components/Feed/PostList';

export default function ProfilePage() {
  const router = useRouter();
  const { publicKey: currentUserKey } = useWallet();
  const { publicKey } = router.query;
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (publicKey) {
      fetchProfile();
      fetchPosts();
    }
  }, [publicKey]);

  const fetchProfile = async () => {
    const res = await fetch(`/api/profiles/${publicKey}`);
    const data = await res.json();
    setProfile(data || {});
  };

  const fetchPosts = async () => {
    const res = await fetch(`/api/posts?author=${publicKey}`);
    const data = await res.json();
    setPosts(data);
  };

  const handleSaveProfile = async (updatedProfile) => {
    await fetch(`/api/profiles/${publicKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProfile)
    });
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <AppLayout>
      <div className="p-6">
        {isEditing ? (
          <ProfileEditor 
            profile={profile} 
            onSave={handleSaveProfile}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{profile?.name || 'Anonymous'}</h1>
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
            <p className="mt-4">{profile?.bio || 'No bio yet'}</p>
          </div>
        )}
        <PostList posts={posts} />
      </div>
    </AppLayout>
  );
}