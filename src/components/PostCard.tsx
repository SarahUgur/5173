import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, DollarSign, Star, Lock, MoreHorizontal, Flag, AlertTriangle, Ban } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  currentUser: any;
  onShowSubscription: () => void;
  onReport?: (postId: string, reason: string) => void;
}

export default function PostCard({ post, currentUser, onShowSubscription, onReport }: PostCardProps) {
  const { t, getJobTypeLabel, getUrgencyLabel } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const handleInteraction = (action: string) => {
    if (!currentUser?.isSubscribed) {
      onShowSubscription();
      return;
    }
    
    if (action === 'like') {
      setLiked(!liked);
    } else if (action === 'comment') {
      setShowComments(!showComments);
    }
  };

  const handleReport = () => {
    if (reportReason && reportDescription.trim()) {
      onReport?.(post.id, `${reportReason}: ${reportDescription}`);
      setShowReportModal(false);
      setReportReason('');
      setReportDescription('');
      alert('Tak for din rapport. Admin teamet vil gennemgå den inden for 24 timer.');
    }
  };

  const handleBlockUser = () => {
    // I en rigtig app ville dette blokere brugeren i databasen
    alert(`Du har blokeret ${post.user.name}. Du vil ikke længere se deres opslag.`);
    setShowBlockModal(false);
    setShowMoreMenu(false);
  };

  const reportReasons = [
    'Spam eller uønsket indhold',
    'Upassende eller krænkende sprog',
    'Falske oplysninger',
    'Svindel eller bedrageri',
    'Overtræder platformens regler',
    'Andet'
  ];
  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'immediate': 'bg-red-100 text-red-800',
      'this_week': 'bg-yellow-100 text-yellow-800',
      'flexible': 'bg-green-100 text-green-800'
    };
    return colors[urgency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 mx-3 sm:mx-0">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{post.user.name}</h3>
                {post.user.verified && (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <span>{post.createdAt}</span>
                <span>•</span>
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="truncate">{post.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-2">
            {post.isJobPost && (
              <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(post.urgency)}`}>
                  {getUrgencyLabel(post.urgency)}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hidden sm:inline">
                  {getJobTypeLabel(post.jobType)}
                </span>
              </div>
            )}
            <div className="relative">
              <button 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
              
              {/* More Menu Dropdown */}
              {showMoreMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      setShowBlockModal(true);
                      setShowMoreMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 text-orange-600"
                  >
                    <Ban className="w-4 h-4" />
                    <span className="text-sm">Blokér {post.user.name}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowReportModal(true);
                      setShowMoreMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 text-red-600"
                  >
                    <Flag className="w-4 h-4" />
                    <span className="text-sm">Rapportér opslag</span>
                  </button>
                  <button
                    onClick={() => setShowMoreMenu(false)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Del opslag</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile job type badge */}
        {post.isJobPost && (
          <div className="mt-2 sm:hidden">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {getJobTypeLabel(post.jobType)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <p className="text-gray-800 mb-4 leading-relaxed text-sm sm:text-base">{post.content}</p>
        
        {post.budget && (
          <div className="flex items-center space-x-2 mb-4 p-3 bg-green-50 rounded-lg">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <span className="font-semibold text-green-800 text-sm sm:text-base">Budget: {post.budget}</span>
          </div>
        )}

        {post.images && post.images.length > 0 && (
          <div className={`grid gap-2 mb-4 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="rounded-lg object-cover h-32 sm:h-48 w-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-3 sm:px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => handleInteraction('like')}
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-colors duration-200 ${
                liked ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${liked ? 'fill-current' : ''}`} />
              <span className="font-medium text-sm sm:text-base">{post.likes + (liked ? 1 : 0)}</span>
              {!currentUser?.isSubscribed && <Lock className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />}
            </button>
            
            <button
              onClick={() => handleInteraction('comment')}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">{post.comments.length}</span>
              {!currentUser?.isSubscribed && <Lock className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />}
            </button>
            
            <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-200">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base hidden sm:inline">{t('share')}</span>
            </button>
          </div>

          {post.isJobPost && (
            <button
              onClick={() => handleInteraction('apply')}
              className="bg-blue-600 text-white px-3 sm:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm sm:text-base"
            >
              <span>{t('apply')}</span>
              {!currentUser?.isSubscribed && <Lock className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
          )}
        </div>

        {!currentUser?.isSubscribed && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs sm:text-sm text-amber-800">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
              {t('upgradeToPro')} for at interagere med opslag og kontakte andre brugere
            </p>
          </div>
        )}
      </div>

      {/* Comments Section */}
      {showComments && currentUser?.isSubscribed && (
        <div className="border-t border-gray-100 p-3 sm:p-4 bg-gray-50">
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1 bg-white rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm">{comment.user.name}</span>
                    <span className="text-xs text-gray-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-sm text-gray-800">{comment.content}</p>
                </div>
              </div>
            ))}
            
            <div className="flex space-x-3 mt-4">
              <img
                src={currentUser?.avatar}
                alt="Your avatar"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={t('writeComment')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Rapportér opslag</h3>
                <p className="text-sm text-gray-600">Hjælp os med at holde platformen sikker</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Årsag til rapport</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Vælg en årsag...</option>
                  {reportReasons.map((reason, index) => (
                    <option key={index} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivelse (valgfrit)</label>
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Beskriv problemet mere detaljeret..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason('');
                  setReportDescription('');
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

      {/* Block User Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Ban className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Blokér {post.user.name}</h3>
                <p className="text-sm text-gray-600">Denne handling kan fortrydes senere</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Når du blokerer {post.user.name}:
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Du vil ikke se deres opslag eller kommentarer</li>
                <li>• De kan ikke sende dig beskeder</li>
                <li>• De kan ikke se din profil</li>
                <li>• Du kan fjerne blokeringen senere i indstillinger</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowBlockModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Annuller
              </button>
              <button
                onClick={handleBlockUser}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                Blokér Bruger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}