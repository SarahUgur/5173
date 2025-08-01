import React, { useState } from 'react';
import { X, CreditCard, Shield, Check, Loader2 } from 'lucide-react';
import { stripePromise, createCheckoutSession } from '../lib/stripe';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userEmail: string;
}

export default function PaymentModal({ isOpen, onClose, onSuccess, userEmail }: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // For demo purposes, simulate successful payment
      setTimeout(() => {
        setIsLoading(false);
        onSuccess();
      }, 2000);
      
      // In production, use real Stripe:
      // const stripe = await stripePromise;
      // const session = await createCheckoutSession();
      // await stripe.redirectToCheckout({ sessionId: session.id });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Der opstod en fejl');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            disabled={isLoading}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Opgrader til PRIVATE RENGORING Pro</h2>
            <p className="text-gray-600">Få fuld adgang til alle funktioner</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">29</span>
              <div className="text-left">
                <div className="text-lg font-semibold text-gray-900">kr</div>
                <div className="text-sm text-gray-600">per måned</div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Ingen binding • Opsig når som helst</p>
          </div>
        </div>

        {/* Features */}
        <div className="p-6">
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Ubegrænset likes og kommentarer</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Direkte beskeder til alle brugere</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Prioriteret visning af dine opslag</span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Verificeret profil badge</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Behandler...</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>Sikker Betaling med Stripe</span>
              </>
            )}
          </button>
          
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span>SSL Krypteret</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="w-4 h-4 text-green-500" />
              <span>Øjeblikkelig adgang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}