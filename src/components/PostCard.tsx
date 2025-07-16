import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, DollarSign, Star, Lock, MoreHorizontal } from 'lucide-react';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  currentUser: any;
  onShowSubscription: () => void;
}

export default function PostCard({ post, currentUser, onShowSubscription }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

  const getJobTypeLabel = (type: string) => {
    const labels = {
      'home_cleaning': 'Hjemmerengøring',
      'office_cleaning': 'Kontorrengøring',
      'deep_cleaning': 'Hovedrengøring',
      'regular_cleaning': 'Fast rengøring',
      'one_time': 'Engangsjob'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'immediate': 'bg-red-100 text-red-800',
      'this_week': 'bg-yellow-100 text-yellow-800',
      'flexible': 'bg-green-100 text-green-800'
    };
    return colors[urgency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyLabel = (urgency: string) => {
    const labels = {
      'immediate': 'Akut',
      'this_week': 'Denne uge',
      'flexible': 'Fleksibel'
    };
    return labels[urgency as keyof typeof labels] || urgency;
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
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
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
              <span className="font-medium text-sm sm:text-base hidden sm:inline">Del</span>
            </button>
          </div>

          {post.isJobPost && (
            <button
              onClick={() => handleInteraction('apply')}
              className="bg-blue-600 text-white px-3 sm:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm sm:text-base"
            >
              <span>Ansøg</span>
              {!currentUser?.isSubscribed && <Lock className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
          )}
        </div>

        {!currentUser?.isSubscribed && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs sm:text-sm text-amber-800">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
              Opgrader til Pro for at interagere med opslag og kontakte andre brugere
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
                  placeholder="Skriv en kommentar..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}