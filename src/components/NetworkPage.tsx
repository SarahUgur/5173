import React, { useState } from 'react';
import { Users, UserPlus, MessageCircle, Star, MapPin, Search, Filter, TrendingUp, Award, Heart } from 'lucide-react';

interface NetworkPageProps {
  currentUser?: any;
  onShowSubscription?: () => void;
}

export default function NetworkPage({ currentUser, onShowSubscription }: NetworkPageProps) {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'friends' | 'requests'>('suggestions');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock network data
  const suggestions = [
    {
      id: '1',
      name: 'Emma Larsen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      location: 'Esbjerg',
      userType: 'cleaner',
      rating: 4.8,
      mutualFriends: 3,
      reason: 'Arbejder i samme område'
    },
    {
      id: '2',
      name: 'Michael Sørensen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      location: 'Aalborg',
      userType: 'private',
      rating: 4.6,
      mutualFriends: 7,
      reason: 'Fælles interesser'
    },
    {
      id: '3',
      name: 'Anna Nielsen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      location: 'København',
      userType: 'small_business',
      rating: 4.9,
      mutualFriends: 2,
      reason: 'Samme branche'
    }
  ];

  const friends = [
    {
      id: '4',
      name: 'Peter Hansen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      location: 'Odense',
      userType: 'cleaner',
      rating: 4.7,
      status: 'online'
    },
    {
      id: '5',
      name: 'Sofie Andersen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      location: 'Aarhus',
      userType: 'private',
      rating: 4.5,
      status: 'offline'
    }
  ];

  const handleConnect = (userId: string) => {
    if (!currentUser?.isSubscribed) {
      onShowSubscription?.();
      return;
    }
    alert('Venskabsanmodning sendt!');
  };

  const handleMessage = (userId: string) => {
    if (!currentUser?.isSubscribed) {
      onShowSubscription?.();
      return;
    }
    alert('Åbner besked...');
  };

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
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Netværk</h1>
        <p className="text-gray-600">Opbyg dit professionelle netværk inden for rengøringsbranchen</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Søg efter personer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('suggestions')}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
            activeTab === 'suggestions' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Forslag ({suggestions.length})
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
            activeTab === 'friends' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Venner ({friends.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
            activeTab === 'requests' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Anmodninger (2)
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'suggestions' && (
          <>
            {suggestions.map((person) => (
              <div key={person.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{person.name}</h3>
                    <p className="text-sm text-gray-600">{getUserTypeLabel(person.userType)}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{person.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{person.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{person.mutualFriends} fælles</span>
                      </div>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">{person.reason}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleConnect(person.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Forbind</span>
                    </button>
                    <button
                      onClick={() => handleMessage(person.id)}
                      className="flex items-center space-x-1 px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Besked</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'friends' && (
          <>
            {friends.map((friend) => (
              <div key={friend.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-16 h-16 rounded-full"
                    />
                    {friend.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                    <p className="text-sm text-gray-600">{getUserTypeLabel(friend.userType)}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{friend.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{friend.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      {friend.status === 'online' ? 'Online nu' : 'Offline'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMessage(friend.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Besked</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'requests' && (
          <div className="text-center py-12">
            <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen anmodninger</h3>
            <p className="text-gray-600">Du har ingen ventende venskabsanmodninger</p>
          </div>
        )}
      </div>

    </div>
  );
}