import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      
      const newPost = {
        content: req.body.content,
        author: req.body.author,
        createdAt: new Date(),
      };

      const result = await db.collection('posts').insertOne(newPost);
      res.status(201).json({ ...newPost, id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      const posts = await db.collection('posts').find().sort({ createdAt: -1 }).toArray();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}