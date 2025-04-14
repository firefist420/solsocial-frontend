export default async function handler(req, res) {
  try {
    const spaces = await fetchLiveSpaces();
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function fetchLiveSpaces() {
  return [
    {
      id: '1',
      topic: 'Solana Ecosystem Updates',
      streamUrl: 'https://example.com/stream1.mp3',
      speakers: [
        {
          publicKey: 'abc123',
          name: 'SolanaDev',
          avatar: '/avatars/solanadev.png'
        }
      ]
    }
  ];
}