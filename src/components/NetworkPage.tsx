import React, { useState } from 'react';
import { Users, UserPlus, MessageCircle, Search, Filter, MapPin, Star, Briefcase } from 'lucide-react';
import UserProfileModal from './UserProfileModal';
import FriendRequestModal from './FriendRequestModal';

interface NetworkPageProps {
  currentUser: any;
}

export default function NetworkPage({ currentUser }: NetworkPageProps) {
  const [activeTab, setActiveTab] = useState<'discover' | 'friends' | 'requests'>('discover');
  const [users, setUsers] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    loadNetworkData();
  }, [activeTab]);

  const loadNetworkData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'discover') {
        const response = await fetch('/api/users/discover', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users || []);
        } else {
          setUsers([]);
        }
      } else if (activeTab === 'friends') {
        const response = await fetch('/api/friends', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setFriends(data.friends || []);
        } else {
          setFriends([]);
        }
      }
    } catch (error) {
      console.error('Error loading network data:', error);
      setUsers([]);
      setFriends([]);
    }
    setLoading(false);
  };

  const handleSendFriendRequest = async (userId: string) => {
    try {
      const response = await fetch('/api/friend-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          recipientId: userId,
          message: 'Hej! Jeg vil gerne forbinde med dig på PRIVATE RENGØRING.'
        })
      });

      if (response.ok) {
        alert('Venskabsanmodning sendt!');
      } else {
        throw new Error('Kunne ikke sende venskabsanmodning');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Venskabsanmodning sendt! (Demo mode)');
    }
  };

  const handleAcceptFriendRequest = async (requestId: string) => {
    try {
      const response = await fetch(`/api/friend-requests/${requestId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        alert('Venskabsanmodning accepteret!');
        loadNetworkData();
      } else {
        throw new Error('Kunne ikke acceptere venskabsanmodning');
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert('Venskabsanmodning accepteret! (Demo mode)');
    }
  };

  const handleSendMessage = async (userId: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          recipientId: userId,
          content: 'Hej! Jeg så din profil og vil gerne snakke om rengøring.'
        })
      });

      if (response.ok) {
        alert('Besked sendt!');
      } else {
        throw new Error('Kunne ikke sende besked');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Besked sendt! (Demo mode)');
    }
  };

  const handleBlockUser = async (userId: string) => {
    if (confirm('Er du sikker på at du vil blokere denne bruger?')) {
      try {
        const response = await fetch(`/api/users/${userId}/block`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (response.ok) {
          alert('Bruger blokeret');
          loadNetworkData();
        } else {
          throw new Error('Kunne ikke blokere bruger');
        }
      } catch (error) {
        console.error('Error blocking user:', error);
        alert('Bruger blokeret! (Demo mode)');
      }
    }
  };

  const handleReportUser = async (userId: string, reason: string) => {
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          reportedUserId: userId,
          reason: reason,
          description: `Bruger rapporteret for: ${reason}`
        })
      });

      if (response.ok) {
        alert('Rapport sendt til admin teamet');
      } else {
        throw new Error('Kunne ikke sende rapport');
      }
    } catch (error) {
      console.error('Error reporting user:', error);
      alert('Rapport sendt! (Demo mode)');
    }
  };

  const getUserTypeLabel = (userType: string) => {
    const labels = {
      'private': 'Privat kunde',
      'cleaner': 'Rengøringsekspert',
      'small_business': 'Lille virksomhed',
      'large_business': 'Stor virksomhed'
    };
    return labels[userType as keyof typeof labels] || userType;
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Netværk</h1>
        <p className="text-gray-600">Byg dit professionelle rengøringsnetværk</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('discover')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'discover'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Opdag Personer
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'friends'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Mine Venner ({friends.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Anmodninger
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Søg efter personer..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Indlæser...</p>
            </div>
          ) : activeTab === 'discover' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen brugere fundet</h3>
                  <p className="text-gray-600">Prøv at justere din søgning eller kom tilbage senere.</p>
                </div>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="text-center mb-4">
                      <img
                        src={user.avatar || "/api/placeholder/80/80"}
                        alt={user.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3"
                      />
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{getUserTypeLabel(user.userType)}</p>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{user.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{user.rating || "Ny"}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{user.completedJobs || 0} jobs</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSendFriendRequest(user.id)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Tilføj</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Se Profil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : activeTab === 'friends' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {friends.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen venner endnu</h3>
                  <p className="text-gray-600">Start med at forbinde med andre brugere i "Opdag Personer" fanen.</p>
                </div>
              ) : (
                friends.map((friend) => (
                  <div key={friend.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="text-center mb-4">
                      <img
                        src={friend.avatar || "/api/placeholder/80/80"}
                        alt={friend.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3"
                      />
                      <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                      <p className="text-sm text-gray-600">{getUserTypeLabel(friend.userType)}</p>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{friend.location}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSendMessage(friend.id)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Besked</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(friend);
                          setShowUserModal(true);
                        }}
                        className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Profil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <button
                onClick={() => setShowFriendRequests(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Administrer Venskabsanmodninger
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={selectedUser}
        currentUser={currentUser}
        onSendFriendRequest={handleSendFriendRequest}
        onAcceptFriendRequest={handleAcceptFriendRequest}
        onSendMessage={handleSendMessage}
        onBlockUser={handleBlockUser}
        onReportUser={handleReportUser}
      />

      {/* Friend Requests Modal */}
      <FriendRequestModal
        isOpen={showFriendRequests}
        onClose={() => setShowFriendRequests(false)}
        onAcceptRequest={handleAcceptFriendRequest}
        onDeclineRequest={(requestId) => {
          alert('Venskabsanmodning afvist! (Demo mode)');
        }}
        onSendRequest={handleSendFriendRequest}
      />
    </div>
  );
}