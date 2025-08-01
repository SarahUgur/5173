import React, { useState } from 'react';
import { Home, Briefcase, Users, Calendar, Heart, MapPin, Search, Bell, MessageCircle, User as UserIcon, Menu, Plus, Settings, LogOut, Star, Crown, Shield, TrendingUp, Filter, Globe, HelpCircle, Phone, Mail, ExternalLink, Eye, EyeOff, Trash2, Edit, X, Clock, DollarSign, Lock, MoreHorizontal, Flag, AlertTriangle, Ban, ThumbsUp, Smile, Share2, CheckCircle } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import LocalJobsPage from './components/LocalJobsPage';
import NetworkPage from './components/NetworkPage';
import MyTasksPage from './components/MyTasksPage';
import PlanningPage from './components/PlanningPage';
import MapPage from './components/MapPage';
import UserProfilePage from './components/UserProfilePage';
import UserProfileModal from './components/UserProfileModal';
import MessagesModal from './components/MessagesModal';
import NotificationModal from './components/NotificationModal';
import SubscriptionModal from './components/SubscriptionModal';
import PaymentModal from './components/PaymentModal';
import SuccessPage from './components/SuccessPage';
import AuthScreen from './components/AuthScreen';
import AdminPage from './components/AdminPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import SupportPage from './components/SupportPage';
import TermsPage from './components/TermsPage';
import HelpModal from './components/HelpModal';
import TermsModal from './components/TermsModal';
import FriendRequestModal from './components/FriendRequestModal';
import SettingsModal from './components/SettingsModal';
import InstallPrompt from './components/InstallPrompt';
import AdBanner from './components/AdBanner';
import RecommendationWidget from './components/RecommendationWidget';
import type { User } from './types';

function App() {
  const { language, t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = (window.navigator as any).standalone === true;
      setIsPWA(isStandalone || isInWebAppiOS);
    };
    
    checkPWA();
    
    // Load persisted user data on app start
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser && !currentUser) {
      try {
        const userData = JSON.parse(savedUser);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    
    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkPWA);
    
    return () => mediaQuery.removeEventListener('change', checkPWA);
  }, [currentUser]);

  // Handle login
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData');
    setCurrentUser(null);
    setCurrentPage('home');
  };

  // Handle subscription
  const handleSubscribe = () => {
    setShowSubscription(false);
    if (confirm('Start Pro abonnement for 29 kr/måned via Stripe? Du vil blive omdirigeret til sikker betaling.')) {
      setShowPayment(true);
    }
  };

  // Handle payment success
  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowSuccess(true);
    if (currentUser) {
      setCurrentUser({ ...currentUser, isSubscribed: true });
    }
  };

  // Handle user profile update
  const handleUpdateUser = (updates: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  // Show auth screen if not logged in
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Check if user needs Pro subscription (3-month requirement)
  const needsProSubscription = !currentUser.isSubscribed;
  
  // Show Pro lock modal for non-Pro users
  if (needsProSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">PRIVATE RENGORING Pro</h1>
          
          <p className="text-gray-600 mb-6">
            PRIVATE RENGORING er nu kun tilgængelig for Pro medlemmer i de første 3 måneder efter lanceringen.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-900">Kun 29 kr/måned</span>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-sm text-gray-600">Få adgang til alle funktioner og byg dit rengøringsnetværk</p>
          </div>

          <div className="space-y-3 mb-6 text-left">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Ubegrænset job ansøgninger</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Direkte beskeder til alle brugere</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Prioriteret visning af opslag</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Verificeret profil badge</span>
            </div>
          </div>

          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 mb-4"
          >
            <Crown className="w-5 h-5" />
            <span>Få Pro Adgang Nu</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-gray-600 hover:text-gray-800 text-sm"
          >
            Log ud og prøv igen senere
          </button>

          {/* Payment Modal */}
          <PaymentModal
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            onSuccess={handlePaymentSuccess}
            userEmail={currentUser.email}
          />
        </div>
      </div>
    );
  }

  // Show success page if payment was successful
  if (showSuccess) {
    return <SuccessPage onContinue={() => setShowSuccess(false)} />;
  }

  const renderMainContent = () => {
    switch (currentPage) {
      case 'jobs':
        return <LocalJobsPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'network':
        return <NetworkPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'tasks':
        return <MyTasksPage currentUser={currentUser} />;
      case 'planning':
        return <PlanningPage currentUser={currentUser} />;
      case 'local-jobs':
        return <LocalJobsPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'map':
        return <MapPage currentUser={currentUser} />;
      case 'profile':
        return (
          <UserProfilePage 
            currentUser={currentUser} 
            onUpdateUser={handleUpdateUser}
            onShowSettings={() => setShowSettings(true)}
            onShowSubscription={() => setShowSubscription(true)}
          />
        );
      case 'admin':
        return currentUser.email === 'admin@privaterengoring.dk' ? <AdminPage /> : renderHomePage();
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'support':
        return <SupportPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <div className="max-w-2xl mx-auto px-1 xs:px-0">
      <CreatePost 
        currentUser={currentUser} 
        onShowSubscription={() => setShowSubscription(true)}
      />
      
      <div className="mb-3 xs:mb-4 sm:mb-6">
        <AdBanner type="banner" position="top" className="w-full" />
      </div>

      <PostFeed 
        currentUser={currentUser}
        onShowSubscription={() => setShowSubscription(true)}
      />

      <div className="mt-6 sm:mt-8">
        <RecommendationWidget />
      </div>
    </div>
  );

  // Post Feed Component
  const PostFeed = ({ currentUser, onShowSubscription }: any) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
      // Simulate loading posts
      setTimeout(() => {
        const mockPosts = [
          {
            id: '1',
            user: {
              id: '1',
              name: 'Maria Hansen',
              avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
              verified: true,
              userType: 'private'
            },
            content: 'Søger pålidelig rengøringshjælp til mit hjem i København. Har brug for hjælp hver 14. dag, ca. 3 timer ad gangen. Jeg har 2 børn og en hund, så erfaring med familier er et plus! 🏠✨',
            location: 'København NV',
            budget: '300-400 kr',
            createdAt: '2 timer siden',
            likes: 12,
            comments: [
              {
                id: '1',
                content: 'Hej Maria! Jeg har 5 års erfaring med familierengøring og elsker at arbejde med familier der har kæledyr.',
                createdAt: '1 time siden',
                user: {
                  id: '2',
                  name: 'Lars Nielsen',
                  avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
                  verified: true
                }
              }
            ],
            isJobPost: true,
            jobType: 'home_cleaning',
            urgency: 'flexible'
          }
        ];
        setPosts(mockPosts);
        setLoading(false);
      }, 1000);
    }, []);

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
            onShowSubscription={onShowSubscription}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isPWA ? 'pwa-mode' : ''}`}>
      {isPWA && (
        <div className="bg-blue-600 text-white text-center py-1 text-xs">
          📱 Kører som app • PRIVATE RENGORING
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

              {currentUser.email === 'admin@privaterengoring.dk' && (
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

                <button
                  onClick={() => {
                    setCurrentPage('support');
                    setShowSidebar(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                    currentPage === 'support' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span className="font-medium">Hjælp & Support</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    setShowSidebar(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                    currentPage === 'contact' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Mail className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span className="font-medium">Kontakt & Klager</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('terms');
                    setShowSidebar(false);
                  }}
                  className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                    currentPage === 'terms' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Shield className="w-4 h-4 xs:w-5 xs:h-5" />
                  <span className="font-medium">Vilkår & Betingelser</span>
                </button>
              </div>
            </nav>

            {!currentUser?.isSubscribed && (
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowSubscription(true);
                    setShowSidebar(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Crown className="w-5 h-5" />
                  <span>Opgrader til Pro</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div className="flex-1 lg:ml-0">
          <main className="py-6 px-3 sm:px-6 lg:px-8">
            {renderMainContent()}
          </main>
        </div>
      </div>

      {/* Modals */}
      <SubscriptionModal
        isOpen={showSubscription}
        onClose={() => setShowSubscription(false)}
        onSubscribe={handleSubscribe}
        userEmail={currentUser.email}
      />

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        userEmail={currentUser.email}
      />

      <MessagesModal
        isOpen={showMessages}
        onClose={() => setShowMessages(false)}
        currentUser={currentUser}
      />

      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        currentUser={currentUser}
      />

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