// // src/components/StudentLogin.jsx
// import { useState } from 'react';
// import { auth, googleProvider, db } from '../config/firebase';
// import { signInWithPopup } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const StudentLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     try {
//       setLoading(true);
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       // Removed domain check, allowing all email addresses to log in

//       // Check if user exists in users collection
//       const userRef = doc(db, 'users', user.uid);
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         // Create new user document
//         await setDoc(userRef, {
//           name: user.displayName,
//           email: user.email,
//           role: 'student',
//           createdAt: new Date().toISOString(),
//           lastLogin: new Date().toISOString()
//         });
//       } else {
//         // Update last login
//         await setDoc(userRef, {
//           lastLogin: new Date().toISOString()
//         }, { merge: true });
//       }

//       navigate('/student-dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Student Login
//           </h2>
//         </div>
//         <button
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           {loading ? 'Loading...' : 'Continue with Google'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;

// src/components/StudentLogin.jsx
import { useState } from 'react';
import { auth, googleProvider, db } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa'; // Import the Google icon
import './StudentLogin.css'; // Import the custom CSS file

const StudentLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          role: 'student',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });
      } else {
        await setDoc(userRef, {
          lastLogin: new Date().toISOString()
        }, { merge: true });
      }

      navigate('/student-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/student-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Student Login</h2>
        <form onSubmit={handleEmailLogin} className="form">
          <div className="input-group">
            <label htmlFor="email" className="label">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Loading...' : 'Sign In with Email'}
          </button>
        </form>

        <div className="separator">
          <span className="separator-text">OR</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="google-btn"
        >
          {loading ? 'Loading...' : (
            <>
              <FaGoogle className="google-icon" /> Continue with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;
