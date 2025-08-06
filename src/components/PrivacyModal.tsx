import React from 'react';
import { X, Shield, Lock, Eye, Database, Mail } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Privatlivspolitik</h2>
            <p className="text-gray-600">Sidst opdateret: 20. januar 2024</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {/* Data Collection */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Database className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Hvilke Data Indsamler Vi</h3>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Navn, email og telefonnummer</li>
                  <li>• Profilbilleder og beskrivelser</li>
                  <li>• Lokationsoplysninger (kun hvis du deler dem)</li>
                  <li>• Beskeder og opslag du opretter</li>
                  <li>• Brugsstatistikker (anonymiseret)</li>
                </ul>
              </div>
            </div>

            {/* Data Usage */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Hvordan Bruger Vi Dine Data</h3>
              </div>
              <div className="space-y-3 text-gray-700 text-sm">
                <p>• <strong>Platform funktionalitet:</strong> For at levere vores tjenester</p>
                <p>• <strong>Kommunikation:</strong> For at forbinde dig med andre brugere</p>
                <p>• <strong>Sikkerhed:</strong> For at beskytte dig og andre brugere</p>
                <p>• <strong>Forbedringer:</strong> For at udvikle bedre funktioner</p>
              </div>
            </div>

            {/* Data Sharing */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Deling af Data</h3>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Vi deler ALDRIG dine data med:</h4>
                <ul className="space-y-1 text-green-800 text-sm">
                  <li>• Tredjeparter uden dit samtykke</li>
                  <li>• Marketingfirmaer</li>
                  <li>• Databrokers</li>
                  <li>• Sociale medier (uden din tilladelse)</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Dine Rettigheder (GDPR)</h3>
              </div>
              <div className="space-y-2 text-gray-700 text-sm">
                <p>• <strong>Ret til indsigt:</strong> Se alle data vi har om dig</p>
                <p>• <strong>Ret til rettelse:</strong> Ret forkerte oplysninger</p>
                <p>• <strong>Ret til sletning:</strong> Slet din konto og alle data</p>
                <p>• <strong>Ret til dataportabilitet:</strong> Få dine data i et læsbart format</p>
                <p>• <strong>Ret til indsigelse:</strong> Protest mod behandling af dine data</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Kontakt om Privatliv</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-2">Har du spørgsmål om dine data?</p>
                <p className="text-blue-600 font-medium">privacy@privaterengoring.dk</p>
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