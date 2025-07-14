import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import History from './pages/History';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Plans from './pages/Plans';
import ChatinoWidget from './components/Chatino/ChatinoWidget';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 border-b border-gray-700">
          <h1 className="text-xl font-bold">🎬 TubeLink</h1>
          <Link to="/plans" className="text-blue-400 hover:underline">الاشتراكات</Link>
          <Link to="/dashboard" className="text-blue-400 hover:underline">لوحة التحكم</Link>
          <Link to="/history" className="text-blue-400 hover:underline">📼 السجل</Link>
        </nav>
        <Routes>
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans" element={<Plans />} />
        </Routes>
        <ChatinoWidget />
      </div>
    </Router>
  );
}

export default App;
