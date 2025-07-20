import React, { useState, useEffect } from 'react';
import { Bell, Smartphone, Globe, Volume2, VolumeX, Check, X, Settings, AlertTriangle } from 'lucide-react';
import { notificationManager, NotificationTemplates } from '../lib/notifications';

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

export default function NotificationSettings({ isOpen, onClose, currentUser }: NotificationSettingsProps) {
  const [pushSupported, setPushSupported] = useState(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission>('default');
  const [pushSubscribed, setPushSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    messageAlerts: true,
    friendRequests: true,
    likes: false,
    comments: true,
    marketing: false,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00'
  });

  useEffect(() => {
    if (isOpen) {
      checkNotificationStatus();
    }
  }, [isOpen]);

  const checkNotificationStatus = async () => {
    const status = await notificationManager.getSubscriptionStatus();
    setPushSupported(status.supported);
    setPushPermission(status.permission);
    setPushSubscribed(status.subscribed);
  };

  const handleEnablePush = async () => {
    setLoading(true);
    try {
      // Initialize notification manager
      const initialized = await notificationManager.initialize();
      if (!initialized) {
        alert('Push notifikationer understøttes ikke på denne enhed');
        setLoading(false);
        return;
      }

      // Request permission
      const permission = await notificationManager.requestPermission();
      setPushPermission(permission);

      if (permission === 'granted') {
        // Subscribe to push notifications
        const subscription = await notificationManager.subscribeToPush();
        setPushSubscribed(!!subscription);
        
        if (subscription) {
          alert('Push notifikationer er nu aktiveret! 🔔');
          setSettings(prev => ({ ...prev, pushNotifications: true }));
        }
      } else {
        alert('Du skal give tilladelse til notifikationer for at aktivere push notifikationer');
      }
    } catch (error) {
      console.error('Failed to enable push notifications:', error);
      alert('Kunne ikke aktivere push notifikationer. Prøv igen.');
    }
    setLoading(false);
  };

  const handleDisablePush = async () => {
    setLoading(true);
    try {
      const unsubscribed = await notificationManager.unsubscribeFromPush();
      if (unsubscribed) {
        setPushSubscribed(false);
        setSettings(prev => ({ ...prev, pushNotifications: false }));
        alert('Push notifikationer er nu deaktiveret');
      }
    } catch (error) {
      console.error('Failed to disable push notifications:', error);
      alert('Kunne ikke deaktivere push notifikationer');
    }
    setLoading(false);
  };

  const handleTestNotification = async () => {
    try {
      await notificationManager.sendTestNotification();
    } catch (error) {
      console.error('Failed to send test notification:', error);
      alert('Kunne ikke sende test notifikation');
    }
  };

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

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
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Notifikation Indstillinger</h2>
            <p className="text-gray-600">Administrer hvordan du modtager notifikationer</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Push Notifications Status */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Push Notifikationer</h3>
                  <p className="text-sm text-blue-700">Modtag notifikationer direkte på din enhed</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  pushSubscribed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {pushSubscribed ? 'Aktiveret' : 'Deaktiveret'}
                </div>
              </div>
            </div>

            {!pushSupported && (
              <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-800">Push notifikationer understøttes ikke på denne enhed</span>
                </div>
              </div>
            )}

            {pushSupported && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">Browser support:</span>
                  <span className="text-sm font-medium text-green-600">✅ Understøttet</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">Tilladelse:</span>
                  <span className={`text-sm font-medium ${
                    pushPermission === 'granted' ? 'text-green-600' : 
                    pushPermission === 'denied' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {pushPermission === 'granted' ? '✅ Givet' : 
                     pushPermission === 'denied' ? '❌ Nægtet' : '⏳ Afventer'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">Status:</span>
                  <span className={`text-sm font-medium ${pushSubscribed ? 'text-green-600' : 'text-gray-600'}`}>
                    {pushSubscribed ? '✅ Tilmeldt' : '⭕ Ikke tilmeldt'}
                  </span>
                </div>

                <div className="flex space-x-2 pt-2">
                  {!pushSubscribed ? (
                    <button
                      onClick={handleEnablePush}
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
                    >
                      {loading ? 'Aktiverer...' : 'Aktiver Push Notifikationer'}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleTestNotification}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Send Test Notifikation
                      </button>
                      <button
                        onClick={handleDisablePush}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors duration-200"
                      >
                        Deaktiver
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Notification Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Notifikation Typer</h3>
            
            {/* Job Alerts */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Job Alerts</h4>
                <p className="text-sm text-gray-600">Nye jobs i dit område</p>
              </div>
              <button
                onClick={() => handleSettingChange('jobAlerts', !settings.jobAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.jobAlerts ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.jobAlerts ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Message Alerts */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Besked Alerts</h4>
                <p className="text-sm text-gray-600">Nye beskeder fra andre brugere</p>
              </div>
              <button
                onClick={() => handleSettingChange('messageAlerts', !settings.messageAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.messageAlerts ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.messageAlerts ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Friend Requests */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Venskabsanmodninger</h4>
                <p className="text-sm text-gray-600">Nye venskabsanmodninger</p>
              </div>
              <button
                onClick={() => handleSettingChange('friendRequests', !settings.friendRequests)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.friendRequests ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.friendRequests ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Comments */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Kommentarer</h4>
                <p className="text-sm text-gray-600">Kommentarer på dine opslag</p>
              </div>
              <button
                onClick={() => handleSettingChange('comments', !settings.comments)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.comments ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.comments ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Likes */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Likes</h4>
                <p className="text-sm text-gray-600">Når nogen liker dine opslag</p>
              </div>
              <button
                onClick={() => handleSettingChange('likes', !settings.likes)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.likes ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.likes ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Quiet Hours */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-gray-900">Stille Timer</h4>
                <p className="text-sm text-gray-600">Ingen notifikationer i disse timer</p>
              </div>
              <button
                onClick={() => handleSettingChange('quietHours', !settings.quietHours)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.quietHours ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.quietHours ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {settings.quietHours && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fra</label>
                  <input
                    type="time"
                    value={settings.quietStart}
                    onChange={(e) => handleSettingChange('quietStart', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Til</label>
                  <input
                    type="time"
                    value={settings.quietEnd}
                    onChange={(e) => handleSettingChange('quietEnd', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Platform Specific Info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-3">📱 Platform Specifikke Indstillinger</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <span>🍎</span>
                <span><strong>iPhone/iPad:</strong> Notifikationer vises i Notification Center og på låseskærm</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🤖</span>
                <span><strong>Android:</strong> Notifikationer vises i notification drawer med vibration</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💻</span>
                <span><strong>Desktop:</strong> Browser notifikationer i hjørnet af skærmen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Indstillinger gemmes automatisk
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Færdig
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}