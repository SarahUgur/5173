import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember user dismissed (optional)
    localStorage.setItem('installPromptDismissed', 'true');
  };

  // Don't show if user already dismissed or if already installed
  if (!showPrompt || localStorage.getItem('installPromptDismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-xl shadow-strong border border-gray-200 p-4 z-50 animate-slideUp hover:shadow-medium transition-shadow duration-300">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0 shadow-soft animate-pulse">
          <Smartphone className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">Installer Privat Rengøring</h3>
          <p className="text-sm text-gray-600 mb-3">
            Få hurtig adgang direkte fra din hjemmeskærm
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={handleInstall}
              className="flex-1 flex items-center justify-center space-x-2 btn-primary text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Installer</span>
            </button>
            <button
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm"
            >
              Ikke nu
            </button>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="p-1 rounded-full hover:bg-gray-100 transition-all duration-200 flex-shrink-0 hover:scale-110"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}