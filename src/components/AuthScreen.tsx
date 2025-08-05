import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Building, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import type { User } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'private' | 'professional' | 'small_business' | 'large_business'>('private');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Admin login - bypass API for admin
      if (email === 'admin@privaterengoring.dk' && password === 'admin123') {
        const adminUser = {
          id: 'admin',
          name: 'Administrator',
          email: 'admin@privaterengoring.dk',
          userType: 'admin',
          verified: true,
          isSubscribed: true,
          location: 'Danmark',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          rating: 5.0,
          completedJobs: 0,
          bio: 'Platform Administrator',
          phone: '+45 12 34 56 78',
          website: 'https://privaterengoring.dk',
          joinedDate: '2024-01-01'
        };
        
        localStorage.setItem('authToken', 'admin-token');
        onLogin(adminUser);
        setLoading(false);
        return;
      }

      // Real API call for authentication
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name: isLogin ? undefined : name,
          userType: isLogin ? undefined : userType,
          acceptedTerms: isLogin ? undefined : acceptedTerms
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login fejlede. Tjek dine oplysninger og prøv igen.');
      }

      const userData = await response.json();
      
      // Store authentication token
      localStorage.setItem('authToken', userData.token);
      
      // Login user
      onLogin(userData.user);
      
    } catch (error) {
      console.error('Authentication error:', error);
      alert(error instanceof Error ? error.message : 'Der opstod en fejl. Prøv igen.');
    }
    
    setLoading(false);
  };

  const userTypes = [
    { id: 'private', label: 'Privat person', icon: UserIcon, description: 'Jeg har brug for rengøring' },
    { id: 'professional', label: 'Professionel', icon: CheckCircle, description: 'Jeg tilbyder rengøringsservice' },
    { id: 'small_business', label: 'Lille virksomhed', icon: Building, description: '1-10 medarbejdere' },
    { id: 'large_business', label: 'Stor virksomhed', icon: Users, description: '10+ medarbejdere' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-sm sm:max-w-md w-full">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Private Rengøring</h1>
            <p className="text-blue-100 text-sm sm:text-base">Danmarks største platform for rengøring</p>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-6">
            <div className="flex mb-4 sm:mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  isLogin ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Log ind
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  !isLogin ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Opret konto
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Fulde navn</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      placeholder="Dit fulde navn"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="din@email.dk"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Adgangskode</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Din adgangskode"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Jeg er...</label>
                  <div className="space-y-1.5 sm:space-y-2">
                    {userTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setUserType(type.id as any)}
                          className={`w-full p-2.5 sm:p-3 rounded-lg border-2 transition-colors text-left ${
                            userType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              userType === type.id ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                            <div>
                              <div className={`font-medium text-sm sm:text-base ${
                                userType === type.id ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {type.label}
                              </div>
                              <div className={`text-xs sm:text-sm ${
                                userType === type.id ? 'text-blue-700' : 'text-gray-500'
                              }`}>
                                {type.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {!isLogin && (
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600">
                      Jeg accepterer vilkår og betingelser og privatlivspolitik
                    </label>
                  </div>
                  
                  {!acceptedTerms && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5 sm:p-3">
                      <p className="text-yellow-800 text-xs sm:text-sm">
                        ⚠️ Du skal acceptere vilkår og betingelser for at oprette en konto
                      </p>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (!isLogin && !acceptedTerms)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? 'Vent venligst...' : isLogin ? 'Log ind' : 'Opret konto'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}