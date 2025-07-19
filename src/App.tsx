import React, { useState } from 'react';
import { X } from 'lucide-react';
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
import InstallPrompt from './components/InstallPrompt';
import AdminPage from './components/AdminPage';
import { mockUsers, getLocalizedPosts } from './data/mockData';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { language } = useLanguage();
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Update posts when language changes
  React.useEffect(() => {
    setPosts(getLocalizedPosts(language));
  }, [language]);
  const handleSubscribe = () => {
    const updatedUser = { ...currentUser, isSubscribed: true };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setShowSubscriptionModal(false);
    setShowSuccessPage(true);
  };

  const handleLogin = (user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleUpdateUser = (updates: any) => {
    setCurrentUser(updates);
    localStorage.setItem('currentUser', JSON.stringify(updates));
  };

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
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser} 
        onShowSubscription={() => setShowSubscriptionModal(true)}
        onLogout={handleLogout}
        onToggleMobileMenu={toggleMobileMenu}
        onShowMessages={() => setShowMessages(true)}
        onShowNotifications={() => setShowNotifications(true)}
        onShowProfile={() => setShowProfile(true)}
        onShowSettings={() => setShowSettings(true)}
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
        <main className="flex-1 min-h-screen md:ml-0">
          {currentPage === 'home' && (
            <div className="max-w-2xl mx-auto">
              {/* Create Post - Mobile optimized */}
              <div className="sticky top-16 z-30 bg-gray-50 pt-3 sm:pt-6">
                <CreatePost currentUser={currentUser} />
              </div>
              
              {/* Posts Feed */}
              <div className="space-y-4 sm:space-y-6 pb-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    onShowSubscription={() => setShowSubscriptionModal(true)}
                    onReport={(postId, reason) => {
                      console.log(`Rapport modtaget for post ${postId}: ${reason}`);
                      // I en rigtig app ville dette sendes til admin database
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          
          {currentPage === 'planning' && (
            <PlanningPage currentUser={currentUser} />
          )}
          
          {currentPage === 'tasks' && (
            <MyTasksPage currentUser={currentUser} />
          )}
          
          {currentPage === 'network' && (
            <NetworkPage currentUser={currentUser} />
          )}
          
          {currentPage === 'local' && (
            <LocalJobsPage currentUser={currentUser} />
          )}
          
          {currentPage === 'admin' && currentUser?.email === 'admin@privatrengoring.dk' && (
            <AdminPage currentUser={currentUser} />
          )}
          
        </main>

        {/* Right sidebar - Hidden on mobile and tablet */}
        <div className="w-80 p-6 hidden xl:block">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Trending Jobs</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Hjemmerengøring</span>
                <span className="text-blue-600 font-medium">+24%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Kontorrengøring</span>
                <span className="text-green-600 font-medium">+18%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Hovedrengøring</span>
                <span className="text-purple-600 font-medium">+12%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
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
      {showMessages && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Beskeder</h2>
              <button onClick={() => setShowMessages(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600">Du har 3 nye beskeder...</p>
          </div>
        </div>
      )}
      
      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Notifikationer</h2>
              <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600">Du har 5 nye notifikationer...</p>
          </div>
        </div>
      )}
      
      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Min Profil</h2>
              <button onClick={() => setShowProfile(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <img src={currentUser.avatar} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{currentUser.name}</h3>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        </div>
      )}

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
      />
      
      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onOpenSettings={() => setShowSettings(true)}
      />
      
      <InstallPrompt />
    </div>
  );
}

export default App;