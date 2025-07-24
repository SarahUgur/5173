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
  onShowSubscription
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

  // Mock search data
  const searchData = {
    posts: [
      { id: '1', type: 'post', title: 'Hjemmerengøring i København', content: 'Søger pålidelig rengøringshjælp...', location: 'København NV', user: 'Maria Hansen' },
      { id: '2', type: 'post', title: 'Kontorrengøring tilbud', content: 'Professionel kontorrengøring...', location: 'Aarhus C', user: 'Lars Nielsen' },
      { id: '3', type: 'job', title: 'Hovedrengøring villa', content: 'AKUT: Stor villa har brug for...', location: 'Odense', user: 'Sofie Andersen' }
    ],
    users: [
      { id: '1', type: 'user', name: 'Maria Hansen', location: 'København NV', userType: 'Privat kunde', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { id: '2', type: 'user', name: 'Lars Nielsen', location: 'Aarhus C', userType: 'Rengøringsekspert', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { id: '3', type: 'user', name: 'Sofie Andersen', location: 'Odense', userType: 'Lille virksomhed', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
    ],
    pages: [
      { id: '1', type: 'page', title: 'Hjælp & Support', description: 'Find svar på dine spørgsmål', page: 'support' },
      { id: '2', type: 'page', title: 'Om os', description: 'Læs om Privat Rengøring', page: 'about' },
      { id: '3', type: 'page', title: 'Kontakt & Klager', description: 'Kontakt vores support team', page: 'contact' },
      { id: '4', type: 'page', title: 'Lokale Jobs', description: 'Find rengøringsjobs i dit område', page: 'jobs' },
      { id: '5', type: 'page', title: 'Netværk', description: 'Byg dit professionelle netværk', page: 'network' },
      { id: '6', type: 'page', title: 'Mine Opgaver', description: 'Administrer dine rengøringsjobs', page: 'tasks' },
      { id: '7', type: 'page', title: 'Planlægning', description: 'Planlæg dine rengøringsaftaler', page: 'planning' },
      { id: '8', type: 'page', title: 'Jobs på Kort', description: 'Se jobs på interaktivt kort', page: 'map' }
    ]
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    
    if (query.trim().length < 2) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    const results: any[] = [];
    const searchQuery = query.toLowerCase();

    // Search posts
    searchData.posts.forEach(post => {
      if (post.title.toLowerCase().includes(searchQuery) || 
          post.content.toLowerCase().includes(searchQuery) ||
          post.location.toLowerCase().includes(searchQuery) ||
          post.user.toLowerCase().includes(searchQuery)) {
        results.push(post);
      }
    });

    // Search users
    searchData.users.forEach(user => {
      if (user.name.toLowerCase().includes(searchQuery) ||
          user.location.toLowerCase().includes(searchQuery) ||
          user.userType.toLowerCase().includes(searchQuery)) {
        results.push(user);
      }
    });

    // Search pages
    searchData.pages.forEach(page => {
      if (page.title.toLowerCase().includes(searchQuery) ||
          page.description.toLowerCase().includes(searchQuery)) {
        results.push(page);
      }
    });

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
          <div className="flex items-center space-x-3 sm:space-x-4">
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
              className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
                  <path d="M5 15L5.5 17L7.5 17.5L5.5 18L5 20L4.5 18L2.5 17.5L4.5 17L5 15Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Privat Rengøring
                </h1>
                <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Social platform</p>
              </div>
            </button>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchTerm.length >= 2 && setShowSearchResults(true)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                className="flex items-center space-x-1 sm:space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {currentLanguage?.flag} {currentLanguage?.name}
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
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications */}
            <button
              onClick={onShowNotifications}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <img
                  src={currentUser?.avatar || "/api/placeholder/32/32"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-transparent hover:border-blue-300 transition-all duration-200"
                />
                {currentUser?.isSubscribed && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
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
                      onShowSettings();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{t('settings')}</span>
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

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchTerm.length >= 2 && setShowSearchResults(true)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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

          {/* Mobile Search Results */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {searchResults.length} resultater
                </p>
              </div>
              <div className="py-2">
                {searchResults.map((result, index) => (
                  <button
                    key={`mobile-${result.type}-${result.id}-${index}`}
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
                        <p className="font-medium text-gray-900 truncate text-sm">
                          {result.name || result.title}
                        </p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {getResultLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {result.type === 'user' ? (
                          `${result.location} • ${result.userType}`
                        ) : result.type === 'page' ? (
                          result.description
                        ) : (
                          `${result.location} • ${result.content?.substring(0, 30)}...`
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
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