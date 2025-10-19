import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null)

  const [username, setUsername] = useState(null);

  // Update useEffect to listen to both user and localStorage changes
  useEffect(() => {
    // Check both AuthContext user and localStorage
    const storedName = localStorage.getItem("username");
    const contextUser = user?.username || user?.name; // Adjust based on your user object structure
    
    // Prioritize context user over localStorage
    if (contextUser) {
      setUsername(contextUser);
    } else if (storedName) {
      setUsername(storedName);
    } else {
      setUsername(null);
    }
  }, [user]);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Fixed getInitials function with proper null checks
  const getInitials = (name) => {
    // Add null/undefined checks before calling trim
    if (!name || typeof name !== 'string') {
      return 'U'; // Default fallback
    }
    
    const trimmedName = name.trim();
    if (!trimmedName) {
      return 'U'; // Default fallback for empty string
    }
    
    const parts = trimmedName.split(" ");
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return trimmedName.slice(0, 2).toUpperCase();
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/acads', label: 'Academics' },
    { path: '/questions', label: 'Q&A' },
    { path: '/myquestions', label: 'My Doubts' },
    { path: '/contribute', label: 'Contribute' },
    { path: '/contact', label: 'Contact' }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout() // Call the logout function from AuthContext
    localStorage.removeItem("username") // Remove username from localStorage
    setUsername(null) // Clear username state
    setIsDropdownOpen(false) // Close dropdown
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Determine if user is logged in (check both sources)
  const isLoggedIn = user || username;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img className='w-10' src="/logo.jpg" alt="" />
            <span className="text-xl font-bold text-gray-800">
              KGP Arkive
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Desktop Login/Initials Button with Dropdown */}
            {isLoggedIn ? (
              <div className="ml-4 relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full font-bold transition-colors duration-200 cursor-pointer"
                >
                  {getInitials(username)}
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      <p className="font-medium">{username || 'User'}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-80 opacity-100 pb-4'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Login/Initials Button with Dropdown */}
            {isLoggedIn ? (
              <div className="mt-3">
                <button
                  onClick={toggleDropdown}
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-base font-bold transition-colors duration-200"
                >
                  {getInitials(username)}
                </button>
                
                {/* Mobile Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      <p className="font-medium">{username || 'User'}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 mt-3"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar