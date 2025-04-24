import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  if (req.method === 'POST') {
    try {
      const { content, author } = req.body;
      
      if (!content || !author) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newPost = {
        content,
        author,
        createdAt: new Date(),
        likes: 0,
        comments: []
      };

      const result = await db.collection('posts').insertOne(newPost);
      res.status(201).json({ ...newPost, _id: result.insertedId });

    } catch (error) {
      console.error('Post creation error:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else if (req.method === 'GET') {
    try {
      const posts = await db.collection('posts')
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Post fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}