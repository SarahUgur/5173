import React from 'react';
import { Home, MapPin, Users, Calendar, MessageCircle, Settings, LogOut, Crown, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
}

export default function Sidebar({ currentPage, onPageChange, isOpen, onClose, currentUser }: SidebarProps) {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'local-jobs', icon: MapPin, label: t('localJobs') },
    { id: 'network', icon: Users, label: t('network') },
    { id: 'planning', icon: Calendar, label: t('planning') },
    { id: 'messages', icon: MessageCircle, label: t('messages') },
    { id: 'my-tasks', icon: Settings, label: t('myTasks') }
  ];

  const handleItemClick = (pageId: string) => {
    onPageChange(pageId);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User info */}
        {currentUser && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser.name}
                </p>
                <div className="flex items-center space-x-1">
                  {currentUser.isSubscribed && (
                    <Crown className="w-3 h-3 text-yellow-500" />
                  )}
                  <p className="text-xs text-gray-500">
                    {currentUser.isSubscribed ? 'Pro Member' : 'Free Member'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => handleItemClick('logout')}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log ud</span>
          </button>
        </div>
      </div>
    </>
  );
}