export default function PostForm({ setPosts }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setPosts(prev => [{ id: Date.now(), content }, ...prev]);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border rounded-lg"
        placeholder="What's happening?"
      />
      <button 
        type="submit" 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Post
      </button>
    </form>
  );
}