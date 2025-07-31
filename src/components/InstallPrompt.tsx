import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setTimeout(() => {
        setShowPrompt(true);
        setIsVisible(true);
      }, 3000); // Show after 3 seconds
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        alert('App installeres... Tjek din hjemmeskærm om et øjeblik!');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setIsVisible(false);
      setShowPrompt(false);
    } catch (error) {
      console.error('Install error:', error);
      // Fallback for browsers that don't support PWA
      if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
        alert('📱 På iPhone/iPad: Tryk på Del-knappen og vælg "Føj til hjemmeskærm"');
      } else if (navigator.userAgent.includes('Android')) {
        alert('📱 På Android: Tryk på menu (⋮) og vælg "Installer app" eller "Føj til hjemmeskærm"');
      } else {
        alert('💻 På computer: Klik på install ikonet i adresselinjen eller brug browser menu');
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setIsVisible(false);
    // Remember user dismissed (optional)
    localStorage.setItem('installPromptDismissed', 'true');
  };

  // Don't show if user already dismissed or if already installed
  if (!showPrompt || !isVisible || localStorage.getItem('installPromptDismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 animate-slideUp">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">Installer Privat Rengøring</h3>
          <p className="text-sm text-gray-600 mb-3">
            Få hurtig adgang direkte fra din hjemmeskærm
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={handleInstall}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Installer</span>
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Ikke nu
            </button>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}