import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import StudentLogin from './components/StudentLogin';
import StudentDashboard from './components/StudentDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { LectureDashboard } from './components/LectureDashboard';
import LectureLogin from './components/LectureLogin';

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
            <Route path="/lecture-login" element={<LectureLogin />} />
            <Route path="/lecture-dashboard" element={<LectureDashboard />} />


           
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
