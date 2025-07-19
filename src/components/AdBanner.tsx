import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Star, ShoppingCart, Play, Volume2, VolumeX } from 'lucide-react';

interface AdBannerProps {
  type: 'banner' | 'video' | 'native' | 'interstitial';
  position?: 'top' | 'middle' | 'bottom';
  onAdClick?: () => void;
  className?: string;
}

export default function AdBanner({ type, position = 'middle', onAdClick, className = '' }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [adData, setAdData] = useState<any>(null);

  // Mock reklame data - I virkeligheden ville dette komme fra Google AdSense, Facebook Ads etc.
  const mockAds = {
    banner: [
      {
        id: 'ad1',
        title: 'Kärcher Rengøringsmaskiner',
        description: 'Professionelt rengøringsudstyr til alle opgaver',
        image: 'https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
        url: 'https://example.com/karcher',
        sponsor: 'Kärcher Danmark',
        cta: 'Se Tilbud'
      },
      {
        id: 'ad2',
        title: 'Rengøringsservice København',
        description: 'Professionel rengøring til private og erhverv',
        image: 'https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
        url: 'https://example.com/cleanservice',
        sponsor: 'CleanPro ApS',
        cta: 'Book Nu'
      },
      {
        id: 'ad3',
        title: 'Miljøvenlige Rengøringsprodukter',
        description: 'Skån miljøet med vores grønne produkter',
        image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop',
        url: 'https://example.com/ecogreen',
        sponsor: 'EcoClean',
        cta: 'Køb Online'
      }
    ],
    video: [
      {
        id: 'video1',
        title: 'Sådan rengør du effektivt',
        description: 'Lær professionelle rengøringsteknikker',
        thumbnail: 'https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        duration: '2:30',
        sponsor: 'Rengørings Akademiet',
        cta: 'Se Video'
      }
    ],
    native: [
      {
        id: 'native1',
        title: 'Top 5 Rengøringstips fra Eksperterne',
        description: 'Professionelle rengøringseksperter deler deres bedste tips til effektiv hjemmerengøring.',
        image: 'https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        author: 'Rengørings Magasinet',
        readTime: '3 min læsning',
        sponsored: true
      }
    ]
  };

  useEffect(() => {
    // Vælg tilfældig reklame baseret på type
    const ads = mockAds[type] || mockAds.banner;
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    setAdData(randomAd);

    // Simuler ad tracking
    console.log(`Ad impression: ${randomAd.id} - ${type}`);
  }, [type]);

  const handleAdClick = () => {
    if (adData) {
      // Simuler ad click tracking
      console.log(`Ad clicked: ${adData.id} - Revenue: ~0.50 DKK`);
      
      // I virkeligheden ville dette åbne reklamen
      if (onAdClick) {
        onAdClick();
      } else {
        window.open(adData.url, '_blank');
      }
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    console.log(`Video ad started: ${adData.id} - Revenue: ~2.00 DKK`);
  };

  if (!isVisible || !adData) return null;

  // Banner reklame
  if (type === 'banner') {
    return (
      <div className={`relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm ${className}`}>
        <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          Reklame
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-75 text-white rounded-full hover:bg-opacity-100 transition-opacity duration-200"
        >
          <X className="w-3 h-3" />
        </button>
        
        <div 
          onClick={handleAdClick}
          className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
          <img 
            src={adData.image} 
            alt={adData.title}
            className="w-full h-24 sm:h-32 object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{adData.title}</h3>
            <p className="text-gray-600 text-xs mb-2">{adData.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Sponsoreret af {adData.sponsor}</span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors duration-200">
                {adData.cta}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Video reklame
  if (type === 'video') {
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
        <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-75 text-white text-xs px-2 py-1 rounded z-10">
          Video Reklame
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-75 text-white rounded-full hover:bg-opacity-100 transition-opacity duration-200 z-10"
        >
          <X className="w-3 h-3" />
        </button>
        
        <div className="relative">
          <img 
            src={adData.thumbnail} 
            alt={adData.title}
            className="w-full h-48 object-cover"
          />
          
          {!isVideoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <button
                onClick={handleVideoPlay}
                className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
              >
                <Play className="w-8 h-8 text-gray-800 ml-1" />
              </button>
            </div>
          )}
          
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {adData.duration}
          </div>
          
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-2 right-2 p-1 bg-black bg-opacity-75 text-white rounded"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="p-3 bg-white">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">{adData.title}</h3>
          <p className="text-gray-600 text-xs mb-2">{adData.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Sponsoreret af {adData.sponsor}</span>
            <button 
              onClick={handleAdClick}
              className="bg-red-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-700 transition-colors duration-200"
            >
              {adData.cta}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Native reklame (ser ud som almindeligt indhold)
  if (type === 'native') {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm ${className}`}>
        <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
          Sponsoreret
        </div>
        
        <div 
          onClick={handleAdClick}
          className="cursor-pointer hover:bg-gray-50 transition-colors duration-200 p-4"
        >
          <div className="flex space-x-3">
            <img 
              src={adData.image} 
              alt={adData.title}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{adData.title}</h3>
              <p className="text-gray-600 text-xs mb-2 line-clamp-2">{adData.description}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{adData.author}</span>
                <span>•</span>
                <span>{adData.readTime}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}