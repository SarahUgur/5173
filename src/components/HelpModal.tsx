import React, { useState } from 'react';
import { X, HelpCircle, MessageCircle, Book, Video, Phone, Mail, Search, ChevronRight } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Kom i gang',
      icon: Book,
      color: 'blue',
      items: [
        'Hvordan opretter jeg en profil?',
        'Hvordan finder jeg rengøringsjobs?',
        'Hvordan ansøger jeg om et job?',
        'Hvordan opretter jeg et job opslag?'
      ]
    },
    {
      id: 'account',
      title: 'Min konto',
      icon: MessageCircle,
      color: 'green',
      items: [
        'Hvordan ændrer jeg mine oplysninger?',
        'Hvordan uploader jeg profilbillede?',
        'Hvordan sletter jeg min konto?',
        'Hvordan ændrer jeg adgangskode?'
      ]
    },
    {
      id: 'subscription',
      title: 'Pro abonnement',
      icon: Video,
      color: 'purple',
      items: [
        'Hvad får jeg med Pro?',
        'Hvordan opgraderer jeg til Pro?',
        'Hvordan opsiger jeg mit abonnement?',
        'Hvordan får jeg refund?'
      ]
    },
    {
      id: 'jobs',
      title: 'Jobs & Opgaver',
      icon: HelpCircle,
      color: 'orange',
      items: [
        'Hvordan kommunikerer jeg med kunder?',
        'Hvordan sætter jeg mine priser?',
        'Hvad gør jeg ved problemer?',
        'Hvordan får jeg bedre ratings?'
      ]
    },
    {
      id: 'technical',
      title: 'Teknisk hjælp',
      icon: Phone,
      color: 'red',
      items: [
        'Appen virker ikke korrekt',
        'Jeg kan ikke logge ind',
        'Notifikationer virker ikke',
        'Problemer med betaling'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      red: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

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
            <p className="text-gray-600">Få hjælp til at bruge Privat Rengøring platformen</p>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Søg efter hjælp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!activeCategory ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {helpCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`p-4 rounded-lg border-2 text-left hover:shadow-md transition-all duration-200 ${getColorClasses(category.color)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-6 h-6" />
                      <div>
                        <h3 className="font-semibold">{category.title}</h3>
                        <p className="text-sm opacity-75">{category.items.length} artikler</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
              >
                <span>←</span>
                <span>Tilbage til kategorier</span>
              </button>
              
              {(() => {
                const category = helpCategories.find(cat => cat.id === activeCategory);
                return category ? (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                    <div className="space-y-3">
                      {category.items.map((item, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">{item}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">Kan du ikke finde svar på dit spørgsmål?</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Mail className="w-4 h-4" />
                <span>Send email</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <MessageCircle className="w-4 h-4" />
                <span>Live chat</span>
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Kundeservice: support@privatrengoring.dk | Telefon: +45 12 34 56 78
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}