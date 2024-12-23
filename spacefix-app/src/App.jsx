import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './components/logins/StudentLogin'
import WelcomePage from './components/WelcomePage'
import StudentSignup from './components/logins/StudentSignup';


function App() {
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        
        
      </Routes>
    </Router>
      
    </>
  )
}

export default App
