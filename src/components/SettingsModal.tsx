import React, { useState } from 'react';
import { X, User, Bell, Globe, Shield, CreditCard, Smartphone, Mail, MessageCircle, Calendar, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onUpdateUser: (updates: any) => void;
}

export default function SettingsModal({ isOpen, onClose, currentUser, onUpdateUser }: SettingsModalProps) {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profil indstillinger
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
    bio: currentUser?.bio || '',
    
    // Notifikation indstillinger
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    messageAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,
    
    // Privacy indstillinger
    profileVisibility: 'public',
    showPhone: false,
    showEmail: false,
    allowDirectMessages: true,
    
    // App indstillinger
    theme: 'light',
    language: language,
    autoRefresh: true,
    soundEnabled: true
  });

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateUser({
      ...currentUser,
      name: settings.name,
      email: settings.email,
      phone: settings.phone,
      location: settings.location,
      bio: settings.bio,
      settings: settings
    });
    onClose();
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSetting('pushNotifications', true);
        // Test notifikation
        new Notification('Privat Rengøring', {
          body: 'Notifikationer er nu aktiveret!',
          icon: '/icon-192.png'
        });
      }
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifikationer', icon: Bell },
    { id: 'privacy', label: 'Privatliv', icon: Shield },
    { id: 'app', label: 'App', icon: Smartphone },
    { id: 'subscription', label: 'Abonnement', icon: CreditCard }
  ];

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
          
          <h2 className="text-2xl font-bold text-gray-900">Indstillinger</h2>
          <p className="text-gray-600">Administrer dine konto- og app-indstillinger</p>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Profil Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Navn</label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => updateSetting('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => updateSetting('phone', e.target.value)}
                      placeholder="+45 12 34 56 78"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lokation</label>
                    <input
                      type="text"
                      value={settings.location}
                      onChange={(e) => updateSetting('location', e.target.value)}
                      placeholder="København, Danmark"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={settings.bio}
                    onChange={(e) => updateSetting('bio', e.target.value)}
                    rows={3}
                    placeholder="Fortæl lidt om dig selv..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Notifikation Indstillinger</h3>
                
                {/* Push Notifikationer */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Push Notifikationer</span>
                    </div>
                    <button
                      onClick={() => settings.pushNotifications ? updateSetting('pushNotifications', false) : requestNotificationPermission()}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <p className="text-sm text-blue-700">Modtag notifikationer direkte på din enhed</p>
                </div>

                {/* Email Notifikationer */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Email Notifikationer</p>
                        <p className="text-sm text-gray-600">Modtag vigtige opdateringer via email</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifikationer</p>
                        <p className="text-sm text-gray-600">Modtag vigtige beskeder via SMS</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('smsNotifications', !settings.smsNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Job Alerts</p>
                        <p className="text-sm text-gray-600">Få besked om nye jobs i dit område</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('jobAlerts', !settings.jobAlerts)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.jobAlerts ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.jobAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Privatliv & Sikkerhed</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profil Synlighed</label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="public">Offentlig</option>
                      <option value="private">Privat</option>
                      <option value="friends">Kun forbindelser</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Vis telefonnummer</p>
                      <p className="text-sm text-gray-600">Andre kan se dit telefonnummer</p>
                    </div>
                    <button
                      onClick={() => updateSetting('showPhone', !settings.showPhone)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.showPhone ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showPhone ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Tillad direkte beskeder</p>
                      <p className="text-sm text-gray-600">Andre kan sende dig private beskeder</p>
                    </div>
                    <button
                      onClick={() => updateSetting('allowDirectMessages', !settings.allowDirectMessages)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.allowDirectMessages ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.allowDirectMessages ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'app' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">App Indstillinger</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sprog</label>
                    <select
                      value={settings.language}
                      onChange={(e) => {
                        updateSetting('language', e.target.value);
                        setLanguage(e.target.value as any);
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                    <select
                      value={settings.theme}
                      onChange={(e) => updateSetting('theme', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Lyst</option>
                      <option value="dark">Mørkt</option>
                      <option value="auto">Automatisk</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-gray-600" /> : <VolumeX className="w-5 h-5 text-gray-600" />}
                      <div>
                        <p className="font-medium text-gray-900">Lyde</p>
                        <p className="text-sm text-gray-600">Afspil lyde for notifikationer</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Abonnement</h3>
                
                {currentUser?.isSubscribed ? (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-green-900">Pro Medlem</span>
                    </div>
                    <p className="text-green-700 mb-4">Du har fuld adgang til alle funktioner</p>
                    <div className="space-y-2 text-sm text-green-700">
                      <p>• Næste betaling: 15. februar 2024</p>
                      <p>• Beløb: 29 kr/måned</p>
                      <p>• Status: Aktiv</p>
                    </div>
                    <button className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium">
                      Opsig abonnement
                    </button>
                  </div>
                ) : (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Gratis Bruger</h4>
                    <p className="text-blue-700 mb-4">Opgrader til Pro for fuld adgang</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Opgrader til Pro
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="mb-4">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">Yderligere handlinger</p>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    // I en rigtig app ville dette downloade brugerdata
                    const userData = {
                      name: currentUser?.name,
                      email: currentUser?.email,
                      joinDate: new Date().toISOString(),
                      posts: 'Alle dine opslag og kommentarer',
                      connections: 'Dine netværksforbindelser'
                    };
                    const dataStr = JSON.stringify(userData, null, 2);
                    const dataBlob = new Blob([dataStr], {type: 'application/json'});
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'mine-data.json';
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-3 text-left hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-700 border border-gray-300"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Download mine data (GDPR)</span>
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center justify-center space-x-2 p-3 text-left hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600 border border-red-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Slet min konto permanent</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Annuller
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Gem Ændringer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}