import { useState } from 'react'
import dynamic from 'next/dynamic'
import PostForm from '../components/Feed/PostForm'
import PostList from '../components/Feed/PostList'
import Navbar from '../components/UI/Navbar'
import SkeletonLoader from '../components/UI/SkeletonLoader'

const DynamicPostList = dynamic(() => import('../components/Feed/PostList'), {
  loading: () => <SkeletonLoader count={5} />,
  ssr: false
});

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <PostForm setPosts={setPosts} />
        {loading ? <SkeletonLoader count={3} /> : <DynamicPostList posts={posts} />}
      </div>
    </div>
  )
}