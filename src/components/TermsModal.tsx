import React from 'react';
import { X, Shield, FileText, Lock, Globe } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vilkår & Betingelser</h2>
            <p className="text-gray-600">Sidst opdateret: 20. januar 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {/* Introduction */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Introduktion</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Velkommen til Private Rengøring. Ved at bruge vores platform accepterer du følgende vilkår og betingelser.
              </p>
            </div>

            {/* Platform Usage */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Brug af Platformen</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Tilladt brug:</h4>
                  <ul className="space-y-1 text-green-800 text-sm">
                    <li>• Opret ærlige og nøjagtige profiler</li>
                    <li>• Post legitime rengøringsjobs og tilbud</li>
                    <li>• Kommuniker respektfuldt med andre brugere</li>
                    <li>• Følg alle gældende love og regler</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Forbudt brug:</h4>
                  <ul className="space-y-1 text-red-800 text-sm">
                    <li>• Spam, falske oplysninger eller svindel</li>
                    <li>• Chikane, trusler eller upassende adfærd</li>
                    <li>• Brug af platformen til ulovlige aktiviteter</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Persondata (GDPR)</h3>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Dine rettigheder:</h4>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• Du kan altid ændre eller slette dine oplysninger</li>
                  <li>• Du kan anmode om indsigt i alle data vi har om dig</li>
                  <li>• Du kan slette din konto og alle data når som helst</li>
                  <li>• Vi deler aldrig dine data med tredjeparter uden samtykke</li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Kontakt</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-2">Har du spørgsmål til vilkårene?</p>
                <p className="text-blue-600">support@privaterengoring.dk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Forstået
          </button>
        </div>
      </div>
    </div>
  );
}