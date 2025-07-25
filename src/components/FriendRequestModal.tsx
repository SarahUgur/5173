import React, { useState } from 'react';
import { X, UserPlus, UserCheck, UserX, Search } from 'lucide-react';

interface FriendRequest {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    location: string;
    userType: string;
    mutualFriends: number;
  };
  message?: string;
  createdAt: string;
}

interface FriendRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptRequest: (requestId: string) => void;
  onDeclineRequest: (requestId: string) => void;
  onSendRequest: (userId: string) => void;
}

export default function FriendRequestModal({
  isOpen,
  onClose,
  onAcceptRequest,
  onDeclineRequest,
  onSendRequest
}: FriendRequestModalProps) {
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'suggestions'>('received');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Mock data
  const receivedRequests: FriendRequest[] = [
    {
      id: '1',
      user: {
        id: 'user1',
        name: 'Emma Larsen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        location: 'Esbjerg',
        userType: 'private',
        mutualFriends: 3
      },
      message: 'Hej! Jeg så dit profil og ville gerne forbinde. Vi har fælles interesser inden for rengøring.',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      user: {
        id: 'user2',
        name: 'Michael Sørensen',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        location: 'Aalborg',
        userType: 'cleaner',
        mutualFriends: 7
      },
      createdAt: '2024-01-14'
    }
  ];

  const sentRequests: FriendRequest[] = [
    {
      id: '3',
      user: {
        id: 'user3',
        name: 'Anna Nielsen',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        location: 'København',
        userType: 'small_business',
        mutualFriends: 2
      },
      createdAt: '2024-01-13'
    }
  ];

  const suggestions = [
    {
      id: 'user4',
      name: 'Peter Hansen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      location: 'Odense',
      userType: 'cleaner',
      mutualFriends: 5,
      reason: 'Arbejder i samme område'
    },
    {
      id: 'user5',
      name: 'Sofie Andersen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      location: 'Aarhus',
      userType: 'private',
      mutualFriends: 8,
      reason: 'Fælles venner'
    }
  ];

  const getUserTypeLabel = (type: string) => {
    const labels = {
      'private': 'Privat kunde',
      'cleaner': 'Rengøringsekspert',
      'small_business': 'Lille virksomhed',
      'large_business': 'Stor virksomhed'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Venskabsanmodninger</h2>
          <p className="text-gray-600">Administrer dine venskabsanmodninger og find nye venner</p>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('received')}
              className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'received'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Modtaget ({receivedRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'sent'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Sendt ({sentRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'suggestions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Forslag ({suggestions.length})
            </button>
          </div>
        </div>

        {/* Search */}
        {activeTab === 'suggestions' && (
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Søg efter personer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh] lg:max-h-[60vh]">
          {activeTab === 'received' && (
            <div className="space-y-4">
              {receivedRequests.length === 0 ? (
                <div className="text-center py-8">
                  <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen anmodninger</h3>
                  <p className="text-gray-600">Du har ingen ventende venskabsanmodninger</p>
                </div>
              ) : (
                receivedRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={request.user.avatar}
                        alt={request.user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{request.user.name}</h4>
                            <p className="text-sm text-gray-600">{getUserTypeLabel(request.user.userType)} • {request.user.location}</p>
                            {request.user.mutualFriends > 0 && (
                              <p className="text-xs text-blue-600">{request.user.mutualFriends} fælles venner</p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString('da-DK')}
                          </span>
                        </div>
                        
                        {request.message && (
                          <p className="text-sm text-gray-700 mb-3 italic">"{request.message}"</p>
                        )}
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onAcceptRequest(request.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:scale-105"
                          >
                            <UserCheck className="w-4 h-4" />
                            <span>Accepter</span>
                          </button>
                          <button
                            onClick={() => onDeclineRequest(request.id)}
                            className="flex items-center space-x-1 px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:scale-105"
                          >
                            <UserX className="w-4 h-4" />
                            <span>Afvis</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'sent' && (
            <div className="space-y-4">
              {sentRequests.length === 0 ? (
                <div className="text-center py-8">
                  <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen sendte anmodninger</h3>
                  <p className="text-gray-600">Du har ikke sendt nogen venskabsanmodninger</p>
                </div>
              ) : (
                sentRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={request.user.avatar}
                        alt={request.user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{request.user.name}</h4>
                        <p className="text-sm text-gray-600">{getUserTypeLabel(request.user.userType)} • {request.user.location}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Sendt {new Date(request.createdAt).toLocaleDateString('da-DK')}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Afventer
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div className="space-y-4">
              {suggestions.map((person) => (
                <div key={person.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{person.name}</h4>
                      <p className="text-sm text-gray-600">{getUserTypeLabel(person.userType)} • {person.location}</p>
                      <p className="text-xs text-blue-600">{person.mutualFriends} fælles venner • {person.reason}</p>
                    </div>
                    <button
                      onClick={() => onSendRequest(person.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Tilføj</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}