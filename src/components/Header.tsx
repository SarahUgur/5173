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
  onShowSettings?: () => void;
}

export default function Header({ 
  currentUser, 
  onShowSubscription, 
  onLogout, 
  onToggleMobileMenu,
  onShowMessages,
  onShowNotifications,
  onShowProfile,
  onShowSettings
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
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Left side - Mobile menu + Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            {/* Mobile menu button */}
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Logo and Brand */}
            <div className="flex items-center min-w-0 flex-1 -ml-1 sm:-ml-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
                  <path d="M5 15L5.5 17L7.5 17.5L5.5 18L5 20L4.5 18L2.5 17.5L4.5 17L5 15Z"/>
                </svg>
              </div>
              
              {/* Brand text - responsive */}
              <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                {/* Desktop brand */}
                <div className="hidden lg:block">
                  <h1 className="text-xl xl:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Privat Rengøring
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Social platform for rengøring</p>
                </div>
                
                {/* Tablet brand */}
                <div className="hidden sm:block lg:hidden">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Privat Rengøring
                  </h1>
                </div>
                
                {/* Mobile brand */}
                <div className="sm:hidden">
                  <h1 className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate leading-tight">
                    Privat Rengøring
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
              />
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Mobile Search Button */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <button 
                onClick={() => window.location.hash = '#home'}
                className="flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-xl hover:bg-blue-50 text-blue-600 transition-all duration-200 relative group"
                title={t('home')}
              >
                <Home className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden xl:inline font-medium text-sm">{t('home')}</span>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full xl:hidden"></span>
              </button>
              <button 
                onClick={() => window.location.hash = '#jobs'}
                className="flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-200"
                title={t('jobs')}
              >
                <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden xl:inline font-medium text-sm">{t('jobs')}</span>
              </button>
              <button 
                onClick={() => window.location.hash = '#network'}
                className="flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all duration-200"
                title={t('network')}
              >
                <Users className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden xl:inline font-medium text-sm">{t('network')}</span>
              </button>
            </nav>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="text-sm sm:text-base">{currentLanguage.flag}</span>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
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
                      <span className="text-base">{lang.flag}</span>
                      <span className="font-medium text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="flex items-center space-x-1">
              <button 
                onClick={onShowMessages}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200"
                title={t('messages')}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <button 
                onClick={onShowNotifications}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-200"
                title={t('notifications')}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
              </button>
            </div>
            
            {/* Pro Upgrade Button */}
            {!currentUser?.isSubscribed && (
              <button 
                onClick={onShowSubscription}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-full text-xs sm:text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="hidden sm:inline">{t('upgradeToPro')}</span>
                <span className="sm:hidden">Pro</span>
              </button>
            )}

            {/* User Menu */}
            <div className="flex items-center relative ml-1 sm:ml-2">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title={t('profile')}
              >
                <img
                  src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                  alt="Profile"
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-gray-200 hover:border-blue-300 transition-colors duration-200"
                />
              </button>
              
              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onShowProfile?.();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 text-sm">{t('viewProfile')}</span>
                  </button>
                  <button
                    onClick={() => {
                      onShowSettings?.();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 text-sm">{t('settings')}</span>
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
                    <span className="text-sm">{t('logout')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="lg:hidden pb-3 sm:pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 sm:pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm sm:text-base"
                autoFocus
              />
              <button
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}