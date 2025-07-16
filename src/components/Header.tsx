import React, { useState } from 'react';
import { Search, MessageCircle, Bell, User, Home, Briefcase, Users, Settings, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface HeaderProps {
  currentUser: any;
  onShowSubscription: () => void;
  onLogout?: () => void;
  onToggleMobileMenu?: () => void;
  onShowMessages?: () => void;
  onShowNotifications?: () => void;
  onShowProfile?: () => void;
}

export default function Header({ 
  currentUser, 
  onShowSubscription, 
  onLogout, 
  onToggleMobileMenu,
  onShowMessages,
  onShowNotifications,
  onShowProfile
}: HeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Mobile menu button */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg sm:text-xl">PR</span>
              </div>
              <div className="ml-3 hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Privat Rengøring
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Social platform for rengøring</p>
              </div>
              <h1 className="ml-2 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:hidden">
                PR
              </h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
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

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              <button 
                className="p-3 rounded-xl hover:bg-blue-50 text-blue-600 transition-all duration-200 relative group"
                title={t('home')}
              >
                <Home className="w-6 h-6" />
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
              </button>
              <button 
                className="p-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-200"
                title={t('jobs')}
              >
                <Briefcase className="w-6 h-6" />
              </button>
              <button 
                className="p-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-200"
                title={t('network')}
              >
                <Users className="w-6 h-6" />
              </button>
            </nav>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-lg">{currentLanguage.flag}</span>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
                        language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={onShowMessages}
                className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200"
                title={t('messages')}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <button 
                onClick={onShowNotifications}
                className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200"
                title={t('notifications')}
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
              </button>
            </div>
            
            {/* Pro Upgrade Button */}
            {!currentUser?.isSubscribed && (
              <button 
                onClick={onShowSubscription}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="hidden sm:inline">{t('upgradeToPro')}</span>
                <span className="sm:hidden">Pro</span>
              </button>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-2 ml-2 relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title={t('profile')}
              >
                <img
                  src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                  alt="Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 hover:border-blue-300 transition-colors duration-200"
                />
              </button>
              
              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onShowProfile?.();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{t('viewProfile')}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      // Add settings handler here
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{t('settings')}</span>
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => {
                      onLogout?.();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 text-red-600"
                  >
                    <span className="w-4 h-4 text-red-500">⏻</span>
                    <span>{t('logout')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
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