export default function PostList({ posts }) {
  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}