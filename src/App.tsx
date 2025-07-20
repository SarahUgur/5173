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
import type { User } from './types';

function App() {
  const { language, t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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

  const posts = getLocalizedPosts(language);

  // Handle login
  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  // Handle subscription
  const handleSubscribe = () => {
    setShowSubscription(false);
    setShowPayment(true);
  };

  // Handle payment success
  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowSuccess(true);
    if (currentUser) {
      setCurrentUser({ ...currentUser, isSubscribed: true });
    }
  };

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
    console.log('Sending friend request to:', userId);
  };

  const handleAcceptFriendRequest = (requestId: string) => {
    console.log('Accepting friend request:', requestId);
  };

  const handleDeclineFriendRequest = (requestId: string) => {
    console.log('Declining friend request:', requestId);
  };

  const handleSendMessage = (userId: string) => {
    console.log('Opening message to:', userId);
    setShowMessages(true);
  };

  const handleBlockUser = (userId: string) => {
    console.log('Blocking user:', userId);
  };

  const handleReportUser = (userId: string, reason: string) => {
    console.log('Reporting user:', userId, 'Reason:', reason);
  };

  const handleReport = (postId: string, reason: string) => {
    console.log('Reporting post:', postId, 'Reason:', reason);
  };

  const handleTagUser = (userId: string, postId: string) => {
    console.log('Tagging user:', userId, 'in post:', postId);
  };

  const handleSharePost = (postId: string, platform: string) => {
    console.log('Sharing post:', postId, 'on:', platform);
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
        return <LocalJobsPage currentUser={currentUser} />;
      case 'network':
        return <NetworkPage />;
      case 'tasks':
        return <MyTasksPage currentUser={currentUser} />;
      case 'planning':
        return <PlanningPage currentUser={currentUser} />;
      case 'local-jobs':
        return <LocalJobsPage currentUser={currentUser} />;
      case 'map':
        return <MapPage currentUser={currentUser} />;
      case 'profile':
        return (
          <UserProfilePage 
            currentUser={currentUser} 
            onUpdateUser={handleUpdateUser}
            onShowSettings={() => setShowSettings(true)}
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
    <div className="max-w-2xl mx-auto">
      <CreatePost currentUser={currentUser} />
      
      {/* Ad Banner */}
      <div className="mb-6">
        <AdBanner type="banner" position="top" className="w-full" />
      </div>

      <div className="space-y-4 sm:space-y-6">
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
      <div className="mt-8">
        <RecommendationWidget />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            {/* Mobile header */}
            <div className="lg:hidden p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setShowSidebar(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentPage === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
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
            {!currentUser.isSubscribed && (
              <div className="p-4 border-t border-gray-200">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Crown className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-900">Opgrader til Pro</span>
                  </div>
                  <p className="text-sm text-purple-700 mb-3">
                    Få ubegrænset adgang til alle funktioner
                  </p>
                  <button
                    onClick={() => {
                      setShowSubscription(true);
                      setShowSidebar(false);
                    }}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Kun 29 kr/måned
                  </button>
                </div>
              </div>
            )}
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
      />

      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onOpenSettings={() => setShowSettings(true)}
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
      />

      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
}

export default App;