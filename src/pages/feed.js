import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/UI/Navbar';
import SkeletonLoader from '../components/UI/SkeletonLoader';

const PostForm = dynamic(() => import('../components/Feed/PostForm'), { 
  ssr: false 
});
const PostList = dynamic(() => import('../components/Feed/PostList'), { 
  ssr: false 
});

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <PostForm setPosts={setPosts} />
        {loading ? <SkeletonLoader count={3} /> : <PostList posts={posts} />}
      </div>
    </div>
  );
}