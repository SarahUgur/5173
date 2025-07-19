import React, { useState } from 'react';
import { Lock, Eye, EyeOff, User, Mail, MapPin, HelpCircle, ArrowLeft, Chrome } from 'lucide-react';
import TermsModal from './TermsModal';
import HelpModal from './HelpModal';

interface AuthScreenProps {
  onLogin: (user: any) => void;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  location: string;
  userType: 'private' | 'cleaner' | 'small_business' | 'large_business';
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form data
  const [signupData, setSignupData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    location: '',
    userType: 'private'
  });

  // Mock users database (i virkeligheden ville dette være en rigtig database)
  const mockUsers = [
    {
      id: '1',
      name: 'Test Bruger',
      email: 'test@example.com',
      password: 'test123',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'private',
      isSubscribed: false,
      location: 'København',
      verified: false
    },
    {
      id: 'admin',
      name: 'Administrator',
      email: 'admin@privatrengoring.dk',
      password: 'admin123',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'admin',
      isSubscribed: true,
      location: 'Danmark',
      verified: true,
      isAdmin: true
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Find user in mock database
    const user = mockUsers.find(u => 
      u.email === loginData.email && u.password === loginData.password
    );

    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin(user);
    } else {
      setError('Forkert email eller adgangskode');
    }
    setIsLoading(false);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setError('Du skal acceptere vilkår & betingelser for at oprette en konto');
      return;
    }

    setIsLoading(true);
    setError('');

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === signupData.email);
    
    if (existingUser) {
      setError('En bruger med denne email eksisterer allerede');
      setIsLoading(false);
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...signupData,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      isSubscribed: false,
      verified: false
    };

    // Save to localStorage (i virkeligheden ville dette være en database)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('termsAccepted', 'true');
    
    onLogin(newUser);
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setError('');
    
    // Simulate social login (i virkeligheden ville dette være rigtig OAuth)
    setTimeout(() => {
      const socialUser = {
        id: Date.now().toString(),
        name: `${provider} Bruger`,
        email: `user@${provider.toLowerCase()}.com`,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        userType: 'private',
        isSubscribed: false,
        location: 'Danmark',
        verified: true,
        loginMethod: provider
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(socialUser));
      onLogin(socialUser);
      setIsLoading(false);
    }, 1500);
  };
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);
  };

  const getUserTypeLabel = (type: string) => {
    const labels = {
      'private': 'Privat kunde',
      'cleaner': 'Rengøringsekspert',
      'small_business': 'Lille virksomhed',
      'large_business': 'Stor virksomhed'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative animate-fadeIn">
      {/* Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed top-4 right-4 glass text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-200 z-10 hover:scale-110"
        title="Hjælp"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      <div className="bg-white rounded-2xl shadow-strong max-w-md w-full p-6 sm:p-8 animate-slideUp">
        {/* Logo og titel */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-strong hover:scale-110 transition-transform duration-200">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
              <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
              <path d="M5 15L5.5 17L7.5 17.5L5.5 18L5 20L4.5 18L2.5 17.5L4.5 17L5 15Z"/>
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text mb-2">Privat Rengøring</h1>
          <p className="text-sm sm:text-base text-gray-600">
            {isSignUp ? 'Opret din konto' : 'Log ind på din konto'}
          </p>
        </div>

        {/* Toggle between Login/SignUp */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6 shadow-soft">
          <button
            onClick={() => {
              setIsSignUp(false);
              setError('');
              setTermsAccepted(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 hover:scale-105 ${
              !isSignUp ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Log Ind
          </button>
          <button
            onClick={() => {
              setIsSignUp(true);
              setError('');
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 hover:scale-105 ${
              isSignUp ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Opret Konto
          </button>
        </div>

        {/* Social Login Buttons - Vises på begge sider */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialLogin('Google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 hover:scale-105 card"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-700">
              {isSignUp ? 'Tilmeld med Google' : 'Log ind med Google'}
            </span>
          </button>

          <button
            onClick={() => handleSocialLogin('Apple')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 hover:scale-105 card"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="font-medium text-gray-700">
              {isSignUp ? 'Tilmeld med Apple' : 'Log ind med Apple'}
            </span>
          </button>

          <button
            onClick={() => handleSocialLogin('Facebook')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 hover:scale-105 card"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="font-medium text-gray-700">
              {isSignUp ? 'Tilmeld med Facebook' : 'Log ind med Facebook'}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">eller med email</span>
          </div>
        </div>
        {/* Login Form */}
        {!isSignUp && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="din@email.dk"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adgangskode</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Din adgangskode"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:scale-110 transition-transform duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                Glemt adgangskode?
              </button>
            </div>

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-3 animate-fadeIn">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center space-x-2 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logger ind...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Log Ind</span>
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              <span className="text-gray-500">Har allerede en konto? </span>
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Log ind
              </button>
            </div>
            <div className="text-center text-sm text-gray-600">
              <span className="text-gray-500">Ingen konto? </span>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Tilmeld
              </button>
            </div>
          </form>
        )}

        {/* SignUp Form */}
        {isSignUp && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fulde navn</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Dit fulde navn"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="din@email.dk"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adgangskode</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Vælg en sikker adgangskode"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:scale-110 transition-transform duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lokation</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={signupData.location}
                  onChange={(e) => setSignupData({...signupData, location: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="København, Aarhus, etc."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bruger type</label>
              <select
                value={signupData.userType}
                onChange={(e) => setSignupData({...signupData, userType: e.target.value as any})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                required
              >
                <option value="private">Privat kunde</option>
                <option value="cleaner">Rengøringsekspert</option>
                <option value="small_business">Lille virksomhed</option>
                <option value="large_business">Stor virksomhed</option>
              </select>
            </div>

            {/* Terms & Conditions - KUN ved signup */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                    Jeg accepterer{' '}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-blue-600 hover:text-blue-700 underline hover:scale-105 transition-transform duration-200"
                    >
                      vilkår & betingelser
                    </button>
                  </label>
                  {!termsAccepted && (
                    <p className="text-xs text-red-600 mt-1">
                      Du skal acceptere vilkår & betingelser for at oprette en konto
                    </p>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-3 animate-fadeIn">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !termsAccepted}
              className="w-full btn-primary text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center space-x-2 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Opretter konto...</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  <span>Opret Konto</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Modals - kun vist ved signup */}
      {isSignUp && (
        <>
          <TermsModal
            isOpen={showTerms}
            onClose={() => setShowTerms(false)}
            onAccept={handleAcceptTerms}
          />
        </>
      )}
      
      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}