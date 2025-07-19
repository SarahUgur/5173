import React from 'react';
import { Home, Briefcase, Users, Star, MapPin, Calendar, TrendingUp, X, Globe, Shield } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface SidebarProps {
  currentUser: any;
  isOpen?: boolean;
  onClose?: () => void;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export default function Sidebar({ currentUser, isOpen = true, onClose, currentPage = 'home', onPageChange }: SidebarProps) {
  const { t } = useLanguage();
  
  // Check if user is admin
  const isAdmin = currentUser?.email === 'admin@privatrengoring.dk';
  
  const menuItems = [
    { icon: Home, label: t('home'), page: 'home' },
    { icon: MapPin, label: 'Kort', page: 'map' },
    { icon: Briefcase, label: t('myTasks'), page: 'tasks', count: 3 },
    { icon: Users, label: t('network'), page: 'network', count: 12 },
    { icon: Star, label: t('favorites'), page: 'favorites' },
    { icon: Globe, label: t('localJobs'), page: 'local' },
    { icon: Calendar, label: t('planning'), page: 'planning' },
    { icon: TrendingUp, label: t('trending'), page: 'trending' },
    ...(isAdmin ? [{ icon: Shield, label: 'Admin', page: 'admin', adminOnly: true }] : []),
  ];

  const handleMenuClick = (page: string) => {
    if (onPageChange) {
      onPageChange(page);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 md:z-auto
        w-64 bg-gradient-to-b from-white to-gray-50 h-full border-r border-gray-200 md:shadow-soft
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:block
      `}>
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 gradient-bg rounded-lg flex items-center justify-center shadow-soft">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                <path d="M19 15L19.5 17L21.5 17.5L19.5 18L19 20L18.5 18L16.5 17.5L18.5 17L19 15Z"/>
                <path d="M5 15L5.5 17L7.5 17.5L5.5 18L5 20L4.5 18L2.5 17.5L4.5 17L5 15Z"/>
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-sm sm:text-base">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          {/* User Profile Card */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-4 mb-6 hidden md:block shadow-soft hover:shadow-medium transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white shadow-soft hover:scale-110 transition-transform duration-200"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{currentUser?.name || 'Bruger'}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {currentUser?.userType === 'cleaner' ? 'Rengøringsekspert' : 'Kunde'}
                </p>
                {currentUser?.isSubscribed && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mt-1 animate-pulse">
                    Pro Medlem
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mobile User Info */}
          <div className="md:hidden mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl shadow-soft">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:scale-110 transition-transform duration-200"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{currentUser?.name || 'Bruger'}</h3>
                {currentUser?.isSubscribed && (
                  <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-2 py-0.5 rounded-full animate-pulse">Pro</span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item.page)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-all duration-200 hover:scale-105 ${
                  currentPage === item.page
                    ? 'bg-blue-50 text-blue-700 shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${currentPage === item.page ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </div>
                {item.count && (
                  <span className="notification-badge text-white text-xs rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 min-w-[18px] sm:min-w-[20px] text-center">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Denne Uge</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Nye Jobs</span>
                <span className="font-semibold text-green-600 animate-pulse">+24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ansøgninger</span>
                <span className="font-semibold text-blue-600 animate-pulse">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gennemført</span>
                <span className="font-semibold text-purple-600 animate-pulse">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}