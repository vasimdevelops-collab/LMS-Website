
import React, { useState } from 'react';

interface NavbarProps {
  onNavigate?: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Helper to handle navigation if prop is provided
  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsSidebarOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#', action: () => handleNav('home') },
    { name: 'Courses', href: '#', action: () => handleNav('catalog') },
    { name: 'Dashboard', href: '#', action: () => handleNav('dashboard') },
    { name: 'Pricing', href: '#', action: () => handleNav('pricing') },
    { name: 'Instructors', href: '#', action: () => handleNav('instructor-dashboard') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button onClick={() => handleNav('home')} className="flex items-center gap-1 focus:outline-none">
              <span className="text-2xl font-bold text-dark tracking-tight">Edu</span>
              <span className="text-2xl font-bold text-primary tracking-tight">Wave</span>
            </button>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="text-base font-medium text-dark hover:text-primary transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right: Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 text-gray-700 placeholder-gray-400 rounded-full px-4 py-2 pl-10 w-full max-w-[420px] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white border-transparent focus:border-primary transition-all"
              />
            </div>
            
            {/* Notification Bell */}
            <button 
              onClick={() => handleNav('notifications')}
              className="relative p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-gray-50"
              aria-label="Notifications"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Unread Badge Mock */}
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* User Profile / Settings Link (Simulating logged in user for demo consistency) */}
            <button 
              onClick={() => handleNav('settings')}
              className="w-10 h-10 rounded-full bg-gray-200 border border-gray-200 overflow-hidden hover:ring-2 hover:ring-primary transition-all focus:outline-none"
              title="Profile & Settings"
            >
               <img src="https://ui-avatars.com/api/?name=Alex&background=random" alt="Profile" className="w-full h-full object-cover" />
            </button>
          </div>

          {/* Mobile Actions: Search Icon & Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => handleNav('notifications')}
              className="text-dark p-2 hover:bg-gray-50 rounded-full transition-colors relative"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <button
              onClick={toggleSidebar}
              className="text-dark p-2 hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-dark">Edu</span>
              <span className="text-xl font-bold text-primary">Wave</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="text-muted hover:text-dark transition-colors p-1"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="text-lg font-medium text-dark hover:text-primary transition-colors text-left"
                >
                  {link.name}
                </button>
              ))}
              <hr className="border-gray-100 my-2" />
              <button 
                onClick={() => handleNav('notifications')}
                className="text-lg font-medium text-dark hover:text-primary transition-colors text-left flex items-center justify-between"
              >
                Notifications
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">2 New</span>
              </button>
              <button 
                onClick={() => handleNav('settings')}
                className="text-lg font-medium text-dark hover:text-primary transition-colors text-left"
              >
                Settings
              </button>
              <button 
                onClick={() => handleNav('login')}
                className="text-lg font-medium text-dark hover:text-primary transition-colors text-left"
              >
                Login
              </button>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-100">
            <button
              onClick={() => handleNav('signup')}
              className="flex justify-center w-full px-6 py-3 bg-primary text-white text-base font-medium rounded-full shadow-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
