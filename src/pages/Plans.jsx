import { auth, db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const plans = [
  {
    name: 'Free',
    price: '0',
    quality: '720p',
    features: ['فيديو بجودة 720p'],
    key: 'free'
  },
  {
    name: 'Plus',
    price: '29.99 ريال',
    quality: '1080p',
    features: ['جودة 1080p', 'تشغيل بالخلفية'],
    key: 'plus'
  },
  {
    name: 'Pro',
    price: '50 ريال',
    quality: '4K',
    features: ['جودة 4K', 'تشغيل بالخلفية', 'Chatino'],
    key: 'pro'
  }
];

export default function Plans() {
  const handleSelect = async (planKey) => {
    const user = auth.currentUser;
    if (!user) return alert('سجل دخول أولاً');
    const ref = doc(db, 'users', user.uid);
    await updateDoc(ref, {
      plan: planKey,
      payment_method: 'cash'
    });
    alert(`تم ترقية حسابك إلى ${planKey}`);
  };

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">🔐 اختر باقتك في TubeLink</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.key} className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500">
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-lg mb-2">{plan.price}</p>
            <p className="mb-4 text-sm">الجودة: {plan.quality}</p>
            <ul className="text-sm list-disc ml-4 mb-4">
              {plan.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <button
              onClick={() => handleSelect(plan.key)}
              className="bg-blue-600 w-full p-2 rounded hover:bg-blue-700"
            >
              اختر {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
