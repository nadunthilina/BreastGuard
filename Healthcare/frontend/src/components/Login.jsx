import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password
      })
      
      if (response.data.status === 'success') {
        localStorage.setItem('user', JSON.stringify({
          username,
          email: response.data.email
        }))
        setIsAuthenticated(true)
        navigate('/dashboard')
      } else {
        setError(response.data.message)
      }
    } catch (err) {
      setError('Login failed. Please check your credentials or try again later.')
      console.error('Login error:', err)
    }
  }

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <p>Sign in to access the Breast Cancer Detection System</p>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="auth-button">Sign In</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default Login
