import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { publicKey } = req.query;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  if (req.method === 'GET') {
    try {
      const profile = await db.collection('profiles').findOne({ publicKey });
      res.status(200).json(profile || { publicKey });
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, bio, themeColor } = req.body;
      
      await db.collection('profiles').updateOne(
        { publicKey },
        { $set: { 
          publicKey,
          name,
          bio,
          themeColor,
          updatedAt: new Date() 
        }},
        { upsert: true }
      );
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Profile save error:', error);
      res.status(500).json({ error: 'Failed to save profile' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}