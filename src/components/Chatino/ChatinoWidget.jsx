import { useState } from 'react';
import { askChatino } from '../../services/openai';
import { auth, db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ChatinoWidget() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [allowed, setAllowed] = useState(false);

  useState(() => {
    const checkPlan = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists() && snap.data().plan === 'pro') {
        setAllowed(true);
      }
    };
    checkPlan();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    const reply = await askChatino(input);
    setMessages([...newMessages, { from: 'bot', text: reply }]);
  };

  if (!allowed) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-900 text-white rounded-xl shadow-lg p-3 z-50">
      <div className="font-bold text-lg mb-2">🤖 Chatino - مساعد TubeLink</div>
      <div className="h-60 overflow-y-auto space-y-2 bg-gray-800 p-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm ${m.from === 'user' ? 'text-blue-400 text-right' : 'text-green-400'}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          className="flex-grow p-1 rounded text-black"
          placeholder="اسألني عن الموقع..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="ml-2 bg-blue-600 px-2 rounded">📩</button>
      </div>
    </div>
  );
}
