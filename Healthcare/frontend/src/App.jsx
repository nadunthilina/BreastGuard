import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Resources from './components/Resources'
import About from './components/About'
import PatientHistory from './components/PatientHistory'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'
import CookieConsent from './components/CookieConsent'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('user') ? true : false
  )
  const [showCookieConsent, setShowCookieConsent] = useState(true)

  useEffect(() => {
    // Check if user has already consented to cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent === 'accepted') {
      setShowCookieConsent(false)
    }
  }, [])

  const handleCookieConsent = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowCookieConsent(false)
  }

  return (
    <div className="app">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />
          } />
          
          <Route path="/signup" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
          } />
          
          <Route path="/dashboard" element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
      
      {showCookieConsent && (
        <CookieConsent onAccept={handleCookieConsent} />
      )}
    </div>
  )
}

export default App
