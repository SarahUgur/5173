import React, { useState } from 'react';
import { MapPin, Star, Calendar, MessageCircle, UserPlus, UserCheck, Shield, Heart, Briefcase, Users, Settings, Ban, Flag, Edit, Camera, Phone, Mail, Globe, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface UserProfilePageProps {
  currentUser: any;
  onUpdateUser: (updates: any) => void;
  onShowSettings: () => void;
}

export default function UserProfilePage({ currentUser, onUpdateUser, onShowSettings }: UserProfilePageProps) {
  const { t, getUserTypeLabel } = useLanguage();
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'friends' | 'activity'>('about');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    location: currentUser?.location || '',
    phone: currentUser?.phone || '',
    website: currentUser?.website || ''
  });

  // Mock data for user profile
  const userStats = {
    posts: 45,
    friends: 123,
    rating: 4.8,
    completedJobs: 67,
    joinDate: '2023-08-15',
    profileViews: 234,
    totalLikes: 456,
    totalComments: 189
  };

  const userPosts = [
    {
      id: '1',
      content: 'Lige afsluttet en fantastisk rengøring i Østerbro! Kunden var super tilfreds 😊',
      images: ['https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'],
      likes: 24,
      comments: 8,
      createdAt: '2 dage siden'
    },
    {
      id: '2',
      content: 'Søger nye kunder i København området. Specialiseret i miljøvenlig rengøring 🌱',
      likes: 18,
      comments: 12,
      createdAt: '1 uge siden'
    },
    {
      id: '3',
      content: 'Tips til effektiv vinduesrengøring: Brug aviser i stedet for klude for et strygefrit resultat! ✨',
      likes: 32,
      comments: 15,
      createdAt: '2 uger siden'
    }
  ];

  const userFriends = Array.from({ length: 12 }, (_, i) => ({
    id: i.toString(),
    name: `Ven ${i + 1}`,
    avatar: `https://images.pexels.com/photos/${1239291 + i}/pexels-photo-${1239291 + i}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`,
    location: ['København', 'Aarhus', 'Odense'][i % 3],
    userType: ['private', 'cleaner', 'small_business'][i % 3]
  }));

  const recentActivity = [
    { type: 'like', action: 'Likede et opslag', target: 'Hjemmerengøring i Nørrebro', time: '2 timer siden' },
    { type: 'comment', action: 'Kommenterede på', target: 'Kontorrengøring tips', time: '5 timer siden' },
    { type: 'friend', action: 'Blev venner med', target: 'Maria Hansen', time: '1 dag siden' },
    { type: 'post', action: 'Oprettede et opslag', target: 'Rengøringstips', time: '2 dage siden' }
  ];

  const handleSaveProfile = () => {
    onUpdateUser({
      ...currentUser,
      ...editData
    });
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    // I en rigtig app ville dette åbne fil vælger
    alert('Åbn kamera/galleri for at vælge nyt profilbillede');
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Cover Photo */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <button className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75">
          <Camera className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-b-2xl shadow-sm border border-gray-200 p-4 sm:p-6 -mt-16 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Avatar */}
          <div className="relative -mt-16 sm:-mt-20">
            <img
              src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg"
            />
            <button
              onClick={handleAvatarChange}
              className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 shadow-lg"
            >
              <Camera className="w-4 h-4" />
            </button>
            {currentUser?.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                />
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({...editData, bio: e.target.value})}
                  placeholder="Fortæl lidt om dig selv..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Gem
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Annuller
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{currentUser?.name}</h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <p className="text-gray-600 mb-2">{getUserTypeLabel(currentUser?.userType)}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{currentUser?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Medlem siden {new Date(userStats.joinDate).getFullYear()}</span>
                  </div>
                  {currentUser?.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{currentUser.rating}</span>
                    </div>
                  )}
                </div>
                {currentUser?.bio && (
                  <p className="text-gray-700 mb-4">{currentUser.bio}</p>
                )}
                {currentUser?.isSubscribed && (
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 mr-1" />
                    Pro Medlem
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onShowSettings}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              <span>Rediger Profil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{userStats.posts}</p>
            <p className="text-sm text-gray-600">Opslag</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{userStats.friends}</p>
            <p className="text-sm text-gray-600">Venner</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{userStats.rating}</p>
            <p className="text-sm text-gray-600">Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{userStats.completedJobs}</p>
            <p className="text-sm text-gray-600">Jobs</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'about'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Om
            </button>
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

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] lg:max-h-[70vh]">
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">Medlem siden {new Date(userStats.joinDate).toLocaleDateString('da-DK')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{userStats.completedJobs} afsluttede jobs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-700">{userStats.rating} stjerner gennemsnit</span>
                    </div>
                    {currentUser?.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{currentUser.phone}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{currentUser?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{userStats.profileViews} profil visninger</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{userStats.totalLikes} likes modtaget</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{userStats.totalComments} kommentarer skrevet</span>
                    </div>
                  </div>
                </div>
              </div>

              {currentUser?.userType === 'cleaner' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Specialer</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Hjemmerengøring', 'Kontorrengøring', 'Hovedrengøring', 'Miljøvenlig rengøring'].map((specialty) => (
                      <span key={specialty} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Præstationer</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-yellow-800">Top Performer</p>
                    <p className="text-sm text-yellow-600">Højeste rating denne måned</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold text-green-800">Populær</p>
                    <p className="text-sm text-green-600">100+ forbindelser</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold text-purple-800">Verificeret</p>
                    <p className="text-sm text-purple-600">Bekræftet profil</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  {post.images && (
                    <div className="mb-3">
                      <img
                        src={post.images[0]}
                        alt="Post"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                    <span>{post.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {userFriends.map((friend) => (
                <div key={friend.id} className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                  />
                  <h4 className="font-medium text-gray-900 mb-1">{friend.name}</h4>
                  <p className="text-sm text-gray-600">{friend.location}</p>
                  <button className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm">
                    Se Profil
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {activity.type === 'like' && <Heart className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'comment' && <MessageCircle className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'friend' && <Users className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'post' && <Briefcase className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">
                      {activity.action} <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
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