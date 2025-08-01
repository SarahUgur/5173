import React, { useState } from 'react';
import { Search, MessageCircle, Bell, User, Menu, Globe, Star, Settings, LogOut, HelpCircle, X, MapPin, Briefcase, Users, FileText } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface HeaderProps {
  currentUser: any;
  onShowMessages: () => void;
  onShowNotifications: () => void;
  onShowProfile: () => void;
  onToggleSidebar: () => void;
  onLogout: () => void;
  onShowSettings: () => void;
  onShowHelp: () => void;
  setCurrentPage: (page: string) => void;
}

export default function Header({ 
  currentUser, 
  onShowMessages, 
  onShowNotifications, 
  onShowProfile, 
  onToggleSidebar,
  onLogout,
  onShowSettings,
  onShowHelp,
  setCurrentPage,
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const languages = [
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  // Real search - will search API
  const performSearch = async (query: string) => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.results || [];
      }
    } catch (error) {
      console.error('Search error:', error);
    }
    
    // Fallback to static pages if API search fails
    const staticPages = [
      { id: '1', type: 'page', title: 'Hjælp & Support', description: 'Find svar på dine spørgsmål', page: 'support' },
      { id: '2', type: 'page', title: 'Om os', description: 'Læs om Privat Rengøring', page: 'about' },
      { id: '3', type: 'page', title: 'Kontakt & Klager', description: 'Kontakt vores support team', page: 'contact' },
      { id: '4', type: 'page', title: 'Lokale Jobs', description: 'Find rengøringsjobs i dit område', page: 'jobs' },
      { id: '5', type: 'page', title: 'Netværk', description: 'Byg dit professionelle netværk', page: 'network' },
      { id: '6', type: 'page', title: 'Mine Opgaver', description: 'Administrer dine rengøringsjobs', page: 'tasks' },
      { id: '7', type: 'page', title: 'Planlægning', description: 'Planlæg dine rengøringsaftaler', page: 'planning' },
      { id: '8', type: 'page', title: 'Jobs på Kort', description: 'Se jobs på interaktivt kort', page: 'map' }
    ];
    
    return staticPages.filter(page => 
      page.title.toLowerCase().includes(query.toLowerCase()) ||
      page.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    
    if (query.trim().length < 2) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    // Perform real search
    const results = await performSearch(query);

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const handleResultClick = (result: any) => {
    setShowSearchResults(false);
    setSearchTerm('');
    
    if (result.type === 'page') {
      setCurrentPage(result.page);
    } else if (result.type === 'user') {
      // Navigate to user profile or show user modal
      console.log('Navigate to user:', result.name);
    } else if (result.type === 'post' || result.type === 'job') {
      // Navigate to post or show post details
      console.log('Navigate to post:', result.title);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'post': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'job': return <Briefcase className="w-4 h-4 text-green-600" />;
      case 'user': return <Users className="w-4 h-4 text-purple-600" />;
      case 'page': return <Search className="w-4 h-4 text-orange-600" />;
      default: return <Search className="w-4 h-4 text-gray-600" />;
    }
  };

  const getResultLabel = (type: string) => {
    switch (type) {
      case 'post': return 'Opslag';
      case 'job': return 'Job';
      case 'user': return 'Person';
      case 'page': return 'Side';
      default: return '';
    }
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Left side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Logo */}
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
                  <path d="M5 15L5.5 17L7.5 17.5L5.5 18L5 20L4.5 18L2.5 17.5L4.5 17L5 15Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent leading-tight">
                  PRIVATE RENGØRING
                </h1>
                <p className="text-xs text-gray-500 -mt-0.5 hidden lg:block leading-none">Social platform</p>
              </div>
            </button>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-xs lg:max-w-md mx-3 sm:mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchTerm.length >= 2 && setShowSearchResults(true)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShowSearchResults(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                <div className="p-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {searchResults.length} resultater for "{searchTerm}"
                  </p>
                </div>
                <div className="py-2">
                  {searchResults.map((result, index) => (
                    <button
                      key={`${result.type}-${result.id}-${index}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-left"
                    >
                      <div className="flex-shrink-0">
                        {result.type === 'user' ? (
                          <img
                            src={result.avatar}
                            alt={result.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            {getResultIcon(result.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900 truncate">
                            {result.name || result.title}
                          </p>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {getResultLabel(result.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {result.type === 'user' ? (
                            <>
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {result.location} • {result.userType}
                            </>
                          ) : result.type === 'page' ? (
                            result.description
                          ) : (
                            <>
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {result.location} • {result.content?.substring(0, 50)}...
                            </>
                          )}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                {searchResults.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>Ingen resultater fundet for "{searchTerm}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                  {currentLanguage?.flag} {currentLanguage?.name}
                </span>
                <span className="text-sm hidden md:inline lg:hidden">
                  {currentLanguage?.flag}
                </span>
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
                        language === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pro Upgrade Button */}
            
            {/* Messages */}
            <button
              onClick={onShowMessages}
              className="relative p-1.5 xs:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
              <span className="absolute -top-0.5 xs:-top-1 -right-0.5 xs:-right-1 w-3.5 h-3.5 xs:w-4 xs:h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications */}
            <button
              onClick={onShowNotifications}
              className="relative p-1.5 xs:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
              <span className="absolute -top-0.5 xs:-top-1 -right-0.5 xs:-right-1 w-3.5 h-3.5 xs:w-4 xs:h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-1 xs:space-x-2 p-0.5 xs:p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <img
                  src={currentUser?.avatar || "/api/placeholder/32/32"}
                  alt="Profile"
                  className="w-7 h-7 xs:w-8 xs:h-8 rounded-full border-2 border-transparent hover:border-blue-300 transition-all duration-200"
                />
                {currentUser?.isSubscribed && (
                  <div className="absolute -bottom-0.5 xs:-bottom-1 -right-0.5 xs:-right-1 w-3 h-3 xs:w-4 xs:h-4 bg-purple-600 rounded-full flex items-center justify-center">
                    <Star className="w-2 h-2 xs:w-3 xs:h-3 text-white" />
                  </div>
                )}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{currentUser?.name}</p>
                    <p className="text-sm text-gray-500">{currentUser?.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setCurrentPage('profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{t('profile')}</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onShowHelp();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Hjælp</span>
                  </button>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={() => {
                      onLogout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Dropdown Overlays */}
      {(showLanguageMenu || showProfileMenu || showSearchResults) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowLanguageMenu(false);
            setShowProfileMenu(false);
            setShowSearchResults(false);
          }}
        />
      )}
    </header>
  );
}