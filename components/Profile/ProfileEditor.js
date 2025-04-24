import { useState } from 'react';

export default function ProfileEditor({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    bio: profile?.bio || '',
    themeColor: profile?.themeColor || '#7e22ce'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1">Theme Color</label>
          <input
            type="color"
            name="themeColor"
            value={formData.themeColor}
            onChange={handleChange}
            className="w-12 h-12"
          />
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-purple-600 rounded-lg"
          >
            Save
          </button>
          <button 
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}