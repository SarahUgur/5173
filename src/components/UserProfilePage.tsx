import React, { useState } from 'react';
import { Camera, Edit, Save, MapPin, Star, Calendar, Briefcase, Phone, Mail, Globe, Shield, Crown, Users, MessageCircle, UserPlus, Settings } from 'lucide-react';
import type { User } from '../types';

interface UserProfilePageProps {
  currentUser: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onShowSettings: () => void;
}

export default function UserProfilePage({ currentUser, onUpdateUser, onShowSettings }: UserProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    bio: currentUser.bio || '',
    location: currentUser.location || '',
    phone: currentUser.phone || '',
    website: currentUser.website || ''
  });
  const [userStats, setUserStats] = useState({
    posts: 0,
    friends: 0,
    rating: 0,
    completedJobs: 0
  });
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [userFriends, setUserFriends] = useState<any[]>([]);
  const [userActivity, setUserActivity] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'friends' | 'activity'>('posts');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Load user stats
      const statsResponse = await fetch(`/api/user/${currentUser.id}/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (statsResponse.ok) {
        const stats = await statsResponse.json();
        setUserStats(stats);
      }

      // Load user posts
      const postsResponse = await fetch(`/api/user/${currentUser.id}/posts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (postsResponse.ok) {
        const posts = await postsResponse.json();
        setUserPosts(posts);
      }

      // Load user friends
      const friendsResponse = await fetch(`/api/user/${currentUser.id}/friends`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (friendsResponse.ok) {
        const friends = await friendsResponse.json();
        setUserFriends(friends);
      }

      // Load user activity
      const activityResponse = await fetch(`/api/user/${currentUser.id}/activity`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (activityResponse.ok) {
        const activity = await activityResponse.json();
        setUserActivity(activity);
      }

    } catch (error) {
      console.error('Error loading user data:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onUpdateUser(formData);
        setIsEditing(false);
        alert('Profil opdateret succesfuldt!');
      } else {
        throw new Error('Kunne ikke opdatere profil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Fejl ved opdatering af profil. Prøv igen.');
    }
  };

  const handleAvatarUpload = async () => {
    try {
      // Mock avatar upload
      const newAvatarUrl = `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&t=${Date.now()}`;
      
      onUpdateUser({ avatar: newAvatarUrl });
      alert('Profilbillede opdateret!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Fejl ved upload af profilbillede');
    }
  };

  const handleCoverUpload = async () => {
    try {
      // Mock cover upload
      const newCoverUrl = `https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop&t=${Date.now()}`;
      
      onUpdateUser({ coverPhoto: newCoverUrl });
      alert('Cover billede opdateret!');
    } catch (error) {
      console.error('Error uploading cover:', error);
      alert('Fejl ved upload af cover billede');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Cover Photo */}
      <div className="relative mb-6">
        <div 
          className="h-48 sm:h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl overflow-hidden"
          style={{
            backgroundImage: currentUser.coverPhoto ? `url(${currentUser.coverPhoto})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <button
            onClick={handleCoverUpload}
            className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity duration-200"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 -mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src={currentUser.avatar || "/api/placeholder/120/120"}
                alt={currentUser.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg"
              />
              <button
                onClick={handleAvatarUpload}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                <Camera className="w-4 h-4" />
              </button>
              {currentUser.verified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{currentUser.name}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{currentUser.location || 'Lokation ikke angivet'}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{currentUser.rating || 'Ny bruger'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{currentUser.completedJobs || 0} jobs</span>
                    </div>
                    {currentUser.isSubscribed && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Crown className="w-3 h-3" />
                        <span>Pro</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    <span>{isEditing ? 'Annuller' : 'Rediger Profil'}</span>
                  </button>
                  <button
                    onClick={onShowSettings}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Settings className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Navn</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Fortæl om dig selv..."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lokation</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="F.eks. København"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+45 12 34 56 78"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hjemmeside</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://dinhjemmeside.dk"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Gem Ændringer</span>
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-800 mb-4">
              {currentUser.bio || 'Ingen bio tilføjet endnu. Klik "Rediger Profil" for at tilføje en beskrivelse.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {currentUser.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{currentUser.phone}</span>
                </div>
              )}
              {currentUser.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <a href={currentUser.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {currentUser.website}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Medlem siden {currentUser.joinedDate || '2024'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{userStats.posts}</p>
          <p className="text-sm text-gray-600">Opslag</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{userStats.friends}</p>
          <p className="text-sm text-gray-600">Venner</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{userStats.rating}</p>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{userStats.completedJobs}</p>
          <p className="text-sm text-gray-600">Jobs</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Opslag ({userStats.posts})
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'friends'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Venner ({userStats.friends})
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'activity'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Aktivitet
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Indlæser...</p>
            </div>
          ) : (
            <>
              {activeTab === 'posts' && (
                <div className="space-y-4">
                  {userPosts.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen opslag endnu</h3>
                      <p className="text-gray-600">Dine opslag vil blive vist her</p>
                    </div>
                  ) : (
                    userPosts.map((post) => (
                      <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-800 mb-2">{post.content}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>{post.likes} likes</span>
                            <span>{post.comments} kommentarer</span>
                          </div>
                          <span>{post.createdAt}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'friends' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userFriends.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen venner endnu</h3>
                      <p className="text-gray-600">Gå til Netværk for at finde venner</p>
                    </div>
                  ) : (
                    userFriends.map((friend) => (
                      <div key={friend.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{friend.name}</p>
                          <p className="text-sm text-gray-600">{friend.location}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-3">
                  {userActivity.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen aktivitet endnu</h3>
                      <p className="text-gray-600">Din aktivitet vil blive vist her</p>
                    </div>
                  ) : (
                    userActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm">📝</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">{activity.action} {activity.target}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}