import React, { useState } from 'react';
import { X, Bell, MessageCircle, Briefcase, Users, Calendar, Check, Trash2, Settings } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
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

export default function NotificationModal({ isOpen, onClose, onOpenSettings }: NotificationModalProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'job',
      title: 'Nyt job i dit område',
      message: 'Hjemmerengøring i København NV - 350 kr. Klik for at se detaljer.',
      time: '5 min siden',
      read: false,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '2',
      type: 'message',
      title: 'Ny besked fra Lars Nielsen',
      message: 'Tak for dit opslag! Jeg er interesseret i jobbet...',
      time: '1 time siden',
      read: false
    },
    {
      id: '3',
      type: 'system',
      title: 'Maria Hansen likede dit opslag',
      message: 'Maria Hansen reagerede med ❤️ på dit opslag om kontorrengøring.',
      time: '2 timer siden',
      read: false,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '4',
      type: 'system',
      title: 'Dit opslag blev delt',
      message: 'Sofie Andersen delte dit opslag på Facebook.',
      time: '3 timer siden',
      read: true,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '5',
      type: 'connection',
      title: 'Peter Hansen vil forbinde',
      message: 'Peter Hansen har sendt dig en venskabsanmodning.',
      time: '4 timer siden',
      read: true,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '6',
      type: 'system',
      title: 'Du blev tagget i en kommentar',
      message: 'Anna Nielsen taggede dig i en kommentar: "@DitNavn har du erfaring med dette?"',
      time: '5 timer siden',
      read: false,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '7',
      type: 'job',
      title: 'Nyt job tæt på dig',
      message: 'Hovedrengøring i Østerbro - 2.500 kr. Kun 1.2 km fra dig!',
      time: '6 timer siden',
      read: true
    },
    {
      id: '8',
      type: 'system',
      title: 'Kommentar på dit opslag',
      message: 'Michael Sørensen kommenterede: "Hvor lang tid tager denne type rengøring?"',
      time: '1 dag siden',
      read: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'message' | 'job'>('all');

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
      case 'connection': return 'text-purple-600 bg-purple-100';
      case 'system': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
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
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-4 border-b border-gray-200">
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
                onOpenSettings();
                onClose();
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
          <div className="p-4 border-b border-gray-100">
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
        <div className="overflow-y-auto max-h-[50vh] lg:max-h-[60vh]">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen notifikationer</h3>
              <p className="text-gray-600">Du har ingen notifikationer at vise.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                                title="Marker som læst"
                              >
                                <Check className="w-4 h-4 text-gray-600" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                              title="Slet notifikation"
                            >
                              <Trash2 className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full absolute right-4 top-6"></div>
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
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => {
              onOpenSettings();
              onClose();
            }}
            className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Administrer notifikation indstillinger
          </button>
        </div>
      </div>
    </div>
  );
}