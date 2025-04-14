import { useState } from 'react';

export default function ProfileCustomizer() {
  const [theme, setTheme] = useState('dark');
  const [background, setBackground] = useState('');
  const [profileSong, setProfileSong] = useState(null);

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Customize Your Profile</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block mb-2">Theme Color</label>
          <div className="flex space-x-2">
            {['purple', 'blue', 'pink', 'green'].map(color => (
              <button
                key={color}
                onClick={() => setTheme(color)}
                className={`w-8 h-8 rounded-full bg-${color}-500 ${theme === color ? 'ring-2 ring-white' : ''}`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2">Background Image</label>
          <input 
            type="file" 
            onChange={(e) => setBackground(URL.createObjectURL(e.target.files[0]))}
            className="block w-full text-gray-400"
          />
        </div>

        <div>
          <label className="block mb-2">Profile Song (SOL Audio)</label>
          <input 
            type="file" 
            accept="audio/*"
            onChange={(e) => setProfileSong(URL.createObjectURL(e.target.files[0]))}
            className="block w-full text-gray-400"
          />
          {profileSong && (
            <audio controls className="mt-2 w-full">
              <source src={profileSong} />
            </audio>
          )}
        </div>

        <button className="px-4 py-2 bg-purple-600 rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}