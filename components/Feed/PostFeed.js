import { useState } from 'react';

export default function PostFeed({ tokenAddress }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    setPosts([{ 
      id: Date.now(), 
      content: newPost,
      timestamp: new Date().toISOString(),
      tokenAddress 
    }, ...posts]);
    setNewPost('');
  };

  return (
    <div className="post-feed">
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full p-3 border rounded-lg bg-gray-800 text-white"
          placeholder={`Post about this token...`}
        />
        <button 
          type="submit" 
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Post
        </button>
      </form>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="p-4 border border-gray-700 rounded-lg">
            <p className="text-white">{post.content}</p>
            <p className="text-gray-400 text-sm mt-2">
              {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}