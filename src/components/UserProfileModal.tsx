import React, { useState } from 'react';
import { X, MapPin, Star, Calendar, MessageCircle, UserPlus, UserCheck, Shield, Heart, Briefcase, Users, Settings, Ban, Flag } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  currentUser: any;
  onSendFriendRequest: (userId: string) => void;
  onAcceptFriendRequest: (userId: string) => void;
  onSendMessage: (userId: string) => void;
  onBlockUser: (userId: string) => void;
  onReportUser: (userId: string, reason: string) => void;
}

export default function UserProfileModal({ 
  isOpen, 
  onClose, 
  user, 
  currentUser,
  onSendFriendRequest,
  onAcceptFriendRequest,
  onSendMessage,
  onBlockUser,
  onReportUser
}: UserProfileModalProps) {
  const { t, getUserTypeLabel } = useLanguage();
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'friends'>('about');
  const [friendshipStatus, setFriendshipStatus] = useState<'none' | 'pending' | 'friends' | 'received'>('none');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  if (!isOpen || !user) return null;

  // Mock data for user profile
  const userStats = {
    posts: 45,
    friends: 123,
    rating: 4.8,
    completedJobs: 67,
    joinDate: '2023-08-15'
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
    }
  ];

  const mutualFriends = [
    {
      id: '1',
      name: 'Maria Hansen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Peter Larsen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const handleFriendAction = () => {
    if (friendshipStatus === 'none') {
      setFriendshipStatus('pending');
      onSendFriendRequest(user.id);
    } else if (friendshipStatus === 'received') {
      setFriendshipStatus('friends');
      onAcceptFriendRequest(user.id);
    }
  };

  const handleReport = () => {
    if (reportReason) {
      onReportUser(user.id, reportReason);
      setShowReportModal(false);
      setReportReason('');
      alert('Rapport sendt til admin teamet');
    }
  };

  const reportReasons = [
    'Upassende profil indhold',
    'Spam eller falske oplysninger',
    'Chikane eller trusler',
    'Svindel eller bedrageri',
    'Overtræder platformens regler',
    'Andet'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Info */}
          <div className="relative px-6 pb-4">
            <div className="flex items-end space-x-4 -mt-16">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                {user.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">{getUserTypeLabel(user.userType)}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{user.location}</span>
                    </div>
                  </div>
                  
                  {user.isSubscribed && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Pro</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-4">
              <button
                onClick={handleFriendAction}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 hover:scale-105 ${
                  friendshipStatus === 'friends' 
                    ? 'bg-green-100 text-green-700' 
                    : friendshipStatus === 'pending'
                    ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={friendshipStatus === 'pending'}
              >
                {friendshipStatus === 'friends' ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Venner</span>
                  </>
                ) : friendshipStatus === 'pending' ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Anmodning sendt</span>
                  </>
                ) : friendshipStatus === 'received' ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Accepter venskab</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Tilføj som ven</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onSendMessage(user.id)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Besked</span>
              </button>

              <div className="relative">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
                
                {/* Dropdown menu would go here */}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4 text-center">
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
        <div className="px-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'about'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Om
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Opslag ({userStats.posts})
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`py-3 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'friends'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Venner ({userStats.friends})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh] lg:max-h-[60vh]">
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Om {user.name}</h3>
                <p className="text-gray-700">
                  Professionel rengøringsekspert med over 5 års erfaring. Specialiseret i miljøvenlig rengøring og har hjulpet over 200 familier med deres rengøringsbehov.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Information</h3>
                <div className="space-y-2">
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
                </div>
              </div>

              {mutualFriends.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Fælles venner ({mutualFriends.length})</h3>
                  <div className="flex space-x-3">
                    {mutualFriends.map((friend) => (
                      <div key={friend.id} className="text-center">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <p className="text-xs text-gray-600 mt-1">{friend.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <img
                    src={`https://images.pexels.com/photos/${1239291 + i}/pexels-photo-${1239291 + i}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                    alt="Friend"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">Ven {i + 1}</p>
                    <p className="text-sm text-gray-500">København</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onBlockUser(user.id)}
                className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 text-sm"
              >
                <Ban className="w-4 h-4" />
                <span>Blokér</span>
              </button>
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
              >
                <Flag className="w-4 h-4" />
                <span>Rapportér</span>
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Medlem siden {new Date(userStats.joinDate).getFullYear()}
            </p>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rapportér {user.name}</h3>
            
            <div className="space-y-3 mb-6">
              {reportReasons.map((reason, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Annuller
              </button>
              <button
                onClick={handleReport}
                disabled={!reportReason}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send rapport
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}