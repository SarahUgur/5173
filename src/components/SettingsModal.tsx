import React, { useState } from 'react';
import { Home, Briefcase, Users, Calendar, Heart, MapPin, Search, Bell, MessageCircle, User as UserIcon, Menu, Plus, Settings, LogOut, Star, Crown, Shield, TrendingUp, Filter, Globe, HelpCircle, Phone, Mail, ExternalLink, Eye, EyeOff, Trash2, Edit, X, Clock, DollarSign, Lock, MoreHorizontal, Flag, AlertTriangle, Ban, ThumbsUp, Smile, Share2, CheckCircle } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import Header from './components/Header';
import { X, User, Bell, Shield, Globe, Eye, EyeOff, Save } from 'lucide-react';
import RecommendationWidget from './components/RecommendationWidget';
import type { User } from './types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

function App() {
  const { language, t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPWA, setIsPWA] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'jobs' | 'network' | 'tasks' | 'planning' | 'favorites' | 'local-jobs' | 'trending' | 'map' | 'profile' | 'admin' | 'about' | 'contact' | 'support' | 'terms'>('home');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState<any>(null);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProLockModal, setShowProLockModal] = useState(false);
  
  // Check if running as PWA
  React.useEffect(() => {
    const checkPWA = () => {
      setIsLoading(true);
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = (window.navigator as any).standalone === true;
      setIsPWA(isStandalone || isInWebAppiOS);
    };
    
    checkPWA();
    
    // Load persisted user data on app start
    const authToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');
    if (authToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
      }
    }
    
    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkPWA);
    
    // Quick loading check
    setIsLoading(false);
    
    return () => mediaQuery.removeEventListener('change', checkPWA);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
    }
  };

  function SettingsModal({ isOpen, onClose, currentUser, onUpdateUser }: SettingsModalProps) {
    const [formData, setFormData] = useState({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      location: currentUser.location || '',
      bio: currentUser.bio || '',
      notifications: currentUser.notifications !== false,
      privacy: currentUser.privacy || 'public'
    });

    const handleSave = () => {
      try {
        // Update local state immediately
        const updatedUser = { ...currentUser, ...formData };
        onUpdateUser(updatedUser);
        
        // Save to localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        
        alert('Profil opdateret succesfuldt! 💾');
        onClose();
        
        // Try to save to API (optional)
        fetch('/api/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(formData)
        }).then(response => {
          if (!response.ok) {
            console.warn('API save failed, but local state updated');
          } else {
            console.log('Profile saved to server successfully');
          }
        }).catch(error => {
          console.error('Error saving profile:', error);
          console.log('Profile saved locally even though server failed');
        });
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Fejl ved opdatering af profil. Prøv igen.');
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Indstillinger</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Profile Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profil Oplysninger
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Navn</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokation</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifikationer
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Modtag notifikationer</span>
                <button
                  onClick={() => setFormData({ ...formData, notifications: !formData.notifications })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.notifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privatliv
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profil synlighed</label>
                <select
                  value={formData.privacy}
                  onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">Offentlig</option>
                  <option value="friends">Kun venner</option>
                  <option value="private">Privat</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Gem Ændringer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const PostCard = ({ post, currentUser }: any) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{post.author}</h3>
            <p className="text-sm text-gray-500">{post.time}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Kommentar</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Del</span>
          </button>
        </div>
      </div>
    );
  };

  const HomePage = () => {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Velkommen til Private Rengøring</h2>
          <p className="text-gray-600">Find lokale rengøringsjobs og byg dit netværk.</p>
        </div>

        <div className="mt-6 sm:mt-8">
          <RecommendationWidget />
        </div>
      </div>
    );
  };

  // Post Feed Component
  const PostFeed = ({ currentUser }: any) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    React.useEffect(() => {
      // Load real posts from API
      setTimeout(() => {
        // Load real posts from API
        loadRealPosts();
        setLoading(false);
      }, 1000);
    }, []);

    const loadRealPosts = async () => {
      try {
        const response = await fetch('/api/posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([]);
      }
      setLoading(false);
    };
    
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Indlæser opslag...</p>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen opslag endnu</h3>
          <p className="text-gray-600 mb-4">Vær den første til at dele et opslag!</p>
        </div>
      );
    }

    return (
      <div className="space-y-3 xs:space-y-4 sm:space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
          />
        ))}
      </div>
    );
  };

  const InstallPrompt = () => {
    return null;
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isPWA ? 'pwa-mode' : ''}`}>
      {isPWA && (
        <div className="bg-blue-600 text-white text-center py-1 text-xs">
          📱 Kører som app • PRIVATE RENGØRING
        </div>
      )}
      
      <Header
        currentUser={currentUser}
        onShowMessages={() => setShowMessages(true)}
        onShowNotifications={() => setShowNotifications(true)}
        onShowProfile={() => setCurrentPage('profile')}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        onLogout={handleLogout}
        onShowSettings={() => setShowSettings(true)}
        onShowHelp={() => setShowHelp(true)}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 w-56 xs:w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-14 xs:pt-16 lg:pt-0">
            <div className="lg:hidden p-3 xs:p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base xs:text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-1.5 xs:p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-4 h-4 xs:w-5 xs:h-5" />
                </button>
              </div>
            </div>

            <nav className="flex-1 px-3 xs:px-4 py-4 xs:py-6 space-y-1.5 xs:space-y-2 overflow-y-auto">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                  currentPage === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="font-medium">{t('home')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('jobs');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                  currentPage === 'jobs' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="font-medium">{t('localJobs')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('network');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                  currentPage === 'network' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="font-medium">{t('network')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('tasks');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                  currentPage === 'tasks' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="font-medium">{t('myTasks')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('planning');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                  currentPage === 'planning' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="font-medium">{t('planning')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('map');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                  currentPage === 'map' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin className="w-4 h-4 xs:w-5 xs:h-5" />
                <span className="font-medium">Jobs på Kort</span>
              </button>

              {currentUser && currentUser.email === 'admin@privaterengoring.dk' && (
                <button
                  onClick={() => {
                    setCurrentPage('admin');
                    setShowSidebar(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                    currentPage === 'admin' ? 'bg-red-100 text-red-700' : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Shield className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span className="font-medium">Admin Panel</span>
                </button>
              )}

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    setShowSidebar(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                    currentPage === 'about' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span className="font-medium">Om os</span>
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {currentPage === 'home' && <HomePage />}
          {/* Add other page components here */}
        </div>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
      />

      <InstallPrompt />
    </div>
  );
}

export default App;