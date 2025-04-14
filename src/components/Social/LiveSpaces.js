import { useEffect, useState } from 'react';

export default function LiveSpaces() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      const response = await fetch('/api/spaces/live');
      const data = await response.json();
      setSpaces(data);
    };
    fetchSpaces();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {spaces.map(space => (
        <div key={space.id} className="p-4 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-bold">{space.topic}</h3>
          <audio controls src={space.streamUrl} className="w-full mt-2" />
          <div className="flex mt-4 space-x-2">
            {space.speakers.map(speaker => (
              <div key={speaker.publicKey} className="flex items-center">
                <img 
                  src={speaker.avatar} 
                  className="w-8 h-8 rounded-full" 
                  alt={speaker.name}
                />
                <span className="ml-2">{speaker.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}