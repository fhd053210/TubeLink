import { useState } from 'react';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', userCred.user.uid), {
      email,
      username,
      plan: 'free',
      payment_method: 'cash',
      createdAt: serverTimestamp()
    });
    alert('تم التسجيل بنجاح!');
  };

  return (
    <form onSubmit={handleRegister} className="p-4 space-y-4 bg-gray-800 text-white rounded-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold">تسجيل حساب جديد</h2>
      <input placeholder="اسم المستخدم" className="w-full p-2 rounded" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input placeholder="البريد الإلكتروني" className="w-full p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="كلمة المرور" type="password" className="w-full p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="bg-blue-500 p-2 w-full rounded">تسجيل</button>
    </form>
  );
}
