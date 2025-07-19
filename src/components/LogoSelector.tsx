import React, { useState } from 'react';
import { Sparkles, Home, Zap, Star, Shield, Droplets, Wind, Brush, Scissors, Leaf } from 'lucide-react';

interface LogoSelectorProps {
  onSelectLogo: (logoType: string, logoSvg: string) => void;
  currentLogo?: string;
}

export default function LogoSelector({ onSelectLogo, currentLogo }: LogoSelectorProps) {
  const [selectedLogo, setSelectedLogo] = useState(currentLogo || 'sparkles');

  const logoOptions = [
    {
      id: 'sparkles',
      name: 'Sparkles (Nuværende)',
      description: 'Rengørings gnister - symboliserer renlighed',
      icon: Sparkles,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
        <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
        <path d="M5 15L5.5 17L7.5 17.5L5.5 18L5 20L4.5 18L2.5 17.5L4.5 17L5 15Z"/>
      </svg>`,
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 'home-clean',
      name: 'Hjem Rengøring',
      description: 'Hus med rengørings effekt',
      icon: Home,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        <circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="20" cy="8" r="1" fill="currentColor" opacity="0.5"/>
        <circle cx="16" cy="8" r="1" fill="currentColor" opacity="0.5"/>
      </svg>`,
      gradient: 'from-green-600 to-blue-600'
    },
    {
      id: 'lightning-clean',
      name: 'Lynhurtig Rengøring',
      description: 'Lyn symboliserer hurtig service',
      icon: Zap,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        <circle cx="18" cy="6" r="1" fill="currentColor" opacity="0.6"/>
        <circle cx="20" cy="8" r="1" fill="currentColor" opacity="0.4"/>
        <circle cx="16" cy="4" r="1" fill="currentColor" opacity="0.4"/>
      </svg>`,
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'premium-star',
      name: 'Premium Stjerne',
      description: 'Stjerne for kvalitet og excellence',
      icon: Star,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>`,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'shield-trust',
      name: 'Tillid & Sikkerhed',
      description: 'Skjold symboliserer tillid og sikkerhed',
      icon: Shield,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>`,
      gradient: 'from-blue-700 to-indigo-800'
    },
    {
      id: 'water-drop',
      name: 'Vand Dråbe',
      description: 'Vand dråbe for rengøring og friskhed',
      icon: Droplets,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        <circle cx="12" cy="14" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.5"/>
      </svg>`,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'wind-fresh',
      name: 'Frisk Luft',
      description: 'Vind linjer for friskhed og renhed',
      icon: Wind,
      svg: `<svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
        <path d="M14.6 20.6A2 2 0 1 0 16 17H2"/>
        <circle cx="20" cy="12" r="1" fill="currentColor"/>
        <circle cx="18" cy="8" r="1" fill="currentColor" opacity="0.7"/>
        <circle cx="16" cy="16" r="1" fill="currentColor" opacity="0.7"/>
      </svg>`,
      gradient: 'from-teal-500 to-green-600'
    },
    {
      id: 'brush-clean',
      name: 'Rengørings Børste',
      description: 'Klassisk rengørings værktøj',
      icon: Brush,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z"/>
        <path d="M20.71 4.63l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/>
        <circle cx="18" cy="6" r="1" fill="currentColor" opacity="0.6"/>
        <circle cx="16" cy="8" r="1" fill="currentColor" opacity="0.4"/>
      </svg>`,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'eco-leaf',
      name: 'Miljøvenlig',
      description: 'Blad for miljøvenlig rengøring',
      icon: Leaf,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        <circle cx="15" cy="10" r="1" fill="currentColor" opacity="0.7"/>
        <circle cx="13" cy="12" r="1" fill="currentColor" opacity="0.5"/>
        <circle cx="17" cy="12" r="1" fill="currentColor" opacity="0.5"/>
      </svg>`,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'planet-clean',
      name: 'Planet Rengøring',
      description: 'Planet med ring og stjerner - global rengøring',
      icon: Star,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6" fill="currentColor"/>
        <ellipse cx="12" cy="12" rx="10" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.9"/>
        <ellipse cx="12" cy="12" rx="11" ry="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
        <circle cx="7" cy="7" r="0.8" fill="currentColor" opacity="0.8"/>
        <circle cx="17" cy="6" r="0.6" fill="currentColor" opacity="0.7"/>
        <circle cx="5" cy="17" r="0.5" fill="currentColor" opacity="0.6"/>
        <circle cx="19" cy="17" r="0.9" fill="currentColor" opacity="0.8"/>
        <circle cx="15" cy="9" r="0.4" fill="currentColor" opacity="0.5"/>
        <circle cx="9" cy="15" r="0.3" fill="currentColor" opacity="0.4"/>
      </svg>`,
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      id: 'diamond-luxury',
      name: 'Luksus Diamant',
      description: 'Diamant for premium kvalitet',
      icon: Star,
      svg: `<svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 3h12l4 6-10 12L2 9l4-6z"/>
        <path d="M6 9l6 3 6-3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7"/>
        <path d="M12 12v10" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <circle cx="12" cy="7" r="1" fill="currentColor" opacity="0.8"/>
      </svg>`,
      gradient: 'from-purple-700 to-pink-700'
    }
  ];

  const handleLogoSelect = (logo: any) => {
    setSelectedLogo(logo.id);
    onSelectLogo(logo.id, logo.svg);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vælg Logo for Privat Rengøring</h2>
          <p className="text-gray-600">Klik på et logo for at se preview og vælge det</p>
        </div>

        {/* Logo Grid */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoOptions.map((logo) => (
              <div
                key={logo.id}
                onClick={() => handleLogoSelect(logo)}
                className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  selectedLogo === logo.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Logo Preview */}
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${logo.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <div 
                      className="w-10 h-10"
                      dangerouslySetInnerHTML={{ __html: logo.svg }}
                    />
                  </div>
                </div>

                {/* Logo Info */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">{logo.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{logo.description}</p>
                  
                  {/* Preview with Brand */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${logo.gradient} rounded-lg flex items-center justify-center`}>
                        <div 
                          className="w-5 h-5"
                          dangerouslySetInnerHTML={{ __html: logo.svg }}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Privat Rengøring</div>
                        <div className="text-xs text-gray-500">Social platform</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedLogo === logo.id && (
                  <div className="mt-3 flex items-center justify-center">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Valgt
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Vælg det logo der bedst repræsenterer din rengøringsvirksomhed
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Annuller
              </button>
              <button
                onClick={() => {
                  const selected = logoOptions.find(l => l.id === selectedLogo);
                  if (selected) {
                    handleLogoSelect(selected);
                    alert(`Logo "${selected.name}" er nu aktivt! Siden genindlæses...`);
                    setTimeout(() => window.location.reload(), 1000);
                  }
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Anvend Logo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}