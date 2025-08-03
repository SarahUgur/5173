import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { notificationManager } from './lib/notifications';

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Initialize push notifications
        notificationManager.initialize().then((initialized) => {
          if (initialized) {
            console.log('Push notifications initialized');
          }
        });
        
        // Check for app updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available
                if (confirm('Ny version af Private Rengøring er tilgængelig. Vil du opdatere?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Request notification permission on app start
window.addEventListener('load', async () => {
  // Wait a bit before asking for permission to not overwhelm user
  setTimeout(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      // const permission = await notificationManager.requestPermission();
      console.log('Initial notification permission:', permission);
    }
  }, 3000); // Ask after 3 seconds
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);