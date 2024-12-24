// // src/components/LectureLogin.jsx
// import { useState } from 'react';
// import { auth, googleProvider, db } from '../config/firebase';
// import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import { FaGoogle } from 'react-icons/fa';
// import './Login.css'; // Import the custom CSS file


// const LectureLogin = () => {
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleGoogleLogin = async () => {
//     try {
//       setLoading(true);
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       // Check if the user exists in lectures collection
//       const lectureRef = doc(db, 'lectures', user.email);
//       const lectureSnap = await getDoc(lectureRef);

//       if (!lectureSnap.exists()) {
//         throw new Error('Unauthorized access. Only lecturers can login here.');
//       }

//       const lectureData = lectureSnap.data();
//       if (lectureData.role !== 'lecture') {
//         throw new Error('Invalid role. Access denied.');
//       }

//       // Update user document with lecture data
//       const userRef = doc(db, 'users', user.uid);
//       await setDoc(userRef, {
//         name: lectureData.name,
//         email: user.email,
//         role: 'lecture',
//         lastLogin: new Date().toISOString()
//       }, { merge: true });

//       navigate('/lecture-dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       alert(error.message);
//       await auth.signOut();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEmailLogin = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const lectureRef = doc(db, 'lectures', email);
//       const lectureSnap = await getDoc(lectureRef);

//       if (!lectureSnap.exists()) {
//         throw new Error('Unauthorized access. Only lecturers can login here.');
//       }

//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('/lecture-dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2 className="login-title">Lecture Login</h2>
//         <form onSubmit={handleEmailLogin} className="form">
//           <div className="input-group">
//             <label htmlFor="email" className="label">Email address</label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password" className="label">Password</label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="submit-btn"
//           >
//             {loading ? 'Loading...' : 'Sign In with Email'}
//           </button>
//         </form>

//         <div className="separator">
//           <span className="separator-text">OR</span>
//         </div>

//         <button
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className="google-btn"
//         >
//           {loading ? 'Loading...' : (
//             <>
//               <FaGoogle className="google-icon" /> Continue with Google
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LectureLogin;

import { useState } from 'react';
import { auth, googleProvider, db } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import './Login.css'; // Import the custom CSS file

const LectureLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the email exists in 'lectures' collection
      const lectureRef = doc(db, 'lectures', user.email);
      const lectureSnap = await getDoc(lectureRef);

      if (!lectureSnap.exists()) {
        throw new Error('Unauthorized access. Only lecturers can login here.');
      }

      const lectureData = lectureSnap.data();
      if (lectureData.role !== 'lecture') {
        throw new Error('Invalid role. Access denied.');
      }

      navigate('/lecture-dashboard');
    } catch (error) {
      console.error('Google Login Error:', error);
      alert(error.message);
      await auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Check if the email exists in 'lectures' collection
      const lectureRef = doc(db, 'lectures', email);
      const lectureSnap = await getDoc(lectureRef);

      if (!lectureSnap.exists()) {
        throw new Error('Unauthorized access. Only lecturers can login here.');
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate('/lecture-dashboard');
    } catch (error) {
      console.error('Email Login Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Lecture Login</h2>
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

export default LectureLogin;
