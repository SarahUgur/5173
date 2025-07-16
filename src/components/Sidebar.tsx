import React from 'react';
import { Home, Briefcase, Users, Star, MapPin, Calendar, TrendingUp, X, Globe } from 'lucide-react';
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
  
  const menuItems = [
    { icon: Home, label: t('home'), page: 'home' },
    { icon: Briefcase, label: t('myTasks'), page: 'tasks', count: 3 },
    { icon: Users, label: t('network'), page: 'network', count: 12 },
    { icon: Star, label: t('favorites'), page: 'favorites' },
    { icon: MapPin, label: t('localJobs'), page: 'local' },
    { icon: Calendar, label: t('planning'), page: 'planning' },
    { icon: TrendingUp, label: t('trending'), page: 'trending' },
    { icon: Globe, label: t('websiteIntegration'), page: 'integration' },
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
        w-64 bg-white h-full border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:block
      `}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-4">
          {/* User Profile Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{currentUser?.name || 'Bruger'}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {currentUser?.userType === 'cleaner' ? 'Rengøringsekspert' : 'Kunde'}
                </p>
                {currentUser?.isSubscribed && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                    Pro Medlem
                  </span>
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
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${currentPage === item.page ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-3">Denne Uge</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Nye Jobs</span>
                <span className="font-semibold text-green-600">+24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ansøgninger</span>
                <span className="font-semibold text-blue-600">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gennemført</span>
                <span className="font-semibold text-purple-600">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}