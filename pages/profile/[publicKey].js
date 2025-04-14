import { useRouter } from 'next/router';
import { useState } from 'react';
import AppLayout from '../../../components/UI/AppLayout';
import UserProfile from '../../../components/Profile/UserProfile';
import NFTGallery from '../../../components/Profile/NFTGallery';
import PostList from '../../../components/Feed/PostList';

export default function ProfilePage() {
  const router = useRouter();
  const { publicKey } = router.query;
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <AppLayout>
      <div className="p-6">
        <UserProfile publicKey={publicKey} />
        <div className="flex mt-6 border-b border-gray-800">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-purple-500' : ''}`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('nfts')}
            className={`px-4 py-2 ${activeTab === 'nfts' ? 'border-b-2 border-purple-500' : ''}`}
          >
            NFTs
          </button>
        </div>
        <div className="mt-6">
          {activeTab === 'profile' && <PostList posts={[]} />}
          {activeTab === 'nfts' && <NFTGallery publicKey={publicKey} />}
        </div>
      </div>
    </AppLayout>
  );
}