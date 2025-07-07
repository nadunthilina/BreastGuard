import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if there's a message from another page (like successful signup)
  const message = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password
      });
      
      if (response.data.status === 'success') {
        localStorage.setItem('user', JSON.stringify({
          username,
          email: response.data.email
        }));
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials or try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="auth-container">
        <h2>Welcome Back</h2>
        
        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-sm">Forgot Password?</a>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            By signing in, you agree to our 
            <Link to="/terms-of-service" className="mx-1">Terms of Service</Link>
            and
            <Link to="/privacy-policy" className="mx-1">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
