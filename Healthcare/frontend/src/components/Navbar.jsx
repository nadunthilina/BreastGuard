import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/heart-icon.svg" alt="HeartCare Logo" />
          HeartCare Prediction
        </Link>
        
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
        
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
              <button 
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }} 
                className="btn btn-outline btn-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/signup" onClick={() => setMenuOpen(false)} className="btn btn-primary btn-sm">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
