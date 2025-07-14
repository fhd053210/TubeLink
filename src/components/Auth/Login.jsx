import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    alert('تم تسجيل الدخول!');
  };

  return (
    <form onSubmit={handleLogin} className="p-4 space-y-4 bg-gray-800 text-white rounded-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold">تسجيل الدخول</h2>
      <input placeholder="البريد الإلكتروني" className="w-full p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="كلمة المرور" type="password" className="w-full p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="bg-green-500 p-2 w-full rounded">دخول</button>
    </form>
  );
}
