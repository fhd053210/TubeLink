import { useEffect, useState } from 'react';
import { auth, db } from '../../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useGetYoutubeLink } from './useGetYoutubeLink';

export default function TubePlayer({ youtubeUrl }) {
  const [plan, setPlan] = useState('free');
  const { videoUrl, fetchLink } = useGetYoutubeLink();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setPlan(snap.data().plan);
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (youtubeUrl) {
      let quality = plan === 'pro' ? '2160' : plan === 'plus' ? '1080' : '720';
      fetchLink(youtubeUrl, quality);
      saveToHistory(youtubeUrl);
    }
  }, [youtubeUrl, plan]);

  const saveToHistory = async (url) => {
    const user = auth.currentUser;
    if (!user) return;
    const videoId = url.split('v=')[1] || Date.now().toString();
    await setDoc(doc(db, 'users', user.uid, 'history', videoId), {
      url,
      viewedAt: new Date()
    });
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎥 TubeLink Player</h2>
      {videoUrl ? (
        <video controls autoPlay className="w-full rounded-md">
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <p>🔄 جاري جلب الفيديو بدون إعلانات...</p>
      )}
      <p className="mt-2 text-sm">جودتك الحالية: {plan === 'pro' ? '4K' : plan === 'plus' ? '1080p' : '720p'}</p>
    </div>
  );
}
