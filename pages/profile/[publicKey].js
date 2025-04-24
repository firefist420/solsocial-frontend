import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '../../components/UI/AppLayout';
import UserProfile from '../../components/Profile/UserProfile';
import ErrorComponent from '../../components/UI/ErrorComponent';

const NFTGallery = dynamic(() => import('../../components/Profile/NFTGallery'), {
  ssr: false,
  loading: () => <div>Loading NFTs...</div>
});

const PostList = dynamic(() => import('../../components/Feed/PostList'), {
  ssr: false,
  loading: () => <div>Loading posts...</div>
});

const ProfileCustomizer = dynamic(() => import('../../components/Profile/ProfileCustomizer'), { 
  ssr: false,
  loading: () => <div>Loading customizer...</div>
});

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [publicKey, setPublicKey] = useState(null);

  useEffect(() => {
    if (router.isReady && router.query.publicKey) {
      setPublicKey(router.query.publicKey);
    }
  }, [router.isReady, router.query.publicKey]);

  if (!router.isReady) return <div>Loading...</div>;
  if (!publicKey) return <ErrorComponent message="No wallet address provided" />;

  return (
    <AppLayout>
      <div className="p-6">
        <UserProfile publicKey={publicKey} />
        
        <div className="flex mt-6 border-b border-gray-800">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('nfts')}
            className={`px-4 py-2 ${activeTab === 'nfts' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
          >
            NFTs
          </button>
          <button 
            onClick={() => setActiveTab('customize')}
            className={`px-4 py-2 ${activeTab === 'customize' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
          >
            Customize
          </button>
        </div>
        
        <div className="mt-6">
          {activeTab === 'profile' && <PostList posts={[]} />}
          {activeTab === 'nfts' && <NFTGallery publicKey={publicKey} />}
          {activeTab === 'customize' && <ProfileCustomizer />}
        </div>
      </div>
    </AppLayout>
  );
}