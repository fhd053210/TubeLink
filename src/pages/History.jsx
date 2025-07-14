import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function History() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = collection(db, 'users', user.uid, 'history');
      const snap = await getDocs(ref);
      const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVideos(items);
    };

    loadHistory();
  }, []);

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📼 سجل المشاهدة</h2>
      {videos.length === 0 && <p>لا يوجد سجل حتى الآن.</p>}
      <ul className="space-y-2">
        {videos.map(video => (
          <li key={video.id} className="bg-gray-800 p-3 rounded-lg">
            <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {video.url}
            </a>
            <p className="text-xs text-gray-400">📅 {new Date(video.viewedAt.seconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
