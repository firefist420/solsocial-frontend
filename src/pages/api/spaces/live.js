export default async function handler(req, res) {
  const spaces = await getLiveSpaces();
  res.status(200).json(spaces);
}