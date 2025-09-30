import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaLeaf, FaComments, FaStore, FaCloudSun, FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const navItems = [
    { path: '/', label: 'Farm Analysis', labelMl: 'ഫാം വിശകലനം', icon: FaLeaf },
    { path: '/chatbot', label: 'AI Assistant', labelMl: 'AI സഹായി', icon: FaComments },
    { path: '/marketplace', label: 'Marketplace', labelMl: 'മാർക്കറ്റ്', icon: FaStore },
    { path: '/weather', label: 'Weather', labelMl: 'കാലാവസ്ഥ', icon: FaCloudSun },
  ];
  
  // Add profile if logged in
  if (isLoggedIn) {
    navItems.push({ path: '/profile', label: 'Profile', labelMl: 'പ്രൊഫൈൽ', icon: FaUser });
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-20 right-4 z-50 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-6 py-4 transition-all duration-200 border-b-4 ${
                      isActive
                        ? 'text-primary-600 border-primary-600 bg-primary-50'
                        : 'text-gray-600 border-transparent hover:text-primary-600 hover:bg-primary-50'
                    }`
                  }
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-gray-500">({item.labelMl})</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        ></div>

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-primary-600">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                      }`
                    }
                  >
                    <Icon size={20} />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs opacity-75">{item.labelMl}</span>
                    </div>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;