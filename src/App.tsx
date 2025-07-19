import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import SubscriptionModal from './components/SubscriptionModal';
import SuccessPage from './components/SuccessPage';
import PlanningPage from './components/PlanningPage';
import MyTasksPage from './components/MyTasksPage';
import NetworkPage from './components/NetworkPage';
import LocalJobsPage from './components/LocalJobsPage';
import SettingsModal from './components/SettingsModal';
import NotificationModal from './components/NotificationModal';
import UserProfileModal from './components/UserProfileModal';
import FriendRequestModal from './components/FriendRequestModal';
import InstallPrompt from './components/InstallPrompt';
import AdminPage from './components/AdminPage';
import AdBanner from './components/AdBanner';
import RecommendationWidget from './components/RecommendationWidget';
import { mockUsers, getLocalizedPosts } from './data/mockData';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : mockUsers[0];
  });
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [posts, setPosts] = useState(() => getLocalizedPosts(language));
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Error boundary
  const handleError = (error: Error) => {
    console.error('App Error:', error);
    setError(error.message);
  };

  // Loading states
  const withLoading = async (fn: () => Promise<void> | void) => {
    setIsLoading(true);
    setError(null);
    try {
      await fn();
    } catch (err) {
      handleError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update posts when language changes
  React.useEffect(() => {
    setPosts(getLocalizedPosts(language));
  }, [language]);

  // Auto-save user data
  React.useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleSubscribe = () => {
    withLoading(() => {
      const updatedUser = { ...currentUser, isSubscribed: true };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setShowSubscriptionModal(false);
      setShowSuccessPage(true);
    });
  };

  const handleLogin = (user: any) => {
    withLoading(() => {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  };

  const handleLogout = () => {
    withLoading(() => {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
      setIsAuthenticated(false);
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleShowUserProfile = (user: any) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const handleSendFriendRequest = (userId: string) => {
    console.log('Sending friend request to:', userId);
    alert('Venskabsanmodning sendt!');
  };

  const handleAcceptFriendRequest = (userId: string) => {
    console.log('Accepting friend request from:', userId);
    alert('Venskabsanmodning accepteret!');
  };

  const handleSendMessage = (userId: string) => {
    console.log('Sending message to:', userId);
    setShowMessages(true);
  };

  const handleBlockUser = (userId: string) => {
    console.log('Blocking user:', userId);
    alert('Bruger blokeret');
  };

  const handleReportUser = (userId: string, reason: string) => {
    console.log('Reporting user:', userId, 'Reason:', reason);
    alert('Bruger rapporteret til admin');
  };

  const handleTagUser = (userId: string, postId: string) => {
    console.log('Tagging user:', userId, 'in post:', postId);
    // I en rigtig app ville dette sende en notifikation til den taggede bruger
    alert('Bruger tagget i opslag!');
  };

  const handleSharePost = (postId: string, platform: string) => {
    console.log('Sharing post:', postId, 'on:', platform);
    // I en rigtig app ville dette tracke delinger for analytics
  };
  const handleUpdateUser = (updates: any) => {
    withLoading(() => {
      setCurrentUser(updates);
      localStorage.setItem('currentUser', JSON.stringify(updates));
    });
  };

  // Error display
  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Der opstod en fejl</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Genindlæs App
          </button>
        </div>
      </div>
    );
  }

  // Loading overlay
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Indlæser...</p>
        </div>
      </div>
    );
  }

  // Vis login skærm hvis ikke autentificeret
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (showSuccessPage) {
    return (
      <SuccessPage 
        onContinue={() => setShowSuccessPage(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        currentUser={currentUser} 
        onShowSubscription={() => setShowSubscriptionModal(true)}
        onLogout={handleLogout}
        onToggleMobileMenu={toggleMobileMenu}
        onShowMessages={() => setShowMessages(true)}
        onShowNotifications={() => setShowNotifications(true)}
        onShowProfile={() => setShowProfile(true)}
        onShowSettings={() => setShowSettings(true)}
        onShowFriendRequests={() => setShowFriendRequests(true)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <div className="flex relative">
        <Sidebar 
          currentUser={currentUser} 
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen md:ml-0 transition-all duration-300">
          {currentPage === 'home' && (
            <div className="max-w-2xl mx-auto animate-fadeIn">
              {/* Create Post - Mobile optimized */}
              <div className="sticky top-16 z-30 bg-gradient-to-br from-gray-50 to-blue-50 pt-3 sm:pt-6 backdrop-blur-sm">
                <CreatePost currentUser={currentUser} />
              </div>
              
              {/* Posts Feed */}
              <div className="space-y-4 sm:space-y-6 pb-6 animate-slideUp">
                {posts.map((post, index) => (
                  <React.Fragment key={post.id}>
                    <PostCard
                      post={post}
                      currentUser={currentUser}
                      onShowSubscription={() => setShowSubscriptionModal(true)}
                      onReport={(postId, reason) => {
                        console.log(`Rapport modtaget for post ${postId}: ${reason}`);
                        // I en rigtig app ville dette sendes til admin database
                      }}
                      onShowUserProfile={handleShowUserProfile}
                      onTagUser={handleTagUser}
                      onSharePost={handleSharePost}
                    />
                    
                    {/* Reklame efter hver 3. post */}
                    {(index + 1) % 3 === 0 && (
                      <div className="mx-3 sm:mx-0">
                        {index % 6 === 2 ? (
                          <AdBanner type="video" position="middle" className="w-full" />
                        ) : (
                          <AdBanner type="native" position="middle" className="w-full" />
                        )}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          
          {currentPage === 'planning' && (
            <div className="animate-fadeIn">
              <PlanningPage currentUser={currentUser} />
            </div>
          )}
          
          {currentPage === 'tasks' && (
            <div className="animate-fadeIn">
              <MyTasksPage currentUser={currentUser} />
            </div>
          )}
          
          {currentPage === 'network' && (
            <div className="animate-fadeIn">
              <NetworkPage currentUser={currentUser} />
            </div>
          )}
          
          {currentPage === 'local' && (
            <div className="animate-fadeIn">
              <LocalJobsPage currentUser={currentUser} />
            </div>
          )}
          
          {currentPage === 'admin' && currentUser?.email === 'admin@privatrengoring.dk' && (
            <div className="animate-fadeIn">
              <AdminPage currentUser={currentUser} />
            </div>
          )}
          
        </main>

        {/* Right sidebar - Hidden on mobile and tablet */}
        <div className="w-80 p-6 hidden xl:block animate-slideInRight">
          <RecommendationWidget 
            currentUser={currentUser}
            onShowUserProfile={handleShowUserProfile}
            onPageChange={setCurrentPage}
          />

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-6 hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-gray-900 mb-3">Foreslåede Kontakter</h3>
            <div className="space-y-3">
              {mockUsers.slice(1).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.location}</p>
                    </div>
                  </div>
                  <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-200">
                    Følg
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
        userEmail={currentUser.email}
      />
      
      {/* Messages Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onPageChange={setCurrentPage}
      />
      
      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onOpenSettings={() => setShowSettings(true)}
      />
      
      <UserProfileModal
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        user={selectedUser}
        currentUser={currentUser}
        onSendFriendRequest={handleSendFriendRequest}
        onAcceptFriendRequest={handleAcceptFriendRequest}
        onSendMessage={handleSendMessage}
        onBlockUser={handleBlockUser}
        onReportUser={handleReportUser}
      />

      <FriendRequestModal
        isOpen={showFriendRequests}
        onClose={() => setShowFriendRequests(false)}
        onAcceptRequest={(requestId) => {
          console.log('Accepting request:', requestId);
          alert('Venskabsanmodning accepteret!');
        }}
        onDeclineRequest={(requestId) => {
          console.log('Declining request:', requestId);
          alert('Venskabsanmodning afvist');
        }}
        onSendRequest={handleSendFriendRequest}
      />
      
      <InstallPrompt />
    </div>
  );
}

export default App;