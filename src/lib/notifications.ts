// Push Notifications Library for iPhone and Android
export class NotificationManager {
  private static instance: NotificationManager;
  private registration: ServiceWorkerRegistration | null = null;
  private subscription: PushSubscription | null = null;

  // VAPID keys for push notifications (demo keys - skal erstattes med rigtige)
  private readonly VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa6kc7rRKemvVgUzAOzHLLFgbrVNJKhM3PfqhdlPA1ILQi7IzlZJrQBmFvNEIE';

  private constructor() {}

  public static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  // Initialize push notifications
  public async initialize(): Promise<boolean> {
    try {
      // Check if service workers are supported
      if (!('serviceWorker' in navigator)) {
        console.warn('Service workers are not supported');
        return false;
      }

      // Check if push notifications are supported
      if (!('PushManager' in window)) {
        console.warn('Push notifications are not supported');
        return false;
      }

      // Register service worker
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', this.registration);

      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;

      return true;
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      return false;
    }
  }

  // Request notification permission
  public async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return 'denied';
    }

    let permission = Notification.permission;

    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    console.log('Notification permission:', permission);
    return permission;
  }

  // Subscribe to push notifications
  public async subscribeToPush(): Promise<PushSubscription | null> {
    try {
      if (!this.registration) {
        await this.initialize();
      }

      if (!this.registration) {
        throw new Error('Service worker not registered');
      }

      // Check if already subscribed
      this.subscription = await this.registration.pushManager.getSubscription();
      
      if (this.subscription) {
        console.log('Already subscribed to push notifications');
        return this.subscription;
      }

      // Subscribe to push notifications
      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY)
      });

      console.log('Subscribed to push notifications:', this.subscription);

      // Send subscription to server (demo - i virkeligheden ville dette gemmes i database)
      await this.sendSubscriptionToServer(this.subscription);

      return this.subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  // Unsubscribe from push notifications
  public async unsubscribeFromPush(): Promise<boolean> {
    try {
      if (this.subscription) {
        await this.subscription.unsubscribe();
        this.subscription = null;
        console.log('Unsubscribed from push notifications');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
      return false;
    }
  }

  // Show local notification
  public async showLocalNotification(title: string, options: NotificationOptions = {}): Promise<void> {
    const permission = await this.requestPermission();
    
    if (permission === 'granted') {
      const defaultOptions: NotificationOptions = {
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'local-notification',
        requireInteraction: false,
        silent: false,
        vibrate: [200, 100, 200],
        ...options
      };

      new Notification(title, defaultOptions);
    }
  }

  // Send test push notification (demo function)
  public async sendTestNotification(): Promise<void> {
    if (!this.subscription) {
      console.warn('Not subscribed to push notifications');
      return;
    }

    // I virkeligheden ville dette sendes fra server
    const testNotification = {
      title: 'Test Notifikation 📱',
      body: 'Dette er en test push notifikation fra Privat Rengøring!',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'test-notification',
      data: {
        url: '/',
        timestamp: Date.now()
      }
    };

    // Simuler server push (i virkeligheden ville serveren sende dette)
    console.log('Test notification would be sent:', testNotification);
    
    // Show local notification as demo
    await this.showLocalNotification(testNotification.title, {
      body: testNotification.body,
      icon: testNotification.icon,
      tag: testNotification.tag,
      data: testNotification.data
    });
  }

  // Send subscription to server (demo)
  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      // I virkeligheden ville dette sendes til din server
      console.log('Subscription would be sent to server:', {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: this.arrayBufferToBase64(subscription.getKey('p256dh')),
          auth: this.arrayBufferToBase64(subscription.getKey('auth'))
        }
      });

      // Demo API call
      // await fetch('/api/push-subscription', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(subscription)
      // });
    } catch (error) {
      console.error('Failed to send subscription to server:', error);
    }
  }

  // Utility functions
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer | null): string {
    if (!buffer) return '';
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // Get subscription status
  public async getSubscriptionStatus(): Promise<{
    supported: boolean;
    permission: NotificationPermission;
    subscribed: boolean;
  }> {
    const supported = 'serviceWorker' in navigator && 'PushManager' in window;
    const permission = 'Notification' in window ? Notification.permission : 'denied';
    
    let subscribed = false;
    if (supported && this.registration) {
      const subscription = await this.registration.pushManager.getSubscription();
      subscribed = !!subscription;
    }

    return { supported, permission, subscribed };
  }
}

// Export singleton instance
export const notificationManager = NotificationManager.getInstance();

// Notification types for the app
export interface AppNotification {
  id: string;
  type: 'job' | 'message' | 'friend_request' | 'like' | 'comment' | 'system';
  title: string;
  body: string;
  data?: any;
  timestamp: number;
}

// Predefined notification templates
export const NotificationTemplates = {
  newJob: (location: string, budget: string) => ({
    title: '💼 Nyt job i dit område!',
    body: `Rengøringsjob i ${location} - ${budget}. Klik for at se detaljer.`,
    icon: '/icon-192.png',
    tag: 'new-job',
    data: { type: 'job', location, budget }
  }),

  newMessage: (senderName: string) => ({
    title: '💬 Ny besked',
    body: `${senderName} har sendt dig en besked`,
    icon: '/icon-192.png',
    tag: 'new-message',
    data: { type: 'message', sender: senderName }
  }),

  friendRequest: (senderName: string) => ({
    title: '👥 Ny venskabsanmodning',
    body: `${senderName} vil gerne forbinde med dig`,
    icon: '/icon-192.png',
    tag: 'friend-request',
    data: { type: 'friend_request', sender: senderName }
  }),

  jobApplication: (jobTitle: string) => ({
    title: '📋 Ny ansøgning',
    body: `Nogen har ansøgt om dit job: ${jobTitle}`,
    icon: '/icon-192.png',
    tag: 'job-application',
    data: { type: 'job_application', job: jobTitle }
  }),

  postLike: (userName: string) => ({
    title: '❤️ Dit opslag blev liket',
    body: `${userName} likede dit opslag`,
    icon: '/icon-192.png',
    tag: 'post-like',
    data: { type: 'like', user: userName }
  })
};