import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, DollarSign, Star, MoreHorizontal, ThumbsUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import type { Post } from '../types';

interface PostCardProps {
  post: any;
  currentUser: any;
}

export default function PostCard({ post, currentUser }: PostCardProps) {
  const { t } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleApply = () => {
    alert('Ansøgning sendt! (Demo)');
  };

  const handleShare = async () => {
    try {
      // Track share for analytics
      await fetch(`/api/posts/${post.id}/share`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ platform: 'native' })
      });

      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'PRIVATE RENGORING - ' + post.content.substring(0, 50) + '...',
          text: post.content,
          url: window.location.href
        });
      } else {
        // Fallback: Copy to clipboard
        const shareText = `${post.content}\n\nSe mere på PRIVATE RENGORING: ${window.location.href}`;
        await navigator.clipboard.writeText(shareText);
        alert('Link kopieret til udklipsholder!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: Copy to clipboard
      try {
        const shareText = `${post.content}\n\nSe mere på PRIVATE RENGORING: ${window.location.href}`;
        await navigator.clipboard.writeText(shareText);
        alert('Link kopieret til udklipsholder!');
      } catch (clipboardError) {
        alert('Opslag delt! (Demo mode)');
      }
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{post.user.name}</span>
                {post.user.verified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{post.createdAt}</span>
                <span>•</span>
                <MapPin className="w-4 h-4" />
                <span>{post.location}</span>
              </div>
            </div>
          </div>
          
          {post.isJobPost && (
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Job
              </span>
              {post.urgency === 'immediate' && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  Akut
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-800 mb-4">{post.content}</p>
        
        {post.budget && (
          <div className="flex items-center space-x-2 mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Budget: {post.budget}</span>
          </div>
        )}

        {post.images && post.images.length > 0 && (
          <div className="mb-4">
            <img
              src={post.images[0]}
              alt="Post image"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                liked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
              <span className="font-medium">{post.likes + (liked ? 1 : 0)}</span>
            </button>
            
            <button
              onClick={handleComment}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{post.comments.length}</span>
            </button>
            
            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50"
            >
              <Share2 className="w-5 h-5" />
              <span className="font-medium">Del</span>
            </button>
          </div>

          {post.isJobPost && (
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Ansøg
            </button>
          )}
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <div className="space-y-3">
            {post.comments.map((comment: any) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full"
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
          </div>
        </div>
      )}
    </div>
  );
}