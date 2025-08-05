import React from 'react';
import { X, Crown, Check, Star } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
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
          
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Private Rengøring er Gratis!</h2>
          <p className="text-gray-600">Alle funktioner er tilgængelige uden betaling</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              100% Gratis Platform
            </h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Alle funktioner inkluderet</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Ingen skjulte gebyrer</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Ingen abonnementer</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Ingen kommission på jobs</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Private Rengøring finansieres via reklamer og partnerskaber, 
              så du kan bruge alle funktioner gratis!
            </p>
            
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Fortsæt med Gratis Adgang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}