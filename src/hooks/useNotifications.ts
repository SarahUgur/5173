import { useState, useEffect } from 'react';
import { notificationManager, NotificationTemplates, AppNotification } from '../lib/notifications';

export function useNotifications(currentUser: any) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    // Check push notification status
    checkPushStatus();
    
    // Load existing notifications
    loadNotifications();
    
    // Set up periodic check for new notifications
    const interval = setInterval(checkForNewNotifications, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [currentUser]);

  const checkPushStatus = async () => {
    const status = await notificationManager.getSubscriptionStatus();
    setPushEnabled(status.subscribed);
  };

  const loadNotifications = () => {
    // Mock notifications - i virkeligheden ville disse komme fra server
    const mockNotifications: AppNotification[] = [
      {
        id: '1',
        type: 'job',
        title: 'Nyt job i dit område',
        body: 'Hjemmerengøring i København NV - 350 kr',
        timestamp: Date.now() - 300000, // 5 minutes ago
        data: { location: 'København NV', budget: '350 kr' }
      },
      {
        id: '2',
        type: 'message',
        title: 'Ny besked fra Lars Nielsen',
        body: 'Hej! Er du interesseret i rengøringsjobbet?',
        timestamp: Date.now() - 600000, // 10 minutes ago
        data: { sender: 'Lars Nielsen' }
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.length);
  };

  const checkForNewNotifications = async () => {
    // I virkeligheden ville dette tjekke server for nye notifikationer
    console.log('Checking for new notifications...');
    
    // Simuler nye notifikationer baseret på bruger aktivitet
    if (Math.random() > 0.8) { // 20% chance of new notification
      const newNotification = generateRandomNotification();
      addNotification(newNotification);
      
      // Send push notification hvis aktiveret
      if (pushEnabled) {
        await sendPushNotification(newNotification);
      }
    }
  };

  const generateRandomNotification = (): AppNotification => {
    const types = ['job', 'message', 'friend_request', 'like'] as const;
    const type = types[Math.floor(Math.random() * types.length)];
    
    const notifications = {
      job: {
        id: Date.now().toString(),
        type: 'job' as const,
        title: 'Nyt job i dit område',
        body: 'Kontorrengøring i Aarhus - 600 kr',
        timestamp: Date.now(),
        data: { location: 'Aarhus', budget: '600 kr' }
      },
      message: {
        id: Date.now().toString(),
        type: 'message' as const,
        title: 'Ny besked fra PRIVATE RENGORING',
        body: 'Tak for dit hurtige svar!',
        timestamp: Date.now(),
        data: { sender: 'Maria Hansen' }
      },
      friend_request: {
        id: Date.now().toString(),
        type: 'friend_request' as const,
        title: 'Ny venskabsanmodning',
        body: 'Peter Larsen vil gerne forbinde med dig',
        timestamp: Date.now(),
        data: { sender: 'Peter Larsen' }
      },
      like: {
        id: Date.now().toString(),
        type: 'like' as const,
        title: 'Dit opslag blev liket',
        body: 'Sofie Andersen likede dit opslag',
        timestamp: Date.now(),
        data: { user: 'Sofie Andersen' }
      }
    };
    
    return notifications[type];
  };

  const addNotification = (notification: AppNotification) => {
    setNotifications(prev => [notification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const sendPushNotification = async (notification: AppNotification) => {
    try {
      await notificationManager.showLocalNotification(notification.title, {
        body: notification.body,
        tag: notification.type,
        data: notification.data
      });
    } catch (error) {
      console.error('Failed to send push notification:', error);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === notificationId);
      const newNotifications = prev.filter(n => n.id !== notificationId);
      
      // Reduce unread count if notification was unread
      if (notification && !notification.read) {
        setUnreadCount(count => Math.max(0, count - 1));
      }
      
      return newNotifications;
    });
  };

  const enablePushNotifications = async () => {
    try {
      const subscription = await notificationManager.subscribeToPush();
      setPushEnabled(!!subscription);
      return !!subscription;
    } catch (error) {
      console.error('Failed to enable push notifications:', error);
      return false;
    }
  };

  const disablePushNotifications = async () => {
    try {
      const unsubscribed = await notificationManager.unsubscribeFromPush();
      setPushEnabled(!unsubscribed);
      return unsubscribed;
    } catch (error) {
      console.error('Failed to disable push notifications:', error);
      return false;
    }
  };

  // Trigger specific notification types
  const triggerJobNotification = (location: string, budget: string) => {
    const notification: AppNotification = {
      id: Date.now().toString(),
      type: 'job',
      title: '💼 Nyt job i dit område!',
      body: `Rengøringsjob i ${location} - ${budget}`,
      timestamp: Date.now(),
      data: { location, budget }
    };
    
    addNotification(notification);
    
    if (pushEnabled) {
      sendPushNotification(notification);
    }
  };

  const triggerMessageNotification = (senderName: string, message: string) => {
    const notification: AppNotification = {
      id: Date.now().toString(),
      type: 'message',
      title: '💬 Ny besked',
      body: `${senderName}: ${message.substring(0, 50)}...`,
      timestamp: Date.now(),
      data: { sender: senderName, message }
    };
    
    addNotification(notification);
    
    if (pushEnabled) {
      sendPushNotification(notification);
    }
  };

  return {
    notifications,
    unreadCount,
    pushEnabled,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    enablePushNotifications,
    disablePushNotifications,
    triggerJobNotification,
    triggerMessageNotification,
    checkPushStatus
  };
}