import React, { useState } from 'react';
import { Search, MessageCircle, Bell, User, Home, Briefcase, Users, Settings, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentUser: any;
  onShowSubscription: () => void;
  onLogout?: () => void;
  onToggleMobileMenu?: () => void;
}

export default function Header({ currentUser, onShowSubscription, onLogout, onToggleMobileMenu }: HeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Mobile menu button */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">PR</span>
              </div>
              <h1 className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-gray-900 hidden sm:block">
                Privat Rengøring
              </h1>
              <h1 className="ml-2 text-sm font-bold text-gray-900 sm:hidden">
                PR
              </h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Søg efter rengøringsopgaver, personer..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Navigation */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              <button className="p-2 rounded-lg hover:bg-gray-100 text-blue-600 transition-colors duration-200">
                <Home className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200">
                <Briefcase className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200">
                <Users className="w-6 h-6" />
              </button>
            </nav>

            {/* User actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
              </button>
              
              {!currentUser?.isSubscribed && (
                <button 
                  onClick={onShowSubscription}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  <span className="hidden sm:inline">Opgrader til Pro</span>
                  <span className="sm:hidden">Pro</span>
                </button>
              )}

              <div className="flex items-center space-x-2">
                <img
                  src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                  alt="Profile"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                />
                <button 
                  onClick={onLogout}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  title="Log ud"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Søg efter rengøringsopgaver..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <button
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}