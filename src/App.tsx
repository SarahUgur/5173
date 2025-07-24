import React, { useState } from 'react';
import { Home, Briefcase, Users, Calendar, Heart, MapPin, Search, Bell, MessageCircle, User as UserIcon, Menu, Plus, Settings, LogOut, Star, Crown, Shield, TrendingUp, Filter, Globe, HelpCircle, Phone, Mail, ExternalLink, Eye, EyeOff, Trash2, Edit, X, Clock, DollarSign, Lock, MoreHorizontal, Flag, AlertTriangle, Ban, ThumbsUp, Smile, Share2 } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import { getLocalizedPosts } from './data/mockData';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
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
import { useNotifications } from './hooks/useNotifications';
import { notificationManager } from './lib/notifications';
import type { User } from './types';

function App() {
  const { language, t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const notifications = useNotifications(currentUser);
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoSelector, setShowLogoSelector] = useState(false);
  const [currentLogo, setCurrentLogo] = useState('default');

  // Check if running as PWA
  React.useEffect(() => {
    const checkPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = (window.navigator as any).standalone === true;
      setIsPWA(isStandalone || isInWebAppiOS);
    };
    
    checkPWA();
    
    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkPWA);
    
    return () => mediaQuery.removeEventListener('change', checkPWA);
  }, []);

  // Handle Pro upgrade from header
  const handleShowSubscription = () => {
    setShowSubscription(true);
  };

  const posts = getLocalizedPosts(language);

  // Handle login
  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };


  // Handle logout
  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('authToken');
    
    // Reset state
    setCurrentUser(null);
    setCurrentPage('home');
  };

  // Handle subscription
  const handleSubscribe = () => {
    setShowSubscription(false);
    // Simuler Stripe checkout for månedligt abonnement
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
      
      // Trigger Pro upgrade notification
      setTimeout(() => {
        notifications.triggerMessageNotification(
          'Privat Rengøring',
          'Tillykke! Du er nu Pro medlem med fuld adgang til alle funktioner! 🌟'
        );
      }, 1000);
    }
  };
  
  // Listen for Pro upgrade events from header
  React.useEffect(() => {
    const handleShowSubscription = () => {
      setShowSubscription(true);
    };
    
    window.addEventListener('showSubscription', handleShowSubscription);
    return () => window.removeEventListener('showSubscription', handleShowSubscription);
  }, []);

  // Handle success continue
  const handleSuccessContinue = () => {
    setShowSuccess(false);
  };

  // Handle user profile update
  const handleUpdateUser = (updates: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  // Handle friend requests
  const handleSendFriendRequest = (userId: string) => {
    // Send real friend request
    fetch('/api/friend-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ userId })
    }).then(response => {
      if (response.ok) {
        alert('Venskabsanmodning sendt!');
      } else {
        alert('Kunne ikke sende venskabsanmodning. Prøv igen.');
      }
    }).catch(error => {
      console.error('Friend request error:', error);
      alert('Kunne ikke sende venskabsanmodning. Prøv igen.');
    });
  };

  const handleAcceptFriendRequest = (requestId: string) => {
    // Accept friend request
    fetch(`/api/friend-requests/${requestId}/accept`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(response => {
      if (response.ok) {
        alert('Venskabsanmodning accepteret!');
      } else {
        alert('Kunne ikke acceptere anmodning. Prøv igen.');
      }
    }).catch(error => {
      console.error('Accept friend request error:', error);
      alert('Kunne ikke acceptere anmodning. Prøv igen.');
    });
  };

  const handleDeclineFriendRequest = (requestId: string) => {
    // Decline friend request
    fetch(`/api/friend-requests/${requestId}/decline`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(response => {
      if (response.ok) {
        alert('Venskabsanmodning afvist.');
      } else {
        alert('Kunne ikke afvise anmodning. Prøv igen.');
      }
    }).catch(error => {
      console.error('Decline friend request error:', error);
      alert('Kunne ikke afvise anmodning. Prøv igen.');
    });
  };

  const handleSendMessage = (userId: string) => {
    setShowMessages(true);
    // In real app, this would open messages modal with specific user selected
  };

  const handleBlockUser = (userId: string) => {
    // Block user
    fetch('/api/users/block', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ userId })
    }).then(response => {
      if (response.ok) {
        alert('Bruger blokeret succesfuldt.');
      } else {
        alert('Kunne ikke blokere bruger. Prøv igen.');
      }
    }).catch(error => {
      console.error('Block user error:', error);
      alert('Kunne ikke blokere bruger. Prøv igen.');
    });
  };

  const handleReportUser = (userId: string, reason: string) => {
    // Report user
    fetch('/api/reports/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ userId, reason })
    }).then(response => {
      if (response.ok) {
        alert('Bruger rapporteret. Admin teamet vil gennemgå rapporten.');
      } else {
        alert('Kunne ikke rapportere bruger. Prøv igen.');
      }
    }).catch(error => {
      console.error('Report user error:', error);
      alert('Kunne ikke rapportere bruger. Prøv igen.');
    });
  };

  const handleReport = (postId: string, reason: string) => {
    // Report post
    fetch('/api/reports/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ postId, reason })
    }).then(response => {
      if (response.ok) {
        alert('Opslag rapporteret. Admin teamet vil gennemgå rapporten.');
      } else {
        alert('Kunne ikke rapportere opslag. Prøv igen.');
      }
    }).catch(error => {
      console.error('Report post error:', error);
      alert('Kunne ikke rapportere opslag. Prøv igen.');
    });
  };

  const handleTagUser = (userId: string, postId: string) => {
    // Tag user in post
    fetch('/api/posts/tag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ userId, postId })
    }).then(response => {
      if (response.ok) {
        console.log('User tagged successfully');
      }
    }).catch(error => {
      console.error('Tag user error:', error);
    });
  };

  const handleSharePost = (postId: string, platform: string) => {
    // Track post share
    fetch('/api/posts/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ postId, platform })
    }).then(response => {
      if (response.ok) {
        console.log('Post share tracked');
      }
    }).catch(error => {
      console.error('Share tracking error:', error);
    });
  };

  const handleDeletePost = (postId: string) => {
    // Delete post from API
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(response => {
      if (response.ok) {
        alert('Opslag slettet permanent.');
        // Refresh page to remove post
        window.location.reload();
      } else {
        alert('Kunne ikke slette opslag. Prøv igen.');
      }
    }).catch(error => {
      console.error('Delete post error:', error);
      alert('Kunne ikke slette opslag. Prøv igen.');
    });
  };

  const handleHidePost = (postId: string) => {
    // Hide post from API
    fetch(`/api/posts/${postId}/hide`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(response => {
      if (response.ok) {
        alert('Opslag skjult. Du kan vise det igen i dine indstillinger.');
        // Refresh page to hide post
        window.location.reload();
      } else {
        alert('Kunne ikke skjule opslag. Prøv igen.');
      }
    }).catch(error => {
      console.error('Hide post error:', error);
      alert('Kunne ikke skjule opslag. Prøv igen.');
    });
  };

  const handleSelectLogo = (logoType: string, logoSvg: string) => {
    setCurrentLogo(logoType);
    setShowLogoSelector(false);
  };

  const handleDeleteComment = (commentId: string, postId: string) => {
    // Delete comment from API
    fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(response => {
      if (response.ok) {
        alert('Kommentar slettet permanent.');
        // Refresh page to remove comment
        window.location.reload();
      } else {
        alert('Kunne ikke slette kommentar. Prøv igen.');
      }
    }).catch(error => {
      console.error('Delete comment error:', error);
      alert('Kunne ikke slette kommentar. Prøv igen.');
    });
  };

  const handleHideComment = (commentId: string, postId: string) => {
    // Hide comment from API
    fetch(`/api/comments/${commentId}/hide`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(response => {
      if (response.ok) {
        console.log('Kommentar skjult');
      } else {
        alert('Kunne ikke skjule kommentar. Prøv igen.');
      }
    }).catch(error => {
      console.error('Hide comment error:', error);
      alert('Kunne ikke skjule kommentar. Prøv igen.');
    });
  };
  // Show auth screen if not logged in
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Show success page if payment was successful
  if (showSuccess) {
    return <SuccessPage onContinue={handleSuccessContinue} />;
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
        return currentUser.email === 'admin@privatrengoring.dk' ? <AdminPage /> : renderHomePage();
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
      
      {/* Ad Banner */}
      <div className="mb-3 xs:mb-4 sm:mb-6">
        <AdBanner type="banner" position="top" className="w-full" />
      </div>

      <div className="space-y-3 xs:space-y-4 sm:space-y-6">
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            <PostCard
              post={post}
              currentUser={currentUser}
              onShowSubscription={() => setShowSubscription(true)}
              onReport={handleReport}
              onShowUserProfile={setShowUserProfile}
              onTagUser={handleTagUser}
              onSharePost={handleSharePost}
              onDeletePost={handleDeletePost}
              onHidePost={handleHidePost}
              onDeleteComment={handleDeleteComment}
              onHideComment={handleHideComment}
            />
            
            {/* Ad between posts */}
            {index === 1 && (
              <AdBanner type="native" position="middle" className="w-full" />
            )}
            {index === 3 && (
              <AdBanner type="video" position="middle" className="w-full" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Recommendation Widget */}
      <div className="mt-6 sm:mt-8">
        <RecommendationWidget />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${isPWA ? 'pwa-mode' : ''}`}>
      {/* PWA Status Bar */}
      {isPWA && (
        <div className="bg-blue-600 text-white text-center py-1 text-xs">
          📱 Kører som app • Privat Rengøring
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
            {/* Mobile header */}
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

            {/* Navigation */}
            <nav className="flex-1 px-3 xs:px-4 py-4 xs:py-6 space-y-1.5 xs:space-y-2 overflow-y-auto">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-2.5 xs:space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-colors duration-200 text-sm xs:text-base ${
                  currentPage === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
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
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'jobs' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">{t('localJobs')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('map');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'map' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Jobs på Kort</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('network');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'network' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">{t('network')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('tasks');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'tasks' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">{t('myTasks')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('planning');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'planning' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{t('planning')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('favorites');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'favorites' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">{t('favorites')}</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('trending');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'trending' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">{t('trending')}</span>
              </button>

              {/* Admin link */}
              {currentUser.email === 'admin@privatrengoring.dk' && (
                <>
                <button
                  onClick={() => {
                    setCurrentPage('admin');
                    setShowSidebar(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    currentPage === 'admin' ? 'bg-red-100 text-red-700' : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Admin Panel</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowLogoSelector(true);
                    setShowSidebar(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 text-purple-600 hover:bg-purple-50"
                >
                  <Star className="w-5 h-5" />
                  <span className="font-medium">Skift Logo</span>
                </button>
                </>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Info Pages */}
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'about' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Om os</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('support');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'support' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Hjælp & Support</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('contact');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'contact' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Kontakt & Klager</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('terms');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'terms' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Vilkår & Betingelser</span>
              </button>
            </nav>

            {/* Pro Upgrade */}
          </div>
        </div>

        {/* Overlay for mobile */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="py-6 px-3 sm:px-6 lg:px-8">
            {renderMainContent()}
          </main>
        </div>
      </div>

      {/* Modals */}
      {showUserProfile && (
        <UserProfileModal
          isOpen={!!showUserProfile}
          onClose={() => setShowUserProfile(null)}
          user={showUserProfile}
          currentUser={currentUser}
          onSendFriendRequest={handleSendFriendRequest}
          onAcceptFriendRequest={handleAcceptFriendRequest}
          onSendMessage={handleSendMessage}
          onBlockUser={handleBlockUser}
          onReportUser={handleReportUser}
        />
      )}

      <MessagesModal
        isOpen={showMessages}
        onClose={() => setShowMessages(false)}
        currentUser={currentUser}
        onShowSubscription={() => setShowSubscription(true)}
      />

      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        currentUser={currentUser}
      />

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

      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      <TermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={() => setShowTerms(false)}
      />

      <FriendRequestModal
        isOpen={showFriendRequests}
        onClose={() => setShowFriendRequests(false)}
        onAcceptRequest={handleAcceptFriendRequest}
        onDeclineRequest={handleDeclineFriendRequest}
        onSendRequest={handleSendFriendRequest}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onShowSubscription={() => setShowSubscription(true)}
      />

      {/* Logo Selector for Admin */}
      {showLogoSelector && (
        <LogoSelector
          onSelectLogo={handleSelectLogo}
          currentLogo={currentLogo}
        />
      )}

      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
}

export default App;