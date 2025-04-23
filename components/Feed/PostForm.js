import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function PostForm({ onNewPost }) {
  const [content, setContent] = useState('');
  const { publicKey } = useWallet();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !publicKey) return;
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Post
      </button>
    </form>
  );
}