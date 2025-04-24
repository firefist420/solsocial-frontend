import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function PostList({ posts }) {
  const { publicKey } = useWallet();
  const [likedPosts, setLikedPosts] = useState({});

  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border border-gray-700 rounded-lg bg-gray-800">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="font-bold text-white">@{post.author?.slice(0, 8)}...</span>
              </div>
              <p className="text-white mb-2">{post.content}</p>
              <div className="flex space-x-4 text-gray-400">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center ${likedPosts[post.id] ? 'text-red-500' : ''}`}
                >
                  ♥ {likedPosts[post.id] ? '1' : '0'}
                </button>
                <button className="flex items-center">
                  💬 Comment
                </button>
                {publicKey?.toString() === post.author && (
                  <button className="text-gray-500">
                    ✏️ Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}