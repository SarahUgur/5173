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
import MessagesModal from './components/MessagesModal';
import UserProfilePage from './components/UserProfilePage';
import MapPage from './components/MapPage';
import AdminPage from './components/AdminPage';
import AboutPage from './components/AboutPage';
import TermsPage from './components/TermsPage';
import ContactPage from './components/ContactPage';
import SupportPage from './components/SupportPage';
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
  const [showSettings, setShowSettings] = useState(false);
  const [posts, setPosts] = useState(() => getLocalizedPosts(language));
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('onboardingCompleted');
  });
  const [onboardingStep, setOnboardingStep] = useState(1);

  // Error boundary
  const handleError = (error: Error) => {
    console.error('App Error:', error);
    setError(error.message);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
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

  // Vis onboarding for nye brugere
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white">{onboardingStep}</span>
          </div>
          
          {onboardingStep === 1 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Velkommen til Privat Rengøring!</h2>
              <p className="text-gray-600 mb-6">
                Lad os hjælpe dig med at komme i gang. Hvad vil du bruge appen til?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setCurrentUser({...currentUser, primaryUse: 'hiring'});
                    setOnboardingStep(2);
                  }}
                  className="w-full p-4 border-2 border-blue-500 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors duration-200"
                >
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">🏠</span>
                    <div className="font-medium">Jeg søger rengøringshjælp</div>
                    <div className="text-sm opacity-75">Find pålidelige rengøringseksperter</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setCurrentUser({...currentUser, primaryUse: 'offering'});
                    setOnboardingStep(2);
                  }}
                  className="w-full p-4 border-2 border-green-500 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors duration-200"
                >
                  <div className="text-center">
                    <span className="text-2xl mb-2 block">💼</span>
                    <div className="font-medium">Jeg tilbyder rengøring</div>
                    <div className="text-sm opacity-75">Find kunder og byg dit netværk</div>
                  </div>
                </button>
              </div>
            </>
          )}
          
          {onboardingStep === 2 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfekt!</h2>
              <p className="text-gray-600 mb-6">
                {currentUser?.primaryUse === 'hiring' 
                  ? 'Vi har tilpasset appen til at hjælpe dig med at finde den rette rengøringshjælp.'
                  : 'Vi har tilpasset appen til at hjælpe dig med at finde kunder og vokse dit rengøringsbusiness.'
                }
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Dine næste skridt:</h3>
                <div className="text-left space-y-2 text-sm text-gray-700">
                  {currentUser?.primaryUse === 'hiring' ? (
                    <>
                      <p>✅ Udfyld din profil (60% fuldført)</p>
                      <p>📍 Aktiver lokation for bedre matches</p>
                      <p>🔍 Søg efter rengøringseksperter i dit område</p>
                      <p>💬 Opgrader til Pro for direkte beskeder</p>
                    </>
                  ) : (
                    <>
                      <p>✅ Udfyld din profil (60% fuldført)</p>
                      <p>📝 Opret dit første jobopslag</p>
                      <p>🌟 Byg dit netværk og få anmeldelser</p>
                      <p>💎 Opgrader til Pro for prioriteret visning</p>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={completeOnboarding}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Kom i gang!
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
  if (showSuccessPage) {
    return (
      <SuccessPage 
        onContinue={() => setShowSuccessPage(false)}
      />
    );
  }

  // Next Steps Banner for new users
  const showNextSteps = !currentUser?.profileCompleted && currentPage === 'home';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        currentUser={currentUser} 
        onShowSubscription={() => setShowSubscriptionModal(true)}
        onLogout={handleLogout}
        onToggleMobileMenu={toggleMobileMenu}
        onShowMessages={() => {
          if (!currentUser?.isSubscribed) {
            setShowSubscriptionModal(true);
          } else {
            setShowMessages(true);
          }
        }}
        onShowNotifications={() => setShowNotifications(true)}
        onShowProfile={() => setCurrentPage('profile')}
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
          {/* Next Steps Banner */}
          {showNextSteps && (
            <div className="mx-3 sm:mx-0 mt-3 sm:mt-6 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-900 mb-2">Dine næste skridt</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <button
                        onClick={() => setCurrentPage('profile')}
                        className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                      >
                        <span className="text-lg">📝</span>
                        <div className="text-left">
                          <p className="font-medium text-yellow-900">Fuldfør profil</p>
                          <p className="text-sm text-yellow-700">60% fuldført</p>
                        </div>
                      </button>
                      {currentUser?.primaryUse === 'hiring' ? (
                        <button
                          onClick={() => setCurrentPage('local')}
                          className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <span className="text-lg">🔍</span>
                          <div className="text-left">
                            <p className="font-medium text-yellow-900">Find eksperter</p>
                            <p className="text-sm text-yellow-700">Se lokale jobs</p>
                          </div>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            // Scroll to create post
                            document.querySelector('.create-post')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex items-center space-x-2 p-3 bg-white rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <span className="text-lg">💼</span>
                          <div className="text-left">
                            <p className="font-medium text-yellow-900">Opret første job</p>
                            <p className="text-sm text-yellow-700">Få kunder</p>
                          </div>
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setCurrentUser({...currentUser, profileCompleted: true});
                        localStorage.setItem('currentUser', JSON.stringify({...currentUser, profileCompleted: true}));
                      }}
                      className="text-sm text-yellow-700 hover:text-yellow-800 underline"
                    >
                      Skjul denne besked
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'home' && (
            <div className="max-w-2xl mx-auto animate-fadeIn">
              {/* Create Post - Mobile optimized */}
              <div className="sticky top-16 z-30 bg-gradient-to-br from-gray-50 to-blue-50 pt-3 sm:pt-6 backdrop-blur-sm create-post">
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
          
          {currentPage === 'profile' && (
            <div className="animate-fadeIn">
              <UserProfilePage 
                currentUser={currentUser} 
                onUpdateUser={handleUpdateUser}
                onShowSettings={() => setShowSettings(true)}
              />
            </div>
          )}
          
          {currentPage === 'map' && (
            <div className="animate-fadeIn">
              <MapPage currentUser={currentUser} />
            </div>
          )}
          
          {currentPage === 'admin' && currentUser?.email === 'admin@privatrengoring.dk' && (
            <div className="animate-fadeIn">
              <AdminPage currentUser={currentUser} />
            </div>
          )}
          
          {currentPage === 'about' && (
            <div className="animate-fadeIn">
              <AboutPage />
            </div>
          )}
          
          {currentPage === 'terms' && (
            <div className="animate-fadeIn">
              <TermsPage />
            </div>
          )}
          
          {currentPage === 'contact' && (
            <div className="animate-fadeIn">
              <ContactPage />
            </div>
          )}
          
          {currentPage === 'support' && (
            <div className="animate-fadeIn">
              <SupportPage />
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

      {/* Footer - kun på desktop og større skærme */}
      <footer className="hidden lg:block bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Om Privat Rengøring */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <span className="font-bold text-gray-900">Privat Rengøring</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Social platform der forbinder kunder med dygtige rengøringseksperter i hele Danmark.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentPage('about')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Om os
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('local')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Find jobs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('network')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Netværk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Pro medlemskab
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentPage('support')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Hjælp & Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Kontakt & Klager
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:support@privatrengoring.dk"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Email support
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+4570203040"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Ring til os
                  </a>
                </li>
              </ul>
            </div>

            {/* Juridisk */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Juridisk</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentPage('terms')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Vilkår & GDPR
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('terms')}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Privatlivspolitik
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Slet konto
                  </button>
                </li>
                <li>
                  <a
                    href="/widget.js"
                    target="_blank"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    Widget til hjemmeside
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2025 Privat Rengøring. Alle rettigheder forbeholdes.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-gray-500 text-sm">Udviklet med ❤️ i Danmark</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-500 text-sm">Alle systemer kører</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={handleSubscribe}
        userEmail={currentUser.email}
      />
      
      <MessagesModal
        isOpen={showMessages}
        onClose={() => setShowMessages(false)}
        currentUser={currentUser}
      />
      
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