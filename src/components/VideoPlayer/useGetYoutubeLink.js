import { useState } from 'react';

export function useGetYoutubeLink() {
  const [videoUrl, setVideoUrl] = useState(null);

  const fetchLink = async (youtubeUrl, quality) => {
    const res = await fetch(`http://localhost:4000/api/video?url=${youtubeUrl}&quality=${quality}`);
    const data = await res.json();
    setVideoUrl(data.url);
  };

  return { videoUrl, fetchLink };
}
