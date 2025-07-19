import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building, Users, CheckCircle } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isLogin) {
      // Check for admin login
      if (email === 'admin@privatrengoring.dk' && password === 'admin123') {
        const adminUser: UserType = {
          id: 'admin',
          name: 'Admin',
          email: 'admin@privatrengoring.dk',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          userType: 'professional',
          verified: true,
          isSubscribed: true,
          location: 'København',
          rating: 5.0,
          completedJobs: 0,
          joinedDate: 'Januar 2024'
        };
        onLogin(adminUser);
        setLoading(false);
        return;
      }

      // Find existing user
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        onLogin(existingUser);
      } else {
        alert('Bruger ikke fundet. Prøv at oprette en konto.');
      }
    } else {
      // Create new user
      const newUser: UserType = {
        id: Date.now().toString(),
        name,
        email,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        userType,
        verified: false,
        isSubscribed: false,
        location: 'Danmark',
        rating: 0,
        completedJobs: 0,
        joinedDate: 'Nu'
      };
      onLogin(newUser);
    }
    setLoading(false);
  };

  const userTypes = [
    { id: 'private', label: 'Privat person', icon: User, description: 'Jeg har brug for rengøring' },
    { id: 'professional', label: 'Professionel', icon: CheckCircle, description: 'Jeg tilbyder rengøringsservice' },
    { id: 'small_business', label: 'Lille virksomhed', icon: Building, description: '1-10 medarbejdere' },
    { id: 'large_business', label: 'Stor virksomhed', icon: Users, description: '10+ medarbejdere' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Privat Rengøring</h1>
            <p className="text-blue-100">Danmarks største platform for rengøring</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <div className="flex mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  isLogin ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Log ind
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  !isLogin ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Opret konto
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fulde navn</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Dit fulde navn"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="din@email.dk"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adgangskode</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Din adgangskode"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Jeg er...</label>
                  <div className="space-y-2">
                    {userTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setUserType(type.id as any)}
                          className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                            userType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className={`w-5 h-5 ${
                              userType === type.id ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                            <div>
                              <div className={`font-medium ${
                                userType === type.id ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {type.label}
                              </div>
                              <div className={`text-sm ${
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
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Jeg accepterer{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      vilkår og betingelser
                    </a>{' '}
                    og{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      privatlivspolitik
                    </a>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (!isLogin && !acceptedTerms)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Vent venligst...' : isLogin ? 'Log ind' : 'Opret konto'}
              </button>
            </form>

            {isLogin && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Test konti:</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Admin: admin@privatrengoring.dk / admin123</div>
                  <div>Bruger: test@example.com / password</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}