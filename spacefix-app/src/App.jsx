import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentLogin from './components/StudentLogin';
import StudentDashboard from './components/StudentDashboard';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
