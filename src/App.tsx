import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, DollarSign, Star, Lock, MoreHorizontal, Flag, AlertTriangle, Ban, ThumbsUp, Smile, Users, ExternalLink, Eye, EyeOff, Trash2, Edit, Menu, X, Bell, Search, Plus, Home, Briefcase, Network, User, Settings, HelpCircle } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import LocalJobsPage from './components/LocalJobsPage';
import NetworkPage from './components/NetworkPage';
import UserProfilePage from './components/UserProfilePage';
import MyTasksPage from './components/MyTasksPage';
import PlanningPage from './components/PlanningPage';
import MapPage from './components/MapPage';
import AdminPage from './components/AdminPage';
import AuthScreen from './components/AuthScreen';
import SubscriptionModal from './components/SubscriptionModal';
import PaymentModal from './components/PaymentModal';
import SuccessPage from './components/SuccessPage';
import MessagesModal from './components/MessagesModal';
import NotificationModal from './components/NotificationModal';
import UserProfileModal from './components/UserProfileModal';
import FriendRequestModal from './components/FriendRequestModal';
import HelpModal from './components/HelpModal';
import TermsModal from './components/TermsModal';
import AboutPage from './components/AboutPage';
import TermsPage from './components/TermsPage';
import ContactPage from './components/ContactPage';
import SupportPage from './components/SupportPage';
import AdBanner from './components/AdBanner';
import AdRevenue from './components/AdRevenue';
import RecommendationWidget from './components/RecommendationWidget';
import InstallPrompt from './components/InstallPrompt';
import { mockPosts, mockUsers } from './data/mockData';
import type { Post, User } from './types';

function App() {
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Check for PWA install prompt
  useEffect(() => {
    let deferredPrompt: any;
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: 'Nu',
      likes: 0,
      comments: []
    };
    setPosts([post, ...posts]);
    setShowCreatePost(false);
  };

  const handleShowUserProfile = (user: User) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const handleReport = (postId: string, reason: string) => {
    console.log('Reporting post:', postId, 'Reason:', reason);
    // In a real app, this would send the report to the backend
  };

  const handleTagUser = (userId: string, postId: string) => {
    console.log('Tagging user:', userId, 'in post:', postId);
    // In a real app, this would create a notification for the tagged user
  };

  const handleSharePost = (postId: string, platform: string) => {
    console.log('Sharing post:', postId, 'on:', platform);
    // In a real app, this would track sharing analytics
  };

  const handleUpgrade = () => {
    setShowSubscription(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, isSubscribed: true };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    setShowPayment(false);
    setCurrentPage('success');
  };

  // Show auth screen if not logged in
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Show success page after payment
  if (currentPage === 'success') {
    return <SuccessPage onContinue={() => setCurrentPage('home')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'jobs':
        return <LocalJobsPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'network':
        return <NetworkPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'profile':
        return <UserProfilePage user={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'tasks':
        return <MyTasksPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'planning':
        return <PlanningPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'map':
        return <MapPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'admin':
        return currentUser.email === 'admin@privatrengoring.dk' ? 
          <AdminPage currentUser={currentUser} /> : 
          <div className="p-8 text-center"><p className="text-red-600">Adgang nægtet</p></div>;
      case 'about':
        return <AboutPage />;
      case 'terms':
        return <TermsPage />;
      case 'contact':
        return <ContactPage />;
      case 'support':
        return <SupportPage />;
      default:
        return (
          <div className="space-y-6">
            {/* Next Steps Banner for new users */}
            {(!currentUser.isSubscribed && currentUser.email !== 'admin@privatrengoring.dk') && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mx-3 sm:mx-0">
                <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                  <span className="text-lg mr-2">🎯</span>
                  Næste skridt for dig
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setCurrentPage('profile')}
                    className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-yellow-50 transition-colors duration-200 text-left"
                  >
                    <User className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-900 text-sm">Fuldfør profil</p>
                      <p className="text-xs text-yellow-700">60% fuldført</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setCurrentPage('jobs')}
                    className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-yellow-50 transition-colors duration-200 text-left"
                  >
                    <Search className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-900 text-sm">Find eksperter</p>
                      <p className="text-xs text-yellow-700">Se tilgængelige</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-yellow-50 transition-colors duration-200 text-left"
                  >
                    <Plus className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-900 text-sm">Opret job</p>
                      <p className="text-xs text-yellow-700">Få hjælp nu</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Ad Banner */}
            <AdBanner type="banner" position="top" className="mx-3 sm:mx-0" />
            
            {/* Recommendation Widget */}
            <RecommendationWidget currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />
            
            {/* Posts */}
            {posts.map((post, index) => (
              <React.Fragment key={post.id}>
                <PostCard
                  post={post}
                  currentUser={currentUser}
                  onShowSubscription={() => setShowSubscription(true)}
                  onReport={handleReport}
                  onShowUserProfile={handleShowUserProfile}
                  onTagUser={handleTagUser}
                  onSharePost={handleSharePost}
                />
                {/* Ad between posts */}
                {(index + 1) % 3 === 0 && (
                  <AdBanner type="card" position="middle" className="mx-3 sm:mx-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Install Prompt */}
      {showInstallPrompt && (
        <InstallPrompt onClose={() => setShowInstallPrompt(false)} />
      )}

      {/* Header */}
      <Header
        currentUser={currentUser}
        onShowCreatePost={() => setShowCreatePost(true)}
        onShowMessages={() => setShowMessages(true)}
        onShowNotifications={() => setShowNotifications(true)}
        onShowProfile={() => setCurrentPage('profile')}
        onLogout={handleLogout}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          currentUser={currentUser}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onShowHelp={() => setShowHelp(true)}
        />

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-20 sm:pb-6">
          <div className="max-w-2xl mx-auto px-0 sm:px-6 lg:px-8">
            {renderPage()}
          </div>
        </main>

        {/* Ad Revenue Sidebar */}
        <AdRevenue />
      </div>

      {/* Modals */}
      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
          currentUser={currentUser}
        />
      )}

      {showSubscription && (
        <SubscriptionModal
          onClose={() => setShowSubscription(false)}
          onUpgrade={handleUpgrade}
        />
      )}

      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {showMessages && (
        <MessagesModal
          currentUser={currentUser}
          onClose={() => setShowMessages(false)}
          onShowSubscription={() => setShowSubscription(true)}
        />
      )}

      {showNotifications && (
        <NotificationModal
          currentUser={currentUser}
          onClose={() => setShowNotifications(false)}
          onShowSubscription={() => setShowSubscription(true)}
        />
      )}

      {showUserProfile && selectedUser && (
        <UserProfileModal
          user={selectedUser}
          currentUser={currentUser}
          onClose={() => setShowUserProfile(false)}
          onShowSubscription={() => setShowSubscription(true)}
        />
      )}

      {showFriendRequests && (
        <FriendRequestModal
          currentUser={currentUser}
          onClose={() => setShowFriendRequests(false)}
          onShowSubscription={() => setShowSubscription(true)}
        />
      )}

      {showHelp && (
        <HelpModal
          onClose={() => setShowHelp(false)}
          onShowTerms={() => {
            setShowHelp(false);
            setShowTerms(true);
          }}
        />
      )}

      {showTerms && (
        <TermsModal onClose={() => setShowTerms(false)} />
      )}

      {/* Footer - Only on desktop */}
      <footer className="hidden lg:block bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setCurrentPage('jobs')} className="hover:text-blue-600">Find Jobs</button></li>
                <li><button onClick={() => setCurrentPage('network')} className="hover:text-blue-600">Netværk</button></li>
                <li><button onClick={() => setShowCreatePost(true)} className="hover:text-blue-600">Opret Opslag</button></li>
                <li><button onClick={() => setCurrentPage('map')} className="hover:text-blue-600">Kort</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setShowHelp(true)} className="hover:text-blue-600">Hjælp Center</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-blue-600">Kontakt & Klager</button></li>
                <li><button onClick={() => setCurrentPage('support')} className="hover:text-blue-600">Support</button></li>
                <li><a href="mailto:support@privatrengoring.dk" className="hover:text-blue-600">Email Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Juridisk</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setCurrentPage('terms')} className="hover:text-blue-600">Vilkår & GDPR</button></li>
                <li><button onClick={() => setShowHelp(true)} className="hover:text-blue-600">Slet Konto</button></li>
                <li><a href="/privacy" className="hover:text-blue-600">Privatlivspolitik</a></li>
                <li><a href="/cookies" className="hover:text-blue-600">Cookie Politik</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Om Os</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-blue-600">Om Privat Rengøring</button></li>
                <li><a href="tel:+4570123456" className="hover:text-blue-600">+45 70 12 34 56</a></li>
                <li><a href="mailto:info@privatrengoring.dk" className="hover:text-blue-600">info@privatrengoring.dk</a></li>
                <li className="flex space-x-3 mt-3">
                  <a href="https://facebook.com" className="text-blue-600 hover:text-blue-700">📘</a>
                  <a href="https://instagram.com" className="text-pink-600 hover:text-pink-700">📷</a>
                  <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-800">💼</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2024 Privat Rengøring. Alle rettigheder forbeholdes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;