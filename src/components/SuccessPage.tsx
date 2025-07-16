import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';

interface SuccessPageProps {
  onContinue: () => void;
}

export default function SuccessPage({ onContinue }: SuccessPageProps) {
  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      onContinue();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Velkommen til Pro!</h1>
        
        <p className="text-gray-600 mb-6">
          Din betaling er gennemført, og du har nu fuld adgang til alle Pro-funktioner på Privat Rengøring.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-gray-900">Pro Medlem</span>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-sm text-gray-600">Du kan nu like, kommentere og sende beskeder til alle brugere</p>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>Fortsæt til Privat Rengøring</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-gray-500 mt-4">
          Du vil automatisk blive omdirigeret om 5 sekunder...
        </p>
      </div>
    </div>
  );
}