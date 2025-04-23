import { useState } from 'react';
import TipButton from '../Social/TipButton';

export default function PostList({ posts }) {
  const [expandedPost, setExpandedPost] = useState(null);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div 
          key={post._id || post.id} 
          className="p-4 border border-gray-700 rounded-lg bg-gray-800"
        >
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="font-bold text-white">@{post.author?.slice(0, 8)}...</span>
              </div>
              <p className="text-white mb-2">{post.content}</p>
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <button className="hover:text-white">Like</button>
                <button className="hover:text-white">Comment</button>
                <TipButton recipient={post.author} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}