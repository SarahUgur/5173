import React, { useState } from 'react';
import { X, Bell, MessageCircle, Briefcase, Users, Calendar, Check, Trash2, Settings } from 'lucide-react';
import NotificationSettings from './NotificationSettings';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

interface Notification {
  id: string;
  type: 'message' | 'job' | 'connection' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
}

export default function NotificationModal({ isOpen, onClose, currentUser }: NotificationModalProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<'all' | 'unread' | 'message' | 'job'>('all');

  // Load notifications from API
  React.useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      // Mock notifications for demo
      const mockNotifications = [
        {
          id: '1',
          type: 'job',
          title: 'Nyt job i dit område',
          message: 'Hjemmerengøring i København NV - 350 kr',
          time: '5 min siden',
          read: false,
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        {
          id: '2',
          type: 'message',
          title: 'Ny besked fra Lars Nielsen',
          message: 'Hej! Er du interesseret i rengøringsjobbet?',
          time: '10 min siden',
          read: false,
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        {
          id: '3',
          type: 'connection',
          title: 'Ny venskabsanmodning',
          message: 'Peter Larsen vil gerne forbinde med dig',
          time: '1 time siden',
          read: true,
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        {
          id: '4',
          type: 'system',
          title: 'Velkommen til PRIVATE RENGØRING',
          message: 'Tak for at du blev medlem! Udforsk alle funktionerne.',
          time: '2 dage siden',
          read: true
        }
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
      // Set empty array on error
      setNotifications([]);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageCircle;
      case 'job': return Briefcase;
      case 'connection': return Users;
      case 'system': return Bell;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-600 bg-blue-100';
      case 'job': return 'text-green-600 bg-green-100';
      case 'system': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const markAsRead = async (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = async () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = async (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative p-4 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex items-center justify-between pr-12">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Notifikationer</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600">{unreadCount} ulæste</p>
              )}
            </div>
            <button
              onClick={() => {
                setShowSettings(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title="Notifikation indstillinger"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 mt-4 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                filter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Alle
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                filter === 'unread' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Ulæste
            </button>
            <button
              onClick={() => setFilter('job')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                filter === 'job' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              Jobs
            </button>
          </div>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="p-3 border-b border-gray-100 flex-shrink-0">
            <button
              onClick={markAllAsRead}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
            >
              <Check className="w-4 h-4" />
              <span>Marker alle som læst</span>
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Indlæser notifikationer...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen notifikationer</h3>
              <p className="text-gray-600">Du har ingen notifikationer at vise.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 pb-4">
              {filteredNotifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-3 hover:bg-gray-50 transition-colors duration-200 ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-xs font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-1">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-0.5 hover:bg-gray-200 rounded-full transition-colors duration-200"
                                title="Marker som læst"
                              >
                                <Check className="w-3 h-3 text-gray-600" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-0.5 hover:bg-gray-200 rounded-full transition-colors duration-200"
                              title="Slet notifikation"
                            >
                              <Trash2 className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full absolute right-3 top-4"></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            onClick={() => {
              setShowSettings(true);
            }}
            className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Administrer notifikation indstillinger
          </button>
        </div>

        {/* Notification Settings Modal */}
        <NotificationSettings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}