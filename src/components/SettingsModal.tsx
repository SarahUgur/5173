import React, { useState } from 'react';
import { X, User, Bell, Shield, CreditCard, Globe, Moon, Sun, Volume2, VolumeX, Eye, EyeOff, Trash2, Download, Upload, Save } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onUpdateUser: (updates: any) => void;
}

export default function SettingsModal({ isOpen, onClose, currentUser, onUpdateUser }: SettingsModalProps) {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'subscription' | 'account'>('profile');
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    bio: currentUser?.bio || '',
    location: currentUser?.location || '',
    website: currentUser?.website || ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    onUpdateUser(formData);
    alert('Profil opdateret!');
  };

  const handleDeleteAccount = () => {
    if (confirm('Er du sikker på at du vil slette din konto? Dette kan ikke fortrydes.')) {
      alert('Konto slettet (demo)');
      onClose();
    }
  };

  const languages = [
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Indstillinger</h2>
          <p className="text-gray-600">Administrer din profil og præferencer</p>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profil</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'notifications' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span>Notifikationer</span>
              </button>
              
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'privacy' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Privatliv</span>
              </button>
              
              <button
                onClick={() => setActiveTab('subscription')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'subscription' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Abonnement</span>
              </button>
              
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === 'account' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Trash2 className="w-5 h-5" />
                <span>Konto</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Profil Indstillinger</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Navn</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lokation</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Fortæl kort om dig selv og dine rengøringsservices..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sprog</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Gem Ændringer</span>
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Notifikation Indstillinger</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Email notifikationer</h4>
                      <p className="text-sm text-gray-600">Modtag emails om nye jobs og beskeder</p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, email: !notifications.email})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Push notifikationer</h4>
                      <p className="text-sm text-gray-600">Modtag notifikationer i browseren</p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, push: !notifications.push})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.push ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Privatliv Indstillinger</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Profil synlig</h4>
                      <p className="text-sm text-gray-600">Andre kan se din profil</p>
                    </div>
                    <button
                      onClick={() => setPrivacy({...privacy, profileVisible: !privacy.profileVisible})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        privacy.profileVisible ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacy.profileVisible ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Tillad beskeder</h4>
                      <p className="text-sm text-gray-600">Andre kan sende dig direkte beskeder</p>
                    </div>
                    <button
                      onClick={() => setPrivacy({...privacy, allowMessages: !privacy.allowMessages})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        privacy.allowMessages ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacy.allowMessages ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Abonnement</h3>
                
                {currentUser?.isSubscribed ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-2">Pro Medlem</h4>
                    <p className="text-green-800 mb-4">Du har fuld adgang til alle Pro funktioner</p>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <h5 className="font-semibold text-green-900 mb-3">Dine Pro fordele:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-green-800">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Opret job opslag</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Ansøg om alle jobs</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Send direkte beskeder</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Like og gem opslag</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Del opslag på sociale medier</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Tilføj venner og netværk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Kommentere på opslag</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Verificeret profil badge</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Prioriteret visning</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Ingen reklamer</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h5 className="font-semibold text-blue-900 mb-2">Vil du opsige dit abonnement?</h5>
                      <p className="text-blue-800 text-sm mb-3">
                        Kontakt vores support team for at opsige dit Pro abonnement.
                      </p>
                      <a
                        href="mailto:support@privatrengoring.dk?subject=Opsigelse af Pro abonnement&body=Hej,%0A%0AJeg vil gerne opsige mit Pro abonnement.%0A%0AMit navn: [Dit navn]%0AMin email: [Din email]%0A%0ATak!"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                      >
                        📧 Kontakt Support for Opsigelse
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Gratis Medlem</h4>
                    <p className="text-blue-800 mb-4">Du kan kun se opslag, men ikke interagere</p>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <h5 className="font-semibold text-blue-900 mb-3">Hvad får du med Pro?</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-blue-800">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Opret job opslag</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Ansøg om alle jobs</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Send direkte beskeder</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Like og gem opslag</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Del opslag på sociale medier</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Tilføj venner og netværk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Kommentere på opslag</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Verificeret profil badge</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Prioriteret visning</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">✅</span>
                          <span>Ingen reklamer</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium">
                      Opgrader til Pro - 29 kr/måned
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Konto Administration</h3>
                
                <div className="space-y-4">
                  <button className="w-full flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Download className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Download mine data</div>
                      <div className="text-sm text-gray-600">Få en kopi af alle dine data</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full flex items-center space-x-3 p-4 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200 text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Slet konto</div>
                      <div className="text-sm">Permanent sletning af din konto</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}