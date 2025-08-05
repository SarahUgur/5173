import React from 'react';
import { X, HelpCircle, Book, Video, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  const helpTopics = [
    {
      id: 'getting-started',
      title: 'Kom i gang',
      icon: Book,
      description: 'Lær hvordan du bruger Private Rengøring',
      items: [
        'Opret din profil',
        'Find dit første job',
        'Kommuniker sikkert',
        'Byg dit netværk'
      ]
    },
    {
      id: 'safety',
      title: 'Sikkerhed',
      icon: Shield,
      description: 'Hold dig sikker på platformen',
      items: [
        'Verificer andre brugere',
        'Rapporter problemer',
        'Beskyt dine data',
        'Sikre betalinger'
      ]
    },
    {
      id: 'features',
      title: 'Funktioner',
      icon: HelpCircle,
      description: 'Udnyt alle platformens muligheder',
      items: [
        'Opret job opslag',
        'Brug kort funktionen',
        'Planlæg aftaler',
        'Administrer beskeder'
      ]
    }
  ];

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
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hjælp & Support</h2>
            <p className="text-gray-600">Find svar på dine spørgsmål</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {helpTopics.map((topic) => {
              const IconComponent = topic.icon;
              return (
                <div key={topic.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-600">{topic.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {topic.items.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:support@privaterengoring.dk"
              className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-medium text-blue-900">Email Support</h4>
                <p className="text-sm text-blue-700">support@privaterengoring.dk</p>
              </div>
            </a>

            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <MessageCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Live Chat</h4>
                <p className="text-sm text-green-700">Øjeblikkelig hjælp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Fandt du ikke svar på dit spørgsmål?</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Kontakt Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}