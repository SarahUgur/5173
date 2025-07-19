import React, { useState } from 'react';
import { X, User, Bell, Globe, Shield, CreditCard, Smartphone, Mail, MessageCircle, Calendar, Volume2, VolumeX, FileText, LogOut, HelpCircle, Activity, Ban, Heart, Star, Share2 } from 'lucide-react';
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: '1',
      name: 'Spam Bruger',
      email: 'spam@example.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      blockedDate: '2024-01-10'
    },
    {
      id: '2', 
      name: 'Upassende Bruger',
      email: 'bad@example.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      blockedDate: '2024-01-08'
    }
  ]);
  
  const [userActivity] = useState({
    likedPosts: [
      { id: '1', title: 'Hjemmerengøring København', author: 'Maria Hansen', date: '2024-01-15' },
      { id: '2', title: 'Kontorrengøring Aarhus', author: 'Lars Nielsen', date: '2024-01-14' },
      { id: '3', title: 'Hovedrengøring Villa', author: 'Sofie Andersen', date: '2024-01-13' }
    ],
    comments: [
      { id: '1', postTitle: 'Hjemmerengøring København', comment: 'Jeg har erfaring med denne type rengøring...', date: '2024-01-15' },
      { id: '2', postTitle: 'Kontorrengøring Aarhus', comment: 'Hvad er timeprisen for dette job?', date: '2024-01-14' }
    ],
    savedPosts: [
      { id: '1', title: 'Rengøringstips til køkkenet', author: 'Expert Cleaner', date: '2024-01-12' },
      { id: '2', title: 'Bedste rengøringsprodukter 2024', author: 'Clean Pro', date: '2024-01-10' }
    ],
    sharedPosts: [
      { id: '1', title: 'Hjemmerengøring København', sharedTo: 'Facebook', date: '2024-01-14' }
    ]
  });
  
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
    showLocation: true,
    showActivity: true,
    showConnections: true,
    allowDirectMessages: true,
    privateAccount: false,
    
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

  const handleUnblockUser = (userId: string) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId));
    alert('Bruger er blevet fjernet fra blokeret liste');
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
    { id: 'activity', label: 'Min Aktivitet', icon: Activity },
    { id: 'blocked', label: 'Blokerede Brugere', icon: Ban },
    { id: 'notifications', label: 'Notifikationer', icon: Bell },
    { id: 'privacy', label: 'Privatliv', icon: Shield },
    { id: 'app', label: 'App', icon: Smartphone },
    { id: 'subscription', label: 'Abonnement', icon: CreditCard },
    { id: 'help', label: 'Hjælp', icon: HelpCircle }
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

            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Min Aktivitet</h3>
                
                {/* Liked Posts */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Likede Opslag ({userActivity.likedPosts.length})
                  </h4>
                  <div className="space-y-2">
                    {userActivity.likedPosts.map((post) => (
                      <div key={post.id} className="flex justify-between items-center p-2 bg-white rounded">
                        <div>
                          <p className="font-medium text-gray-900">{post.title}</p>
                          <p className="text-sm text-gray-600">af {post.author}</p>
                        </div>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Mine Kommentarer ({userActivity.comments.length})
                  </h4>
                  <div className="space-y-2">
                    {userActivity.comments.map((comment) => (
                      <div key={comment.id} className="p-2 bg-white rounded">
                        <p className="font-medium text-gray-900">{comment.postTitle}</p>
                        <p className="text-sm text-gray-700 italic">"{comment.comment}"</p>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved Posts */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Gemte Opslag ({userActivity.savedPosts.length})
                  </h4>
                  <div className="space-y-2">
                    {userActivity.savedPosts.map((post) => (
                      <div key={post.id} className="flex justify-between items-center p-2 bg-white rounded">
                        <div>
                          <p className="font-medium text-gray-900">{post.title}</p>
                          <p className="text-sm text-gray-600">af {post.author}</p>
                        </div>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shared Posts */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Delte Opslag ({userActivity.sharedPosts.length})
                  </h4>
                  <div className="space-y-2">
                    {userActivity.sharedPosts.map((post) => (
                      <div key={post.id} className="flex justify-between items-center p-2 bg-white rounded">
                        <div>
                          <p className="font-medium text-gray-900">{post.title}</p>
                          <p className="text-sm text-gray-600">Delt til {post.sharedTo}</p>
                        </div>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blocked' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Blokerede Brugere</h3>
                
                {blockedUsers.length > 0 ? (
                  <div className="space-y-3">
                    {blockedUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">Blokeret: {user.blockedDate}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleUnblockUser(user.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm"
                        >
                          Fjern Blokering
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Ban className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Ingen blokerede brugere</h4>
                    <p className="text-gray-600">Du har ikke blokeret nogen brugere endnu.</p>
                  </div>
                )}
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
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-blue-900">Privat Konto</p>
                        <p className="text-sm text-blue-700">Kun godkendte følgere kan se dine opslag</p>
                      </div>
                      <button
                        onClick={() => updateSetting('privateAccount', !settings.privateAccount)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.privateAccount ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.privateAccount ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

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
                      <p className="font-medium text-gray-900">Vis email adresse</p>
                      <p className="text-sm text-gray-600">Andre kan se din email adresse</p>
                    </div>
                    <button
                      onClick={() => updateSetting('showEmail', !settings.showEmail)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.showEmail ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showEmail ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Vis lokation</p>
                      <p className="text-sm text-gray-600">Andre kan se din lokation</p>
                    </div>
                    <button
                      onClick={() => updateSetting('showLocation', !settings.showLocation)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.showLocation ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showLocation ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Vis aktivitet</p>
                      <p className="text-sm text-gray-600">Andre kan se dine likes og kommentarer</p>
                    </div>
                    <button
                      onClick={() => updateSetting('showActivity', !settings.showActivity)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.showActivity ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showActivity ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Vis forbindelser</p>
                      <p className="text-sm text-gray-600">Andre kan se dine forbindelser</p>
                    </div>
                    <button
                      onClick={() => updateSetting('showConnections', !settings.showConnections)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.showConnections ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showConnections ? 'translate-x-6' : 'translate-x-1'
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

            {activeTab === 'help' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Hjælp & Support</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Ofte Stillede Spørgsmål</h4>
                    <p className="text-blue-700 mb-3">Find svar på de mest almindelige spørgsmål</p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Se FAQ →
                    </button>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Kom i Gang Guide</h4>
                    <p className="text-green-700 mb-3">Lær hvordan du bruger Privat Rengøring</p>
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      Se Guide →
                    </button>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Kontakt Support</h4>
                    <p className="text-purple-700 mb-3">Har du brug for personlig hjælp?</p>
                    <div className="space-y-2">
                      <button 
                        onClick={() => window.location.href = 'mailto:support@privatrengoring.dk'}
                        className="block w-full text-left text-purple-600 hover:text-purple-700 font-medium"
                      >
                        📧 support@privatrengoring.dk
                      </button>
                      <p className="text-sm text-purple-600">📞 +45 70 20 30 40</p>
                      <p className="text-sm text-purple-600">🕒 Man-Fre 9:00-17:00</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
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