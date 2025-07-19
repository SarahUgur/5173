import React, { useState } from 'react';
import { X, User, Bell, Globe, Shield, CreditCard, Smartphone, Mail, MessageCircle, Calendar, Volume2, VolumeX, FileText, LogOut, HelpCircle, Activity, Ban, Heart, Star, Share2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onUpdateUser: (updates: any) => void;
  onPageChange?: (page: string) => void;
}

export default function SettingsModal({ isOpen, onClose, currentUser, onUpdateUser, onPageChange }: SettingsModalProps) {
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
    soundEnabled: true,
    
    // Online status
    showOnlineStatus: true,
    appearOffline: false
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[98vh] sm:h-[95vh] lg:max-h-[90vh] overflow-hidden shadow-strong animate-fadeIn">
        {/* Header */}
        <div className="relative p-3 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          
          <h2 className="text-xl sm:text-2xl font-bold gradient-text pr-12">Indstillinger</h2>
          <p className="text-sm sm:text-base text-gray-600">Administrer dine konto- og app-indstillinger</p>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-16 sm:w-20 lg:w-64 border-r border-gray-200 p-1 sm:p-2 lg:p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex flex-col sm:flex-row lg:flex-row items-center lg:space-x-3 space-y-1 sm:space-y-0 lg:space-y-0 px-1 sm:px-2 lg:px-3 py-2 rounded-lg text-left transition-all duration-200 hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium hidden lg:block">{tab.label}</span>
                  <span className="text-xs font-medium lg:hidden text-center leading-tight">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-2 sm:p-3 lg:p-6 overflow-y-auto max-h-[60vh] lg:max-h-[70vh]">
            {activeTab === 'profile' && (
              <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Profil Information</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Navn</label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => updateSetting('name', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => updateSetting('phone', e.target.value)}
                      placeholder="+45 12 34 56 78"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Lokation</label>
                    <input
                      type="text"
                      value={settings.location}
                      onChange={(e) => updateSetting('location', e.target.value)}
                      placeholder="København, Danmark"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={settings.bio}
                    onChange={(e) => updateSetting('bio', e.target.value)}
                    rows={2}
                    placeholder="Fortæl lidt om dig selv..."
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-all duration-200"
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full ${settings.appearOffline ? 'bg-gray-400' : 'bg-green-500'}`}></div>
                      <div>
                        <p className="font-medium text-gray-900">Online Status</p>
                        <p className="text-sm text-gray-600">Vis dig som online for andre brugere</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('appearOffline', !settings.appearOffline)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        !settings.appearOffline ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        !settings.appearOffline ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xs">👁️</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Vis Online Status</p>
                        <p className="text-sm text-gray-600">Andre kan se når du er online</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateSetting('showOnlineStatus', !settings.showOnlineStatus)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.showOnlineStatus ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
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
                    <button 
                      onClick={() => window.location.href = 'mailto:support@privatrengoring.dk?subject=Opsigelse af Pro Abonnement&body=Hej Support Team,%0D%0A%0D%0AJeg ønsker at opsige mit Pro abonnement.%0D%0A%0D%0AKonto email: ' + encodeURIComponent(currentUser?.email || '') + '%0D%0A%0D%0AMed venlig hilsen'}
                      className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium underline"
                    >
                      📧 Opsig via Email Support
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
                
                {/* FAQ Section */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">Ofte Stillede Spørgsmål</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium text-blue-900 mb-2">Hvordan sletter jeg mit opslag?</h5>
                      <p className="text-sm text-blue-700">Klik på "..." menuen på dit opslag og vælg "Slet opslag". Dette kan ikke fortrydes.</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium text-blue-900 mb-2">Hvordan fjerner jeg min kommentar?</h5>
                      <p className="text-sm text-blue-700">Klik på "..." ved din kommentar og vælg "Slet kommentar". Kun du kan slette dine egne kommentarer.</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium text-blue-900 mb-2">Hvordan skjuler jeg mit opslag midlertidigt?</h5>
                      <p className="text-sm text-blue-700">Gå til "Indstillinger" → "Privatliv" og aktivér "Privat Konto" for at skjule alle dine opslag.</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium text-blue-900 mb-2">Hvad er forskellen på Pro og gratis?</h5>
                      <p className="text-sm text-blue-700">Pro giver ubegrænset likes, kommentarer, direkte beskeder og prioriteret visning for 29 kr/måned.</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium text-blue-900 mb-2">Hvordan finder jeg jobs i mit område?</h5>
                      <p className="text-sm text-blue-700">Gå til "Lokale Jobs" og brug lokationsfilter eller klik "Brug min lokation" for jobs tæt på dig.</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium text-blue-900 mb-2">Hvordan kontakter jeg en rengøringsekspert?</h5>
                      <p className="text-sm text-blue-700">Med Pro abonnement kan du klikke "Besked" på deres profil eller opslag for direkte kontakt.</p>
                    </div>
                  </div>
                </div>

                {/* Guide Section */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">Kom i Gang Guide</h4>
                  <div className="space-y-3">
                    <button 
                      onClick={() => onPageChange?.('local')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-green-100 transition-colors duration-200"
                    >
                      <h5 className="font-medium text-green-900 mb-1">🔍 Søg efter rengøringsjobs</h5>
                      <p className="text-sm text-green-700">Klik her for at gå til "Lokale Jobs" og finde arbejde i dit område</p>
                    </button>
                    <button 
                      onClick={() => onPageChange?.('network')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-green-100 transition-colors duration-200"
                    >
                      <h5 className="font-medium text-green-900 mb-1">👥 Byg dit netværk</h5>
                      <p className="text-sm text-green-700">Klik her for at forbinde med andre rengøringseksperter og kunder</p>
                    </button>
                    <button 
                      onClick={() => onPageChange?.('home')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-green-100 transition-colors duration-200"
                    >
                      <h5 className="font-medium text-green-900 mb-1">📝 Opret dit første opslag</h5>
                      <p className="text-sm text-green-700">Klik her for at gå til hjemmesiden og oprette et job opslag</p>
                    </button>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-green-100 transition-colors duration-200"
                    >
                      <h5 className="font-medium text-green-900 mb-1">⚙️ Udfyld din profil</h5>
                      <p className="text-sm text-green-700">Klik her for at gå til profil indstillinger og udfylde dine oplysninger</p>
                    </button>
                  </div>
                </div>

                {/* Contact Support */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-4">Kontakt Support</h4>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Mail className="w-6 h-6 text-purple-600" />
                      <div>
                        <h5 className="font-medium text-purple-900">Email Support</h5>
                        <p className="text-sm text-purple-700">Vi svarer inden for 24-48 timer</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.location.href = 'mailto:support@privatrengoring.dk?subject=Hjælp med Privat Rengøring&body=Hej Support Team,%0D%0A%0D%0AJeg har brug for hjælp med:%0D%0A%0D%0A[Beskriv dit problem her]%0D%0A%0D%0AMed venlig hilsen'}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                    >
                      📧 Send Email til Support
                    </button>
                    <p className="text-xs text-purple-600 mt-2 text-center">
                      support@privatrengoring.dk • Svar inden for 24-48 timer
                    </p>
                  </div>
                </div>

                {/* Account Deactivation */}
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-4">Deaktiver Konto</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium text-orange-900 mb-2">Midlertidig Deaktivering</h5>
                      <p className="text-sm text-orange-700 mb-3">
                        Din konto skjules, men alle data gemmes. Du kan aktivere igen ved at logge ind.
                      </p>
                      <button 
                        onClick={() => {
                          if (confirm('Er du sikker på at du vil deaktivere din konto midlertidigt? Du kan aktivere den igen ved at logge ind.')) {
                            alert('Din konto er nu deaktiveret. Log ind igen for at aktivere.');
                            // I en rigtig app ville dette opdatere brugerens status i databasen
                          }
                        }}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm"
                      >
                        Deaktiver Midlertidigt
                      </button>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <h5 className="font-medium text-red-900 mb-2">Permanent Deaktivering</h5>
                      <p className="text-sm text-red-700 mb-3">
                        Din konto og alle data slettes permanent. Dette kan IKKE fortrydes.
                      </p>
                      <button 
                        onClick={() => {
                          const confirmation = prompt('Skriv "SLET PERMANENT" for at bekræfte permanent sletning:');
                          if (confirmation === 'SLET PERMANENT') {
                            alert('Din konto vil blive slettet permanent inden for 24 timer. Kontakt support hvis du fortryder.');
                            // I en rigtig app ville dette starte sletningsprocessen
                          } else if (confirmation !== null) {
                            alert('Forkert bekræftelse. Konto ikke slettet.');
                          }
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                      >
                        Slet Permanent
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 sm:p-3 lg:p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-3 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 text-sm sm:text-base hover:scale-105"
            >
              Annuller
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto btn-primary text-white px-3 sm:px-6 py-2 rounded-lg text-sm sm:text-base hover:scale-105"
            >
              Gem Ændringer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}