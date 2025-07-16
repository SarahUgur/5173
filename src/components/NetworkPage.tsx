import React, { useState } from 'react';
import { Users, Search, Filter, MessageCircle, UserPlus, Star, MapPin, Briefcase, Shield } from 'lucide-react';

interface NetworkPageProps {
  currentUser: any;
}

export default function NetworkPage({ currentUser }: NetworkPageProps) {
  const [activeTab, setActiveTab] = useState<'connections' | 'discover' | 'requests'>('connections');
  const [searchTerm, setSearchTerm] = useState('');

  const connections = [
    {
      id: '1',
      name: 'Maria Hansen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'private',
      location: 'København',
      rating: 4.9,
      verified: true,
      mutualConnections: 5,
      lastActive: '2 timer siden',
      description: 'Søger pålidelig rengøringshjælp til mit hjem'
    },
    {
      id: '2',
      name: 'Lars Nielsen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'cleaner',
      location: 'Aarhus',
      rating: 4.8,
      verified: true,
      mutualConnections: 8,
      lastActive: '1 time siden',
      description: 'Professionel rengøringsekspert med 5+ års erfaring'
    },
    {
      id: '3',
      name: 'Sofie Andersen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'small_business',
      location: 'Odense',
      rating: 4.7,
      verified: false,
      mutualConnections: 3,
      lastActive: '5 timer siden',
      description: 'Ejer af lille rengøringsfirma specialiseret i kontorer'
    }
  ];

  const discoverUsers = [
    {
      id: '4',
      name: 'Anna Petersen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'cleaner',
      location: 'København S',
      rating: 4.9,
      verified: true,
      mutualConnections: 2,
      description: 'Specialist i miljøvenlig rengøring og allergivenlige produkter'
    },
    {
      id: '5',
      name: 'Michael Sørensen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'large_business',
      location: 'Aalborg',
      rating: 4.6,
      verified: true,
      mutualConnections: 12,
      description: 'Stor rengøringskæde med fokus på erhvervskunder'
    }
  ];

  const connectionRequests = [
    {
      id: '6',
      name: 'Emma Larsen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'private',
      location: 'Esbjerg',
      mutualConnections: 1,
      requestDate: '2024-01-10',
      message: 'Hej! Jeg så dit profil og ville gerne forbinde. Jeg har brug for hjælp til rengøring.'
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

  const getUserTypeColor = (type: string) => {
    const colors = {
      'private': 'bg-blue-100 text-blue-800',
      'cleaner': 'bg-green-100 text-green-800',
      'small_business': 'bg-purple-100 text-purple-800',
      'large_business': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderUserCard = (user: any, type: 'connection' | 'discover' | 'request') => (
    <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
          />
          {user.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(user.userType)}`}>
                {getUserTypeLabel(user.userType)}
              </span>
            </div>
            {user.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{user.rating}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            {user.mutualConnections > 0 && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{user.mutualConnections} fælles forbindelser</span>
              </div>
            )}
            {user.lastActive && (
              <span>Aktiv {user.lastActive}</span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4">{user.description || user.message}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {type === 'connection' && (
                <>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    <span>Besked</span>
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-sm">
                    Profil
                  </button>
                </>
              )}
              
              {type === 'discover' && (
                <>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm">
                    <UserPlus className="w-4 h-4" />
                    <span>Forbind</span>
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-sm">
                    Se profil
                  </button>
                </>
              )}
              
              {type === 'request' && (
                <>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-sm">
                    Accepter
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-sm">
                    Afvis
                  </button>
                </>
              )}
            </div>
            
            {type === 'request' && user.requestDate && (
              <span className="text-xs text-gray-500">
                {new Date(user.requestDate).toLocaleDateString('da-DK')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mit Netværk</h1>
        <p className="text-gray-600">Forbind med andre brugere og byg dit professionelle netværk</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('connections')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'connections' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Forbindelser ({connections.length})
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'discover' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Opdag ({discoverUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'requests' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Anmodninger ({connectionRequests.length})
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Søg personer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'connections' && (
          <>
            {connections.length > 0 ? (
              connections.map(user => renderUserCard(user, 'connection'))
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen forbindelser endnu</h3>
                <p className="text-gray-600">Start med at forbinde med andre brugere for at bygge dit netværk.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'discover' && (
          <>
            {discoverUsers.length > 0 ? (
              discoverUsers.map(user => renderUserCard(user, 'discover'))
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen forslag</h3>
                <p className="text-gray-600">Vi kunne ikke finde flere brugere at forbinde med lige nu.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'requests' && (
          <>
            {connectionRequests.length > 0 ? (
              connectionRequests.map(user => renderUserCard(user, 'request'))
            ) : (
              <div className="text-center py-12">
                <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen anmodninger</h3>
                <p className="text-gray-600">Du har ingen ventende forbindelsesanmodninger.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Network Stats */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Netværksstatistik</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{connections.length}</p>
            <p className="text-sm text-gray-600">Forbindelser</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">24</p>
            <p className="text-sm text-gray-600">Profil visninger</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">8</p>
            <p className="text-sm text-gray-600">Nye forbindelser</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">4.8</p>
            <p className="text-sm text-gray-600">Netværks rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}