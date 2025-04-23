import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '../components/UI/AppLayout';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const PostForm = dynamic(() => import('../components/Feed/PostForm'), { 
  ssr: false 
});

const PostList = dynamic(() => import('../components/Feed/PostList'), {
  ssr: false
});

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <AppLayout>
      <div className="flex-1">
        <div className="flex border-b border-gray-800">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 font-medium ${activeTab === 'posts' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
          >
            Posts
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 font-medium ${activeTab === 'videos' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
          >
            Videos
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'posts' && (
            <>
              <PostForm onNewPost={handleNewPost} />
              <PostList posts={posts} />
            </>
          )}
          {activeTab === 'videos' && (
            <div className="text-center py-10 text-gray-400">
              Video feed coming soon
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}