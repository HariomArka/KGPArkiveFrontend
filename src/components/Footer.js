import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Users, Mail, Phone } from 'lucide-react'

const Footer = () => {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/acads', label: 'Academics' },
    { path: '/questions', label: 'Q&A' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <footer className="bg-gray-900 text-white py-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to='/'>
              <div className="flex items-center space-x-2 mb-3 cursor-pointer">
                <img className='w-8 sm:w-10 rounded-full' src="/logo.jpg" alt="KGP Arkive Logo" />
                <span className="text-lg sm:text-xl font-bold text-white">KGP Arkive</span>
              </div>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xs">
              Your academic community for connecting, learning, and growing together. Access study materials, ask questions, and join a supportive network.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Explore</h3>
            <ul className="space-y-1.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-gray-400 hover:text-blue-600 transition-colors duration-200 text-xs sm:text-sm ${
                      location.pathname === link.path ? 'text-blue-600 font-medium' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact and Community */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Get in Touch</h3>
            <ul className="space-y-1.5 text-gray-400">
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm">kgparkivehelp@gmail.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm">+91 98324 16501</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200 text-xs sm:text-sm"
                >
                  Join Our Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} KGP Arkive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer