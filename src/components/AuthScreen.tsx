import React, { useState } from 'react';
import { Lock, Eye, EyeOff, User, Mail, MapPin, HelpCircle, ArrowLeft } from 'lucide-react';
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
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
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
    }, 1000);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setError('Du skal acceptere vilkår & betingelser for at oprette en konto');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
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
    }, 1000);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4 relative">
      {/* Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-opacity-30 transition-all duration-200 z-10"
        title="Hjælp"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo og titel */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
              <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
              <path d="M5 15L5.5 17L7.5 17.5L5.5 18L5 20L4.5 18L2.5 17.5L4.5 17L5 15Z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Privat Rengøring</h1>
          <p className="text-gray-600">
            {isSignUp ? 'Opret din konto' : 'Log ind på din konto'}
          </p>
        </div>

        {/* Toggle between Login/SignUp */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => {
              setIsSignUp(false);
              setError('');
              setTermsAccepted(false);
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
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
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              isSignUp ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            Opret Konto
          </button>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Din adgangskode"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
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
              Test login: <strong>test@example.com</strong> / <strong>test123</strong>
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Vælg en sikker adgangskode"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="private">Privat kunde</option>
                <option value="cleaner">Rengøringsekspert</option>
                <option value="small_business">Lille virksomhed</option>
                <option value="large_business">Stor virksomhed</option>
              </select>
            </div>

            {/* Terms & Conditions - KUN ved signup */}
            <div className="p-4 bg-gray-50 rounded-xl">
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
                      className="text-blue-600 hover:text-blue-700 underline"
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !termsAccepted}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
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