import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Smartphone } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Din private adgangskode - skift denne til hvad du ønsker
  const ADMIN_PASSWORD = 'Allah0103@';
  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simuler loading for bedre UX
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('isAuthenticated', 'true');
        onLogin();
      } else {
        setError('Forkert adgangskode. Prøv igen.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo og titel */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">PR</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Privat Rengøring</h1>
          <p className="text-gray-600">Admin Adgang</p>
        </div> 
  

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Adgangskode
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Indtast din adgangskode"
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

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verificerer...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Log Ind</span>
              </>
            )}
          </button>
        </form>

        {/* Mobile installation hint */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">Installer på mobil</span>
          </div>
          <p className="text-sm text-blue-700">
            Tryk på "Del" knappen i din browser og vælg "Tilføj til hjemmeskærm" for at installere appen på din mobil.
          </p>
        </div>
      </div>
    </div>
  );
}