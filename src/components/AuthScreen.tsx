import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building, Users, CheckCircle, X, Chrome } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { mockUsers } from '../data/mockData';
import type { User as UserType } from '../types';

interface AuthScreenProps {
  onLogin: (user: UserType) => void;
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
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [socialLoginLoading, setSocialLoginLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Demo admin login - bypass API for admin
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
          website: 'https://privatrengoring.dk',
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

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    setSocialLoginLoading(provider);
    
    try {
      // Demo social login - create demo user
      const demoUsers = {
        google: {
          id: 'google-demo',
          name: 'Google Bruger',
          email: 'google@example.com',
          userType: 'private',
          verified: true,
          isSubscribed: false,
          location: 'København',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          coverPhoto: 'https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
          rating: 4.5,
          completedJobs: 0,
          bio: 'Logget ind via Google',
          phone: '+45 12 34 56 78',
          website: '',
          joinedDate: new Date().toISOString().split('T')[0],
          coverPhoto: 'https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop'
        },
        apple: {
          id: 'apple-demo',
          name: 'Apple Bruger',
          email: 'apple@example.com',
          userType: 'cleaner',
          verified: true,
          isSubscribed: false,
          location: 'Aarhus',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          coverPhoto: 'https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
          rating: 4.8,
          completedJobs: 15,
          bio: 'Logget ind via Apple',
          phone: '+45 87 65 43 21',
          website: '',
          joinedDate: new Date().toISOString().split('T')[0],
          coverPhoto: 'https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop'
        },
        facebook: {
          id: 'facebook-demo',
          name: 'Facebook Bruger',
          email: 'facebook@example.com',
          userType: 'small_business',
          verified: true,
          isSubscribed: true,
          location: 'Odense',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          coverPhoto: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop',
          rating: 4.9,
          completedJobs: 45,
          bio: 'Logget ind via Facebook',
          phone: '+45 23 45 67 89',
          website: 'https://example.com',
          joinedDate: new Date().toISOString().split('T')[0],
          coverPhoto: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop'
        }
      };

      // Simulate loading time
      setTimeout(() => {
        const demoUser = demoUsers[provider];
        localStorage.setItem('authToken', `${provider}-demo-token`);
        onLogin(demoUser);
        setSocialLoginLoading(null);
      }, 1500);
      
    } catch (error) {
      alert(`Fejl ved ${provider} login. Prøv igen.`);
      setSocialLoginLoading(null);
    }
  };

  const userTypes = [
    { id: 'private', label: 'Privat person', icon: User, description: 'Jeg har brug for rengøring' },
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
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500 text-xs sm:text-sm">Eller log ind med</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    disabled={socialLoginLoading === 'google'}
                    className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    {socialLoginLoading === 'google' ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      {socialLoginLoading === 'google' ? 'Omdirigerer til Google...' : 'Fortsæt med Google'}
                    </span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('apple')}
                    disabled={socialLoginLoading === 'apple'}
                    className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    {socialLoginLoading === 'apple' ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    )}
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      {socialLoginLoading === 'apple' ? 'Omdirigerer til Apple...' : 'Fortsæt med Apple'}
                    </span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={socialLoginLoading === 'facebook'}
                    className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    {socialLoginLoading === 'facebook' ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      {socialLoginLoading === 'facebook' ? 'Omdirigerer til Facebook...' : 'Fortsæt med Facebook'}
                    </span>
                  </button>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500 text-xs sm:text-sm">Eller med email</span>
                  </div>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Fulde navn</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
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
                    Jeg accepterer{' '}
                    <button
                      type="button"
                      onClick={() => setShowTerms(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      vilkår og betingelser
                    </button>{' '}
                    og{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacy(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      privatlivspolitik
                    </button>
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

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-sm sm:max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Vilkår & Betingelser</h2>
                <button
                  onClick={() => setShowTerms(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">1. Brug af platformen</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• Du må ikke misbruge platformen, sende spam eller dele falske oplysninger</p>
                    <p>• Alle brugere skal tale pænt og respektfuldt til hinanden</p>
                    <p>• Chikane, mobning eller krænkende adfærd tolereres ikke</p>
                    <p>• Giv altid korrekte og ærlige oplysninger i dine opslag</p>
                    <p>• Professionel adfærd forventes i alle arbejdsrelaterede samtaler</p>
                    <p>• Undgå gentagne eller irrelevante opslag (spam)</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">2. Gratis platform</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• Privat Rengøring er helt gratis at bruge</p>
                    <p>• Alle funktioner er tilgængelige uden betaling</p>
                    <p>• Ingen skjulte gebyrer eller abonnementer</p>
                    <p>• Du betaler kun for de rengøringsservices du aftaler med andre brugere</p>
                    <p>• Platformen tjener penge via reklamer og partnerskaber</p>
                    <p>• Vi tager ikke kommission af dine aftaler</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">3. Ansvar og garanti</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• Vi er kun en platform der forbinder brugere</p>
                    <p>• Brugere er selv ansvarlige for deres aftaler</p>
                    <p>• Vi garanterer ikke kvaliteten af udførte services</p>
                    <p>• Sørg selv for passende forsikring ved arbejde</p>
                    <p>• Tvister løses mellem de involverede parter</p>
                    <p>• Dokumenter altid aftaler skriftligt</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">4. Persondata (GDPR)</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• Vi indsamler kun oplysninger du selv oplyser</p>
                    <p>• Dine data deles ikke med tredjeparter uden samtykke</p>
                    <p>• Du kan altid ændre eller slette dine oplysninger</p>
                    <p>• Kontakt support@privatrengoring.dk for dataindsigt</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">5. Kontakt og support</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• Email: support@privatrengoring.dk</p>
                    <p>• Svartid: 24-48 timer på hverdage</p>
                    <p>• Rapporter problemer via app eller email</p>
                  </div>
                </section>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTerms(false)}
                  className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                >
                  Luk
                </button>
                <button
                  onClick={() => {
                    setAcceptedTerms(true);
                    setShowTerms(false);
                  }}
                  className="flex-1 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                >
                  Accepter & Luk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-sm sm:max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Privatlivspolitik</h2>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">1. Hvilke data indsamler vi?</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• Navn, email og telefonnummer (som du selv oplyser)</p>
                    <p>• Profilbillede og beskrivelse (valgfrit)</p>
                    <p>• Lokation (kun by/område, ikke præcis adresse)</p>
                    <p>• Dine opslag og kommentarer på platformen</p>
                    <p>• Brugsstatistikker (anonymiseret)</p>
                    <p>• IP-adresse og browser information (teknisk nødvendigt)</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">2. Hvordan bruger vi dine data?</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• At vise din profil til andre brugere</p>
                    <p>• At matche dig med relevante jobs i dit område</p>
                    <p>• At sende dig notifikationer (hvis du tillader det)</p>
                    <p>• At forbedre platformen og brugeroplevelsen</p>
                    <p>• At forhindre misbrug og spam</p>
                    <p>• At levere kundeservice og support</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">3. Dine rettigheder (GDPR)</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• Du kan altid ændre eller slette dine oplysninger</p>
                    <p>• Du kan anmode om indsigt i alle data vi har om dig</p>
                    <p>• Du kan slette din konto og alle data når som helst</p>
                    <p>• Vi deler aldrig dine data med tredjeparter uden samtykke</p>
                    <p>• Du kan trække samtykke tilbage når som helst</p>
                    <p>• Du kan klage til Datatilsynet hvis du er utilfreds</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">4. Cookies og tracking</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• Vi bruger kun nødvendige cookies til login og indstillinger</p>
                    <p>• Ingen tracking eller reklame cookies</p>
                    <p>• Du kan slå cookies fra i din browser</p>
                    <p>• Session cookies slettes når du lukker browseren</p>
                    <p>• Præference cookies husker dine indstillinger</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">5. Datasikkerhed</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• SSL kryptering af alle data</p>
                    <p>• Sikre servere i EU (GDPR compliance)</p>
                    <p>• Regelmæssige sikkerhedsopdateringer</p>
                    <p>• Begrænset adgang til persondata</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">6. Kontakt vedrørende persondata</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>• Email: privacy@privatrengoring.dk</p>
                    <p>• Eller: support@privatrengoring.dk</p>
                    <p>• Vi svarer inden for 30 dage (GDPR krav)</p>
                  </div>
                </section>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-t border-gray-200 flex-shrink-0">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                >
                  Luk
                </button>
                <button
                  onClick={() => {
                    setAcceptedTerms(true);
                    setShowPrivacy(false);
                  }}
                  className="flex-1 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                >
                  Accepter & Luk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}