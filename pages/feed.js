import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import AppLayout from '../components/UI/AppLayout';

const PostForm = ({ onNewPost }) => {
  const [content, setContent] = useState('');
  const { publicKey } = useWallet();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !publicKey) return;
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          author: publicKey.toString(),
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        onNewPost(newPost);
        setContent('');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
        placeholder="What's happening?"
        rows={3}
      />
      <button 
        type="submit" 
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Post
      </button>
    </form>
  );
};

const PostList = ({ posts }) => {
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <AppLayout>
      <div className="flex-1 p-4">
        <PostForm onNewPost={handleNewPost} />
        <PostList posts={posts} />
      </div>
    </AppLayout>
  );
}