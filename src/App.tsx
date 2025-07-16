import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import SubscriptionModal from './components/SubscriptionModal';
import SuccessPage from './components/SuccessPage';
import PlanningPage from './components/PlanningPage';
import MyTasksPage from './components/MyTasksPage';
import NetworkPage from './components/NetworkPage';
import { mockUsers, mockPosts } from './data/mockData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [posts] = useState(mockPosts);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleSubscribe = () => {
    setCurrentUser(prev => ({ ...prev, isSubscribed: true }));
    setShowSubscriptionModal(false);
    setShowSuccessPage(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Vis login skærm hvis ikke autentificeret
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
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
        <main className="flex-1 min-h-screen">
          {currentPage === 'home' && (
            <div className="max-w-2xl mx-auto">
              {/* Create Post - Mobile optimized */}
              <div className="sticky top-14 sm:top-16 z-30 bg-gray-50 pt-3 sm:pt-6">
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
    </div>
  );
}

export default App;