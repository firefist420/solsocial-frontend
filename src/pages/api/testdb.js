import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('test').insertOne({ test: Date.now() });
    const count = await db.collection('test').countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}