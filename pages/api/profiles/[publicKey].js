import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { publicKey } = req.query;

  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      const profile = await db.collection('profiles').findOne({ publicKey });
      res.status(200).json(profile || {});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  } else if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      await db.collection('profiles').updateOne(
        { publicKey },
        { $set: { ...req.body, publicKey } },
        { upsert: true }
      );
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
}