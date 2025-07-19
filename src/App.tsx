import React, { useState, useEffect } from 'react';
import { Home, Users, MapPin, Calendar, MessageSquare, Settings, Bell, Search, Plus, Menu, X, Star, Shield } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import AuthScreen from './components/AuthScreen';
import SubscriptionModal from './components/SubscriptionModal';
import UserProfileModal from './components/UserProfileModal';
import MessagesModal from './components/MessagesModal';
import NotificationModal from './components/NotificationModal';
import FriendRequestModal from './components/FriendRequestModal';
import HelpModal from './components/HelpModal';
import TermsModal from './components/TermsModal';
import NetworkPage from './components/NetworkPage';
import LocalJobsPage from './components/LocalJobsPage';
import MyTasksPage from './components/MyTasksPage';
import PlanningPage from './components/PlanningPage';
import MapPage from './components/MapPage';
import AdminPage from './components/AdminPage';
import UserProfilePage from './components/UserProfilePage';
import PaymentModal from './components/PaymentModal';
import SuccessPage from './components/SuccessPage';
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
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showFriendRequestModal, setShowFriendRequestModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'like',
      message: 'Maria Hansen synes godt om dit opslag',
      time: '2 min siden',
      read: false,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '2',
      type: 'comment',
      message: 'Lars Nielsen kommenterede på dit opslag',
      time: '5 min siden',
      read: false,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '3',
      type: 'job',
      message: 'Nyt rengøringsjob i dit område',
      time: '10 min siden',
      read: true,
      avatar: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ]);

  const [friendRequests, setFriendRequests] = useState([
    {
      id: '1',
      user: {
        id: '4',
        name: 'Anna Larsen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        userType: 'private' as const,
        verified: false
      },
      message: 'Hej! Jeg så dit opslag om rengøring. Vil gerne forbinde.',
      time: '1 time siden'
    }
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: any) => {
    const user: User = {
      id: userData.email === 'admin@privatrengoring.dk' ? 'admin' : Date.now().toString(),
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      avatar: userData.avatar || `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`,
      userType: userData.userType || 'private',
      verified: userData.email === 'admin@privatrengoring.dk',
      isSubscribed: userData.email === 'admin@privatrengoring.dk' || userData.isSubscribed || false,
      location: userData.location || 'København',
      rating: userData.rating || 4.5,
      completedJobs: userData.completedJobs || 0,
      joinedDate: userData.joinedDate || new Date().toISOString().split('T')[0]
    };
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const handleCreatePost = (postData: any) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: currentUser!,
      userId: currentUser!.id,
      content: postData.content,
      images: postData.images || [],
      createdAt: 'Nu',
      likes: 0,
      comments: [],
      location: postData.location || currentUser!.location,
      isJobPost: postData.isJobPost || false,
      jobType: postData.jobType,
      urgency: postData.urgency || 'flexible',
      budget: postData.budget
    };
    
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  const handleShowUserProfile = (user: User) => {
    if (user.id === currentUser?.id) {
      setCurrentPage('profile');
    } else {
      setSelectedUser(user);
      setShowUserProfileModal(true);
    }
  };

  const handleReport = (postId: string, reason: string) => {
    console.log(`Post ${postId} reported for: ${reason}`);
  };

  const handleTagUser = (userId: string, postId: string) => {
    console.log(`User ${userId} tagged in post ${postId}`);
  };

  const handleSharePost = (postId: string, platform: string) => {
    console.log(`Post ${postId} shared on ${platform}`);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'jobs') return post.isJobPost && matchesSearch;
    if (filterBy === 'posts') return !post.isJobPost && matchesSearch;
    return matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'popular') return b.likes - a.likes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (currentPage === 'success') {
    return <SuccessPage onContinue={() => setCurrentPage('home')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'network':
        return <NetworkPage currentUser={currentUser} onShowUserProfile={handleShowUserProfile} />;
      case 'local-jobs':
        return <LocalJobsPage currentUser={currentUser} onShowSubscription={() => setShowSubscriptionModal(true)} />;
      case 'my-tasks':
        return <MyTasksPage currentUser={currentUser} />;
      case 'planning':
        return <PlanningPage currentUser={currentUser} />;
      case 'map':
        return <MapPage currentUser={currentUser} onShowSubscription={() => setShowSubscriptionModal(true)} />;
      case 'admin':
        if (currentUser?.email === 'admin@privatrengoring.dk') {
          return <AdminPage />;
        }
        setCurrentPage('home');
        return null;
      case 'profile':
        return <UserProfilePage user={currentUser!} onBack={() => setCurrentPage('home')} />;
      case 'about':
        return <AboutPage onBack={() => setCurrentPage('home')} />;
      case 'terms':
        return <TermsPage onBack={() => setCurrentPage('home')} />;
      case 'contact':
        return <ContactPage onBack={() => setCurrentPage('home')} />;
      case 'support':
        return <SupportPage onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-3 sm:px-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={t('searchPosts')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">{t('allPosts')}</option>
                  <option value="jobs">{t('jobsOnly')}</option>
                  <option value="posts">{t('postsOnly')}</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="newest">{t('newest')}</option>
                  <option value="oldest">{t('oldest')}</option>
                  <option value="popular">{t('popular')}</option>
                </select>
              </div>
            </div>

            <AdBanner type="banner" position="top" className="mx-3 sm:mx-0" />

            {sortedPosts.map((post, index) => (
              <React.Fragment key={post.id}>
                <PostCard
                  post={post}
                  currentUser={currentUser}
                  onShowSubscription={() => setShowSubscriptionModal(true)}
                  onReport={handleReport}
                  onShowUserProfile={handleShowUserProfile}
                  onTagUser={handleTagUser}
                  onSharePost={handleSharePost}
                />
                {(index + 1) % 3 === 0 && (
                  <AdBanner type="banner" position="middle" className="mx-3 sm:mx-0" />
                )}
              </React.Fragment>
            ))}

            {sortedPosts.length === 0 && (
              <div className="text-center py-12 mx-3 sm:mx-0">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingen opslag fundet</h3>
                <p className="text-gray-600">Prøv at ændre dine søgekriterier eller filtre</p>
              </div>
            )}

            <RecommendationWidget currentUser={currentUser} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <InstallPrompt />
      
      <Header
        currentUser={currentUser}
        onShowMessages={() => setShowMessagesModal(true)}
        onShowNotifications={() => setShowNotificationModal(true)}
        onShowProfile={() => setCurrentPage('profile')}
        onLogout={handleLogout}
        unreadNotifications={unreadNotifications}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentUser={currentUser}
        />

        <main className="flex-1 lg:ml-64">
          <div className="max-w-2xl mx-auto py-6 sm:py-8">
            {renderPage()}
          </div>
        </main>
      </div>

      <button
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
          currentUser={currentUser}
        />
      )}

      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={() => {
            setShowSubscriptionModal(false);
            setShowPaymentModal(true);
          }}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setShowPaymentModal(false);
            setCurrentPage('success');
            if (currentUser) {
              const updatedUser = { ...currentUser, isSubscribed: true };
              setCurrentUser(updatedUser);
              localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }
          }}
        />
      )}

      {showUserProfileModal && selectedUser && (
        <UserProfileModal
          user={selectedUser}
          currentUser={currentUser}
          onClose={() => {
            setShowUserProfileModal(false);
            setSelectedUser(null);
          }}
          onShowSubscription={() => setShowSubscriptionModal(true)}
        />
      )}

      {showMessagesModal && (
        <MessagesModal
          currentUser={currentUser}
          onClose={() => setShowMessagesModal(false)}
          onShowSubscription={() => setShowSubscriptionModal(true)}
        />
      )}

      {showNotificationModal && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setShowNotificationModal(false)}
          onMarkAsRead={(id) => {
            setNotifications(notifications.map(n => 
              n.id === id ? { ...n, read: true } : n
            ));
          }}
          onMarkAllAsRead={() => {
            setNotifications(notifications.map(n => ({ ...n, read: true })));
          }}
        />
      )}

      {showFriendRequestModal && (
        <FriendRequestModal
          requests={friendRequests}
          onClose={() => setShowFriendRequestModal(false)}
          onAccept={(id) => {
            setFriendRequests(friendRequests.filter(r => r.id !== id));
          }}
          onDecline={(id) => {
            setFriendRequests(friendRequests.filter(r => r.id !== id));
          }}
        />
      )}

      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}

      {showTermsModal && (
        <TermsModal onClose={() => setShowTermsModal(false)} />
      )}
    </div>
  );
}