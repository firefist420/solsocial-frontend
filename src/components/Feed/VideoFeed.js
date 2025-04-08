import { useState, useRef } from 'react';

export default function VideoFeed({ videos }) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRefs = useRef([]);

  const handleScroll = (direction) => {
    if (direction === 'up' && currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
    } else if (direction === 'down' && currentVideo < videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {videos.map((video, index) => (
        <div 
          key={video.id}
          className={`absolute w-full h-full transition-transform duration-500 ${index === currentVideo ? 'translate-y-0' : index < currentVideo ? '-translate-y-full' : 'translate-y-full'}`}
        >
          <video
            ref={el => videoRefs.current[index] = el}
            className="w-full h-full object-cover"
            src={video.url}
            autoPlay={index === currentVideo}
            loop
          />
          <div className="absolute bottom-20 left-4 text-white">
            <p className="font-bold">@{video.username}</p>
            <p>{video.caption}</p>
          </div>
        </div>
      ))}
      
      <div className="absolute right-4 bottom-20 flex flex-col space-y-6">
        <button className="p-2 bg-gray-800 rounded-full">
          ?? {videos[currentVideo]?.likes}
        </button>
        <button className="p-2 bg-gray-800 rounded-full">
          ?? {videos[currentVideo]?.comments}
        </button>
        <button className="p-2 bg-gray-800 rounded-full">
          ??
        </button>
      </div>
    </div>
  );
}