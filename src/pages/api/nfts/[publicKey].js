export default async function handler(req, res) {
  const { publicKey } = req.query;
  const nfts = await getNFTsFromIndexer(publicKey);
  res.status(200).json(nfts);
}