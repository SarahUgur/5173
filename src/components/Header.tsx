import React, { useState } from 'react';
import { Search, MessageCircle, Bell, User, Home, Briefcase, Users, Settings, Menu, X, Globe, MapPin, Calendar, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import LogoSelector from './LogoSelector';

interface HeaderProps {
  currentUser: any;
  onShowSubscription: () => void;
  onLogout?: () => void;
  onToggleMobileMenu?: () => void;
  onShowMessages?: () => void;
  onShowNotifications?: () => void;
  onShowProfile?: () => void;
  onShowSettings?: () => void;
  currentPage?: string;
  onPageChange?: (page: string) => void;
  onShowFriendRequests?: () => void;
}

export default function Header({ 
  currentUser, 
  onShowSubscription, 
  onLogout, 
  onToggleMobileMenu,
  onShowMessages,
  onShowNotifications,
  onShowProfile,
  onShowSettings,
  currentPage = 'home',
  onPageChange,
  onShowFriendRequests
}: HeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [showLogoSelector, setShowLogoSelector] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  // Auto-close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Close all dropdowns if clicking outside
      if (!target.closest('.language-dropdown')) {
        setShowLanguageMenu(false);
      }
      if (!target.closest('.profile-dropdown')) {
        setShowProfileMenu(false);
      }
      if (!target.closest('.quick-actions-dropdown')) {
        setShowQuickActions(false);
      }
      if (!target.closest('.search-dropdown')) {
        setShowSearchResults(false);
      }
      if (!target.closest('.share-dropdown')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [currentLogoSvg, setCurrentLogoSvg] = useState(`<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
    <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
    <path d="M5 15L5.5 17L7.5 17.5L5.5 18L5 20L4.5 18L2.5 17.5L4.5 17L5 15Z"/>
  </svg>`);

  const languages = [
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Mock search data
  const mockSearchData = [
    { type: 'user', name: 'Maria Hansen', location: 'København', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { type: 'user', name: 'Lars Nielsen', location: 'Aarhus', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { type: 'job', title: 'Hjemmerengøring København', location: 'København NV', budget: '350 kr' },
    { type: 'job', title: 'Kontorrengøring Aarhus', location: 'Aarhus C', budget: '600 kr' },
    { type: 'location', name: 'København', count: 24 },
    { type: 'location', name: 'Aarhus', count: 18 },
    { type: 'location', name: 'Odense', count: 12 }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = mockSearchData.filter(item => 
        (item.name || item.title || '').toLowerCase().includes(query.toLowerCase()) ||
        item.location?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleLogoSelect = (logoType: string, logoSvg: string) => {
    setCurrentLogoSvg(logoSvg);
    setShowLogoSelector(false);
    localStorage.setItem('selectedLogo', logoType);
    localStorage.setItem('selectedLogoSvg', logoSvg);
  };

  // Load saved logo on component mount
  React.useEffect(() => {
    const savedLogoSvg = localStorage.getItem('selectedLogoSvg');
    if (savedLogoSvg) {
      setCurrentLogoSvg(savedLogoSvg);
    }
  }, []);
  const quickActions = [
    { icon: Briefcase, label: t('createJob'), action: () => onPageChange?.('create-job') },
    { icon: Users, label: t('findExperts'), action: () => onPageChange?.('network') },
    { icon: MapPin, label: t('localJobs'), action: () => onPageChange?.('local') },
    { icon: Calendar, label: t('planning'), action: () => onPageChange?.('planning') }
  ];

  const navigationItems = [
    { icon: Home, label: t('home'), page: 'home', active: currentPage === 'home' },
    { icon: MapPin, label: 'Kort', page: 'map', active: currentPage === 'map' },
    { icon: Briefcase, label: t('jobs'), page: 'local', active: currentPage === 'local' },
    { icon: Users, label: t('network'), page: 'network', active: currentPage === 'network' },
    { icon: Calendar, label: t('planning'), page: 'planning', active: currentPage === 'planning' }
  ];

  return (
    <header className="bg-white shadow-soft border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Left side - Mobile menu + Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            {/* Mobile menu button */}
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 flex-shrink-0 hover:scale-110"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Logo and Brand */}
            <div className="flex items-center min-w-0 flex-1">
              <button
                onClick={() => setShowLogoSelector(true)}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-strong flex-shrink-0 hover:scale-110 transition-transform duration-200 group"
                title="Klik for at ændre logo"
              >
                <div 
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform duration-200"
                  dangerouslySetInnerHTML={{ __html: currentLogoSvg }}
                />
              </button>
              
              {/* Brand text - responsive */}
              <div className="ml-6 sm:ml-8 lg:ml-12 min-w-0 flex-1">
                {/* Desktop brand */}
                <div className="hidden lg:block">
                  <h1 className="text-3xl xl:text-4xl font-bold text-blue-600 leading-tight">
                    Privat Rengøring
                  </h1>
                  <p className="text-base text-gray-500 mt-2">Social platform for rengøring</p>
                </div>
                
                {/* Tablet brand */}
                <div className="hidden sm:block lg:hidden">
                  <h1 className="text-2xl font-bold text-blue-600 leading-tight">
                    Privat Rengøring
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">Social platform</p>
                </div>
                
                {/* Mobile brand */}
                <div className="sm:hidden">
                  <h1 className="text-xl font-bold text-blue-600 truncate leading-tight">
                    Privat Rengøring
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl mx-4 lg:mx-8 relative">
            <div className="relative w-full search-dropdown">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowSearchResults(true)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200 hover:shadow-medium"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-strong border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto animate-fadeIn">
                  {searchResults.map((result, index) => (
                    <div key={index} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-105">
                      {result.type === 'user' && (
                        <div className="flex items-center space-x-3">
                          <img src={result.avatar} alt={result.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="font-medium text-gray-900">{result.name}</p>
                            <p className="text-sm text-gray-500">{result.location}</p>
                          </div>
                        </div>
                      )}
                      {result.type === 'job' && (
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{result.title}</p>
                            <p className="text-sm text-gray-500">{result.location} • {result.budget}</p>
                          </div>
                        </div>
                      )}
                      {result.type === 'location' && (
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{result.name}</p>
                            <p className="text-sm text-gray-500">{result.count} aktive jobs</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Mobile Search Button */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            {/* Quick Actions Button */}
            <div className="relative hidden md:block">
              <button
                className="quick-actions-dropdown"
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                title="Hurtige handlinger"
              >
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              
              {showQuickActions && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-strong border border-gray-200 py-2 z-50 animate-fadeIn quick-actions-dropdown">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action.action();
                        setShowQuickActions(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                    >
                      <action.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 text-sm">{action.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <div className="relative language-dropdown">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="text-sm sm:text-base">{currentLanguage.flag}</span>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-strong border border-gray-200 py-2 z-50 animate-fadeIn language-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-all duration-200 hover:scale-105 ${
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
              <button 
                onClick={onShowMessages}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 relative transition-all duration-200 hover:scale-110"
                title={t('messages')}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 notification-badge text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <button 
                onClick={onShowNotifications}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 relative transition-all duration-200 hover:scale-110"
                title={t('notifications')}
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 notification-badge text-white text-xs rounded-full flex items-center justify-center">5</span>
              </button>
            
              {/* Pro Upgrade Button */}
              {!currentUser?.isSubscribed && (
              <button 
                onClick={onShowSubscription}
                className="btn-primary text-white px-2 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="hidden sm:inline">{t('upgradeToPro')}</span>
                <span className="sm:hidden">Pro</span>
              </button>
            )}
            
              {/* User Menu */}
            <div className="flex items-center relative ml-1 sm:ml-2 profile-dropdown">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center p-1 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                title={t('profile')}
              >
                <img
                  src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                  alt="Profile"
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-gray-200 hover:border-blue-300 transition-all duration-200"
                />
                {currentUser?.isSubscribed && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                    <Star className="w-2 h-2 text-white" />
                  </div>
                )}
              </button>
              
              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-strong border border-gray-200 py-2 z-50 animate-fadeIn profile-dropdown">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email}</p>
                    {currentUser?.isSubscribed && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 mt-1">
                        <Star className="w-3 h-3 mr-1" />
                        Pro Medlem
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      onShowProfile?.();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 text-sm">{t('viewProfile')}</span>
                  </button>
                  <button
                    onClick={() => {
                      onShowSettings?.();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-all duration-200 hover:scale-105"
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
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-all duration-200 text-red-600 hover:scale-105"
                  >
                    <span className="w-4 h-4 text-red-500">⏻</span>
                    <span className="text-sm">{t('logout')}</span>
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden pb-3 sm:pb-4 animate-slideUp">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm sm:text-base transition-all duration-200"
                autoFocus
              />
              <button
                onClick={() => setShowMobileSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:scale-110 transition-transform duration-200"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            {/* Mobile Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="mt-2 bg-white rounded-xl shadow-strong border border-gray-200 py-2 max-h-64 overflow-y-auto animate-fadeIn search-dropdown">
                {searchResults.slice(0, 5).map((result, index) => (
                  <div key={index} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-105">
                    {result.type === 'user' && (
                      <div className="flex items-center space-x-3">
                        <img src={result.avatar} alt={result.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{result.name}</p>
                          <p className="text-xs text-gray-500">{result.location}</p>
                        </div>
                      </div>
                    )}
                    {result.type === 'job' && (
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Briefcase className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{result.title}</p>
                          <p className="text-xs text-gray-500">{result.location} • {result.budget}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logo Selector Modal */}
      {showLogoSelector && (
        <LogoSelector
          onSelectLogo={handleLogoSelect}
          currentLogo={localStorage.getItem('selectedLogo') || 'sparkles'}
        />
      )}
    </header>
  );
}