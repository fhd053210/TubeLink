import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserData(snap.data());
      }
    };
    loadUser();
  }, []);

  if (!userData) {
    return <div className="p-6 text-white">⏳ جاري تحميل البيانات...</div>;
  }

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📊 لوحة التحكم</h2>
      <div className="bg-gray-800 p-4 rounded-xl space-y-2">
        <p><strong>📧 البريد الإلكتروني:</strong> {userData.email}</p>
        <p><strong>👤 اسم المستخدم:</strong> {userData.username}</p>
        <p><strong>🧾 نوع الاشتراك:</strong> 
          <span className={
            userData.plan === 'pro' ? 'text-green-400' : 
            userData.plan === 'plus' ? 'text-blue-400' : 'text-gray-400'
          }> {userData.plan}</span>
        </p>
        <p><strong>💳 الدفع:</strong> {userData.payment_method}</p>
        <p><strong>🕐 منذ:</strong> {userData.createdAt?.toDate?.().toLocaleString() || '—'}</p>
        <Link to="/plans" className="inline-block mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">تغيير الاشتراك</Link>
      </div>
    </div>
  );
}
