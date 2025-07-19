import React, { useState, useEffect } from 'react';
import { Bell, MessageCircle, Search, Globe, Menu, X, Settings, LogOut, Crown, Star, Users, MapPin, Calendar, TrendingUp, Award, Shield } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
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
import AdminPage from './components/AdminPage';
import LocalJobsPage from './components/LocalJobsPage';
import NetworkPage from './components/NetworkPage';
import MyTasksPage from './components/MyTasksPage';
import PlanningPage from './components/PlanningPage';
import MapPage from './components/MapPage';
import UserProfilePage from './components/UserProfilePage';
import InstallPrompt from './components/InstallPrompt';
import AdBanner from './components/AdBanner';
import RecommendationWidget from './components/RecommendationWidget';
import AboutPage from './components/AboutPage';
import TermsPage from './components/TermsPage';
import ContactPage from './components/ContactPage';
import SupportPage from './components/SupportPage';
import { mockPosts, mockUsers } from './data/mockData';
import type { Post, User } from './types';

export default function App() {
  const { t, currentLanguage } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [showAuth, setShowAuth] = useState(true);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // PWA Install Prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Admin login
    if (email === 'admin@privatrengoring.dk' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin',
        name: 'Admin',
        email: 'admin@privatrengoring.dk',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isSubscribed: true,
        userType: 'admin',
        verified: true,
        rating: 5.0,
        completedJobs: 0,
        joinedDate: '2024-01-01',
        location: 'København',
        bio: 'Platform Administrator'
      };
      setCurrentUser(adminUser);
      setShowAuth(false);
      return;
    }

    // Find existing user or create new one
    let user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      // Create new user
      user = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isSubscribed: false,
        userType: 'private',
        verified: false,
        rating: 0,
        completedJobs: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        location: 'København',
        bio: ''
      };
      mockUsers.push(user);
    }
    
    setCurrentUser(user);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowAuth(true);
    setCurrentPage('home');
  };

  const handleSubscribe = () => {
    setShowSubscription(false);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, isSubscribed: true });
    }
    setShowPayment(false);
    setShowSuccess(true);
  };

  const handleCreatePost = (postData: any) => {
    if (!currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      user: currentUser,
      content: postData.content,
      images: postData.images || [],
      location: postData.location || currentUser.location,
      createdAt: 'Nu',
      likes: 0,
      comments: [],
      isJobPost: postData.isJobPost || false,
      jobType: postData.jobType,
      urgency: postData.urgency,
      budget: postData.budget
    };

    setPosts([newPost, ...posts]);
  };

  const handleReport = (postId: string, reason: string) => {
    console.log(`Post ${postId} reported: ${reason}`);
  };

  const handleShowUserProfile = (user: User) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const handleTagUser = (userId: string, postId: string) => {
    console.log(`User ${userId} tagged in post ${postId}`);
  };

  const handleSharePost = (postId: string, platform: string) => {
    console.log(`Post ${postId} shared on ${platform}`);
  };

  // Filter and sort posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !selectedLocation || post.location === selectedLocation;
    const matchesJobType = !selectedJobType || post.jobType === selectedJobType;
    const matchesUrgency = !selectedUrgency || post.urgency === selectedUrgency;

    return matchesSearch && matchesLocation && matchesJobType && matchesUrgency;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'most_liked':
        return b.likes - a.likes;
      case 'most_commented':
        return b.comments.length - a.comments.length;
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  if (showAuth) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (showSuccess) {
    return <SuccessPage onContinue={() => setShowSuccess(false)} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'admin':
        return currentUser?.email === 'admin@privatrengoring.dk' ? 
          <AdminPage /> : 
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Side ikke fundet</h2>
            <p className="text-gray-600">Denne side eksisterer ikke.</p>
          </div>;
      case 'local-jobs':
        return <LocalJobsPage />;
      case 'network':
        return <NetworkPage />;
      case 'my-tasks':
        return <MyTasksPage />;
      case 'planning':
        return <PlanningPage />;
      case 'map':
        return <MapPage />;
      case 'profile':
        return currentUser ? <UserProfilePage user={currentUser} /> : null;
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
            {/* Create Post */}
            <CreatePost 
              currentUser={currentUser} 
              onCreatePost={handleCreatePost}
              onShowSubscription={() => setShowSubscription(true)}
            />

            {/* Ad Banner */}
            <AdBanner type="banner" position="top" />

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
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
                    <AdBanner type="banner" position="middle" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingen opslag fundet</h3>
                <p className="text-gray-600">Prøv at justere dine søgekriterier</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        currentUser={currentUser}
        onShowMessages={() => setShowMessages(true)}
        onShowNotifications={() => setShowNotifications(true)}
        onShowProfile={() => setShowUserProfile(true)}
        onLogout={handleLogout}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedJobType={selectedJobType}
        onJobTypeChange={setSelectedJobType}
        selectedUrgency={selectedUrgency}
        onUrgencyChange={setSelectedUrgency}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentUser={currentUser}
          onShowHelp={() => setShowHelp(true)}
          onShowTerms={() => setShowTerms(true)}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <main className="max-w-2xl mx-auto px-4 py-6">
            {renderCurrentPage()}
          </main>

          {/* Recommendation Widget */}
          {currentPage === 'home' && (
            <div className="fixed bottom-4 right-4 z-40">
              <RecommendationWidget />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showSubscription && (
        <SubscriptionModal
          onClose={() => setShowSubscription(false)}
          onSubscribe={handleSubscribe}
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
        />
      )}

      {showNotifications && (
        <NotificationModal
          currentUser={currentUser}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {showUserProfile && selectedUser && (
        <UserProfileModal
          user={selectedUser}
          currentUser={currentUser}
          onClose={() => {
            setShowUserProfile(false);
            setSelectedUser(null);
          }}
          onShowSubscription={() => setShowSubscription(true)}
        />
      )}

      {showFriendRequests && (
        <FriendRequestModal
          currentUser={currentUser}
          onClose={() => setShowFriendRequests(false)}
        />
      )}

      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)} />
      )}

      {showTerms && (
        <TermsModal onClose={() => setShowTerms(false)} />
      )}

      {/* Install Prompt */}
      {showInstallPrompt && (
        <InstallPrompt
          onInstall={() => {
            if (deferredPrompt) {
              deferredPrompt.prompt();
              deferredPrompt.userChoice.then(() => {
                setDeferredPrompt(null);
                setShowInstallPrompt(false);
              });
            }
          }}
          onDismiss={() => setShowInstallPrompt(false)}
        />
      )}
    </div>
  );
}