import { useState } from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '../components/UI/AppLayout';
import VideoFeed from '../components/Feed/VideoFeed';
import PostList from '../components/Feed/PostList';
import TokenSearch from '../components/Token/TokenSearch';
import LiveSpaces from '../components/Social/LiveSpaces';

const PostForm = dynamic(() => import('../components/Feed/PostForm'), { 
  ssr: false 
});

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [videos, setVideos] = useState([]);
  const [spaces, setSpaces] = useState([]);

  return (
    <AppLayout>
      <div className="flex-1">
        <TokenSearch />
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
          <button 
            onClick={() => setActiveTab('spaces')}
            className={`px-4 py-2 font-medium ${activeTab === 'spaces' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
          >
            Spaces
          </button>
        </div>
        
        {activeTab === 'posts' ? (
          <div className="p-4">
            <PostForm setPosts={setPosts} />
            <PostList posts={posts} />
          </div>
        ) : activeTab === 'videos' ? (
          <VideoFeed videos={videos} />
        ) : (
          <LiveSpaces spaces={spaces} />
        )}
      </div>
    </AppLayout>
  );
}