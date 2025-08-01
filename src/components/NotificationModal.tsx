import React, { useState, useEffect } from 'react';
import { X, Bell, Check, Trash2, User, Briefcase, Heart, MessageCircle } from 'lucide-react';
import type { User } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'friend_request' | 'job_application' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  fromUser?: {
    name: string;
    avatar?: string;
  };
}

export default function NotificationModal({ isOpen, onClose, currentUser }: NotificationModalProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      // Mock notifications for demo
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'like',
          title: 'Nyt like',
          message: 'Maria Hansen likede dit opslag om rengøring',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          read: false,
          fromUser: { name: 'Maria Hansen' }
        },
        {
          id: '2',
          type: 'comment',
          title: 'Ny kommentar',
          message: 'Lars Nielsen kommenterede på dit job opslag',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          read: false,
          fromUser: { name: 'Lars Nielsen' }
        },
        {
          id: '3',
          type: 'friend_request',
          title: 'Ny venneanmodning',
          message: 'Anna Sørensen vil gerne være venner med dig',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
          read: true,
          fromUser: { name: 'Anna Sørensen' }
        },
        {
          id: '4',
          type: 'job_application',
          title: 'Ny jobansøgning',
          message: 'Du har modtaget en ny ansøgning til dit rengøringsjob',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          read: true
        },
        {
          id: '5',
          type: 'system',
          title: 'Velkommen til PRIVATE RENGØRING',
          message: 'Tak fordi du blev medlem! Udforsk alle funktionerne.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
          read: true
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const markAllAsRead = async () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = async (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'friend_request':
        return <User className="w-5 h-5 text-green-500" />;
      case 'job_application':
        return <Briefcase className="w-5 h-5 text-purple-500" />;
      case 'system':
        return <Bell className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Lige nu';
    if (diffInMinutes < 60) return `${diffInMinutes}m siden`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}t siden`;
    return `${Math.floor(diffInMinutes / 1440)}d siden`;
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notifikationer</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {unreadCount > 0 && (
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={markAllAsRead}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Marker alle som læst
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen notifikationer</h3>
              <p className="text-gray-600">Du har ingen nye notifikationer</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      
                      <p className={`text-sm mt-1 ${
                        !notification.read ? 'text-gray-800' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      
                      {notification.fromUser && (
                        <p className="text-xs text-gray-500 mt-1">
                          Fra: {notification.fromUser.name}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                          title="Marker som læst"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        title="Slet notifikation"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          >
            Luk
          </button>
        </div>
      </div>
    </div>
  );
}