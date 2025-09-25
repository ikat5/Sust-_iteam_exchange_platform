import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import categories from './Categories';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setMessage('⚠️ Please enter something to search.');
      return;
    }

    const qLower = trimmed.toLowerCase();
    const words = qLower.split(/\s+/);

    // exact match
    let exactMatch = categories.find(cat =>
      words.includes(cat.name.toLowerCase())
    );
    if (exactMatch) {
      setMessage('');
      navigate(exactMatch.link);
      return;
    }

    // partial match
    let partialMatch = null;
    for (const cat of categories) {
      const catNameLower = cat.name.toLowerCase();
      for (const w of words) {
        if (w.includes(catNameLower) || catNameLower.includes(w)) {
          partialMatch = cat;
          break;
        }
      }
      if (partialMatch) break;
    }
    if (partialMatch) {
      setMessage('');
      navigate(partialMatch.link);
      return;
    }

    // no match
    setMessage("We couldn't find that category. Please try another keyword.");
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    // Clear the message while typing so it doesn't persist unnecessarily
    if (message) {
      setMessage('');
    }
  };

  const handleBlur = () => {
    // When input loses focus, clear the message
    setMessage('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SB</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Sust Bikroi</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
                  ${message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
            {message && (
              <div className="mt-2 px-3 py-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586l-4.95 4.95 1.414 1.414L12 12.828l4.95 4.95 1.414-1.414-4.95-4.95 4.95-4.95z"
                  />
                </svg>
                <span>{message}</span>
              </div>
            )}
          </div>

          {/* Login/User Menu */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/sell"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sell Product
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">U</span>
                    </div>
                    <span>User</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/my-products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Products</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
