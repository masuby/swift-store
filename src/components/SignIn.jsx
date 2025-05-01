import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { FaGoogle } from 'react-icons/fa';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Email/Password Sign In or Sign Up
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/'); // Redirect to homepage on success
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirect to homepage on success
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      {/* Left Side: Branding/Welcome Section */}
      <div className="signin-branding">
        <h1>Welcome to Swift Store</h1>
        <p>
          {isSignUp ? 'Create an account to start shopping!' : 'Sign in to explore and shop!'}
        </p>
      </div>

      {/* Right Side: Form Section */}
      <div className="signin-form-section">
        <div className="signin-form">
          {/* Toggle Tabs */}
          <div className="toggle-tabs">
            <button
              className={`tab ${!isSignUp ? 'active' : ''}`}
              onClick={() => setIsSignUp(false)}
              disabled={loading}
            >
              Sign In
            </button>
            <button
              className={`tab ${isSignUp ? 'active' : ''}`}
              onClick={() => setIsSignUp(true)}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Form */}
          <form onSubmit={handleEmailAuth}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="google-btn"
            disabled={loading}
          >
            <FaGoogle className="google-icon" />
            Sign {isSignUp ? 'Up' : 'In'} with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;