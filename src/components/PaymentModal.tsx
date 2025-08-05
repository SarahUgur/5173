import React from 'react';
import { X, CreditCard, Shield } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ingen Betaling Nødvendig</h2>
          <p className="text-gray-600">Private Rengøring er helt gratis</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Gratis for Alle</h3>
            </div>
            <p className="text-blue-800 text-sm">
              Du betaler kun for de rengøringsservices du aftaler direkte med andre brugere. 
              Platformen tager ingen kommission eller gebyrer.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Forstået - Fortsæt Gratis
          </button>
        </div>
      </div>
    </div>
  );
}