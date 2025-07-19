import React, { useState } from 'react';
import { 
  Home, 
  MapPin, 
  MessageCircle, 
  UserIcon as User, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  Menu, 
  X,
  Calendar,
  Users,
  TrendingUp,
  HelpCircle,
  FileText,
  Phone,
  Info,
  LogOut
} from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PostCard from './components/PostCard';
import CreatePost from './components/CreatePost';
import MapPage from './components/MapPage';
import LocalJobsPage from './components/LocalJobsPage';
import MyTasksPage from './components/MyTasksPage';
import NetworkPage from './components/NetworkPage';
import PlanningPage from './components/PlanningPage';
import UserProfilePage from './components/UserProfilePage';
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
import RecommendationWidget from './components/RecommendationWidget';
import InstallPrompt from './components/InstallPrompt';
import { mockPosts, mockUsers } from './data/mockData';
import type { Post, User as UserType } from './types';

function App() {
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
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

  const handleShowUserProfile = (user: UserType) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const handleReport = (postId: string, reason: string) => {
    console.log('Reported post:', postId, 'Reason:', reason);
  };

  const handleTagUser = (userId: string, postId: string) => {
    console.log('Tagged user:', userId, 'in post:', postId);
  };

  const handleSharePost = (postId: string, platform: string) => {
    console.log('Shared post:', postId, 'on:', platform);
  };

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (showPayment) {
    return <PaymentModal onClose={() => setShowPayment(false)} />;
  }

  if (currentPage === 'success') {
    return <SuccessPage onContinue={() => setCurrentPage('home')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'map':
        return <MapPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'local-jobs':
        return <LocalJobsPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'my-tasks':
        return <MyTasksPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'network':
        return <NetworkPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'planning':
        return <PlanningPage currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'profile':
        return <UserProfilePage user={currentUser} onShowSubscription={() => setShowSubscription(true)} />;
      case 'admin':
        return <AdminPage currentUser={currentUser} />;
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
          <div className="space-y-4">
            <RecommendationWidget currentUser={currentUser} onShowSubscription={() => setShowSubscription(true)} />
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                onShowSubscription={() => setShowSubscription(true)}
                onReport={handleReport}
                onShowUserProfile={handleShowUserProfile}
                onTagUser={handleTagUser}
                onSharePost={handleSharePost}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <InstallPrompt />
      
      <Header
        currentUser={currentUser}
        onShowMessages={() => setShowMessages(true)}
        onShowNotifications={() => setShowNotifications(true)}
        onShowProfile={() => setCurrentPage('profile')}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />

      <div className="flex">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          currentUser={currentUser}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 lg:ml-64">
          <div className="max-w-2xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Create Post Button */}
      {currentPage === 'home' && (
        <button
          onClick={() => setShowCreatePost(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center z-40"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

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
          onUpgrade={() => {
            setShowSubscription(false);
            setShowPayment(true);
          }}
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
          onShowFriendRequests={() => {
            setShowNotifications(false);
            setShowFriendRequests(true);
          }}
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
        <HelpModal onClose={() => setShowHelp(false)} />
      )}

      {showTerms && (
        <TermsModal onClose={() => setShowTerms(false)} />
      )}
    </div>
  );
}

export default App;