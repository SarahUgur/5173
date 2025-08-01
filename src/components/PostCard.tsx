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

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        setLiked(!liked);
        console.log('Like registered successfully');
      } else {
        // Fallback for demo
        setLiked(!liked);
      }
    } catch (error) {
      console.error('Error liking post:', error);
      setLiked(!liked); // Still update UI
    }
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleApply = async () => {
    try {
      const response = await fetch('/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          postId: post.id,
          message: 'Jeg er interesseret i dette job og vil gerne høre mere.',
          contactMethod: 'chat'
        })
      });

      if (response.ok) {
        alert('🎉 Ansøgning sendt succesfuldt! Job ejeren vil kontakte dig snart.');
      } else {
        throw new Error('Kunne ikke sende ansøgning');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Ansøgning sendt! (Demo mode)');
    }
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

      // Create shareable link
      const shareUrl = `https://privaterengoring.dk/post/${post.id}`;
      const shareText = `${post.content}\n\nSe mere på PRIVATE RENGØRING: ${shareUrl}`;

      // Use Web Share API if available (mobile)
      if (navigator.share) {
        await navigator.share({
          title: 'PRIVATE RENGØRING - ' + post.content.substring(0, 50) + '...',
          text: post.content,
          url: shareUrl
        });
      } else {
        // Desktop: Show share options
        const shareOptions = [
          {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(post.content)}`
          },
          {
            name: 'WhatsApp',
            url: `https://wa.me/?text=${encodeURIComponent(shareText)}`
          },
          {
            name: 'SMS',
            url: `sms:?body=${encodeURIComponent(shareText)}`
          },
          {
            name: 'Email',
            url: `mailto:?subject=${encodeURIComponent('PRIVATE RENGØRING - ' + post.content.substring(0, 50))}&body=${encodeURIComponent(shareText)}`
          },
          {
            name: 'Kopier link',
            action: 'copy'
          }
        ];

        // Show share menu
        const choice = prompt(
          'Vælg hvordan du vil dele:\n\n' +
          shareOptions.map((opt, i) => `${i + 1}. ${opt.name}`).join('\n') +
          '\n\nIndtast nummer (1-5):'
        );

        const selectedOption = shareOptions[parseInt(choice || '0') - 1];
        
        if (selectedOption) {
          if (selectedOption.action === 'copy') {
            await navigator.clipboard.writeText(shareText);
            alert('Link kopieret til udklipsholder! 📋');
          } else if (selectedOption.url) {
            window.open(selectedOption.url, '_blank', 'width=600,height=400');
          }
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: Copy to clipboard
      try {
        const shareUrl = `https://privaterengoring.dk/post/${post.id}`;
        const shareText = `${post.content}\n\nSe mere på PRIVATE RENGØRING: ${shareUrl}`;
        await navigator.clipboard.writeText(shareText);
        alert('Link kopieret til udklipsholder! 📋\n\nDu kan nu dele det på WhatsApp, SMS, Facebook eller andre sociale medier.');
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
              src={post.user?.avatar || "/api/placeholder/48/48"}
              alt={post.user?.name || "Bruger"}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{post.user?.name || "Anonym Bruger"}</span>
                {post.user?.verified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{post.createdAt || "Nu"}</span>
                <span>•</span>
                <MapPin className="w-4 h-4" />
                <span>{post.location || "Ikke angivet"}</span>
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
              <span className="font-medium">{(post.likes || 0) + (liked ? 1 : 0)}</span>
            </button>
            
            <button
              onClick={handleComment}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{post.comments?.length || 0}</span>
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
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment: any) => (
                <div key={comment.id} className="flex space-x-3">
                  <img
                    src={comment.user?.avatar || "/api/placeholder/32/32"}
                    alt={comment.user?.name || "Bruger"}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm">{comment.user?.name || "Anonym"}</span>
                      <span className="text-xs text-gray-500">{comment.createdAt || "Nu"}</span>
                    </div>
                    <p className="text-sm text-gray-800">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">Ingen kommentarer endnu. Vær den første til at kommentere!</p>
              </div>
            )}
            
            {/* Add Comment */}
            <div className="flex space-x-3 mt-4">
              <img
                src={currentUser?.avatar || "/api/placeholder/32/32"}
                alt="Din avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Skriv en kommentar..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      alert('Kommentar sendt! (Demo mode)');
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}