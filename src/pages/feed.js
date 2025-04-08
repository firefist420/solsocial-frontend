import { useState } from 'react';
import dynamic from 'next/dynamic';
import AppLayout from '../components/UI/AppLayout';
import VideoFeed from '../components/Feed/VideoFeed';

const PostForm = dynamic(() => import('../components/Feed/PostForm'), { 
  ssr: false 
});

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [videos, setVideos] = useState([]);

  return (
    <AppLayout>
      <div className="flex-1">
        <div className="flex border-b border-gray-800">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 ${activeTab === 'posts' ? 'border-b-2 border-purple-500' : ''}`}
          >
            Posts
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 ${activeTab === 'videos' ? 'border-b-2 border-purple-500' : ''}`}
          >
            Videos
          </button>
        </div>
        
        {activeTab === 'posts' ? (
          <div className="p-4">
            <PostForm setPosts={setPosts} />
            <PostList posts={posts} />
          </div>
        ) : (
          <VideoFeed videos={videos} />
        )}
      </div>
    </AppLayout>
  );
}