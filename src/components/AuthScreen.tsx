import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MapPin, Clock, DollarSign, Star, Lock, MoreHorizontal, Flag, AlertTriangle, Ban, ThumbsUp, Smile, Users, ExternalLink, Eye, EyeOff, Trash2, Edit } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import AdBanner from './AdBanner';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  currentUser: any;
  onShowSubscription: () => void;
  onReport?: (postId: string, reason: string) => void;
  onShowUserProfile?: (user: any) => void;
  onTagUser?: (userId: string, postId: string) => void;
  onSharePost?: (postId: string, platform: string) => void;
}

export default function PostCard({ post, currentUser, onShowSubscription, onReport, onShowUserProfile, onTagUser, onSharePost }: PostCardProps) {
  const { t, getJobTypeLabel, getUrgencyLabel } = useLanguage();
  const [liked, setLiked] = useState(false);
  const [reactionType, setReactionType] = useState<'like' | 'love' | 'laugh' | 'wow' | null>(null);
  const [showReactions, setShowReactions] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareCount, setShareCount] = useState(Math.floor(Math.random() * 20) + 5);
  const [showTagModal, setShowTagModal] = useState(false);
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  
  // Auto-close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (!target.closest('.more-menu-dropdown')) {
        setShowMoreMenu(false);
      }
      if (!target.closest('.share-menu-dropdown')) {
        setShowShareMenu(false);
      }
      if (!target.closest('.reactions-dropdown')) {
        setShowReactions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPostHidden, setIsPostHidden] = useState(false);

  const reactions = [
    { type: 'like', emoji: '👍', label: 'Synes godt om', color: 'text-blue-600' },
    { type: 'love', emoji: '❤️', label: 'Elsker', color: 'text-red-600' },
    { type: 'laugh', emoji: '😂', label: 'Sjovt', color: 'text-yellow-600' },
    { type: 'wow', emoji: '😮', label: 'Wow', color: 'text-purple-600' }
  ];

  const shareOptions = [
    { platform: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
    { platform: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-pink-600' },
    { platform: 'whatsapp', name: 'WhatsApp', icon: '💬', color: 'bg-green-600' },
    { platform: 'messenger', name: 'Messenger', icon: '💬', color: 'bg-blue-500' },
    { platform: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
    { platform: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
    { platform: 'copy', name: 'Kopier Link', icon: '🔗', color: 'bg-gray-600' }
  ];

  const mockUsers = [
    { id: '1', name: 'Maria Hansen', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: '2', name: 'Lars Nielsen', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { id: '3', name: 'Sofie Andersen', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
  ];

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

  const handleReaction = (type: string) => {
    if (!currentUser?.isSubscribed) {
      onShowSubscription();
      return;
    }
    setReactionType(reactionType === type ? null : type as any);
    setShowReactions(false);
  };

  const handleShare = (platform: string) => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    const text = `Tjek dette opslag på Privat Rengøring: ${post.content.substring(0, 100)}...`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, copy to clipboard
        navigator.clipboard.writeText(`${text} ${postUrl}`);
        alert('Link kopieret! Indsæt i Instagram Story eller post');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${postUrl}`)}`, '_blank');
        break;
      case 'messenger':
        window.open(`https://www.messenger.com/t/?link=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(postUrl);
        alert('Link kopieret til udklipsholder!');
        break;
    }
    
    setShareCount(prev => prev + 1);
    onSharePost?.(post.id, platform);
    setShowShareMenu(false);
  };

  const handleTagUser = (userId: string) => {
    if (!taggedUsers.includes(userId)) {
      setTaggedUsers([...taggedUsers, userId]);
      onTagUser?.(userId, post.id);
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // Process @mentions in comment
      const mentions = commentText.match(/@(\w+)/g);
      if (mentions) {
        mentions.forEach(mention => {
          const username = mention.substring(1);
          const user = mockUsers.find(u => u.name.toLowerCase().includes(username.toLowerCase()));
          if (user) {
            handleTagUser(user.id);
          }
        });
      }
      
      console.log('Posting comment:', commentText);
      setCommentText('');
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

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
  };

  const handleHidePost = () => {
    setIsPostHidden(true);
    setShowMoreMenu(false);
    alert('Opslag skjult. Du kan vise det igen i dine indstillinger.');
  };

  const handleDeletePost = () => {
    if (confirm('Er du sikker på at du vil slette dette opslag? Dette kan ikke fortrydes.')) {
      alert('Opslag slettet permanent.');
      setShowMoreMenu(false);
    }
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

  // Skjul opslag hvis brugeren har valgt det
  if (isPostHidden) {
    return (
      <div className="bg-gray-100 rounded-xl p-4 mx-3 sm:mx-0 text-center">
        <EyeOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">Opslag skjult</p>
        <button
          onClick={() => {
            if (!currentUser?.isSubscribed) {
              onShowSubscription();
              return;
            }
            // Handle job application
            alert('Ansøgning sendt! Kunden vil kontakte dig snart.');
          }}
          className="text-blue-600 hover:text-blue-700 text-sm mt-2"
        >
          Vis igen
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden hover:shadow-medium transition-all duration-300 mx-3 sm:mx-0 card hover-lift">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <button
              onClick={() => onShowUserProfile?.(post.user)}
              className="flex-shrink-0 hover:opacity-80 transition-all duration-200 hover:scale-105"
            >
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-transparent hover:ring-blue-300 transition-all duration-200"
              />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onShowUserProfile?.(post.user)}
                  className="font-semibold text-gray-900 truncate text-sm sm:text-base hover:text-blue-600 transition-all duration-200 hover:scale-105"
                >
                  {post.user.name}
                </button>
                {post.user.verified && (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
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
                className="more-menu-dropdown"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-1 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110"
              >
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
              
              {/* More Menu Dropdown */}
              {showMoreMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 more-menu-dropdown">
                  {post.userId === currentUser?.id && (
                    <>
                      <button
                        onClick={handleHidePost}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 text-gray-700"
                      >
                        <EyeOff className="w-4 h-4" />
                        <span className="text-sm">Skjul opslag</span>
                      </button>
                      <button
                        onClick={handleDeletePost}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Slet opslag</span>
                      </button>
                      <hr className="my-2" />
                    </>
                  )}
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
      <div className="p-3 sm:p-4 bg-gradient-to-b from-white to-gray-50">
        <p className="text-gray-800 mb-4 leading-relaxed text-sm sm:text-base">{post.content}</p>
        
        {post.budget && (
          <div className="flex items-center space-x-2 mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover-lift relative group">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <span className="font-semibold text-green-800 text-sm sm:text-base animate-fadeIn">Budget: {post.budget}</span>
            <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              💰 Pris fastsat af {post.user.userType === 'private' || post.user.userType === 'small_business' || post.user.userType === 'large_business' ? 'kunde' : 'udbyder'}
            </div>
          </div>
        )}

        {post.images && post.images.length > 0 && (
          <div className={`grid gap-2 mb-4 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {post.images.map((image, index) => (
              <React.Fragment key={index}>
                <div className="relative">
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="rounded-lg object-cover h-32 sm:h-48 w-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    {index + 1}/{post.images.length}
                  </div>
                </div>
                {/* Reklame mellem billeder (hver 2. billede) */}
                {index === 1 && post.images.length > 2 && (
                  <div className="col-span-full my-2">
                    <AdBanner type="banner" position="middle" className="w-full" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-3 sm:px-4 py-3 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative">
              <button
                onClick={() => reactionType ? setReactionType(null) : handleReaction('like')}
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setTimeout(() => setShowReactions(false), 300)}
                className={`reactions-dropdown flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  reactionType ? 'text-blue-600 bg-blue-50' : 
                  !currentUser?.isSubscribed ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
                }`}
                disabled={!currentUser?.isSubscribed}
              >
                {reactionType ? (
                  <span className="text-lg">{reactions.find(r => r.type === reactionType)?.emoji}</span>
                ) : (
                  <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span className="font-medium text-sm sm:text-base">{post.likes + (reactionType ? 1 : 0)}</span>
                {!currentUser?.isSubscribed && <Lock className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />}
              </button>
              
              {/* Reaction Menu */}
              {showReactions && (
                <div 
                  className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-strong border border-gray-200 p-2 flex space-x-2 z-50 animate-fadeIn reactions-dropdown"
                  onMouseEnter={() => setShowReactions(true)}
                  onMouseLeave={() => setShowReactions(false)}
                >
                  {reactions.map((reaction) => (
                    <button
                      key={reaction.type}
                      onClick={() => handleReaction(reaction.type)}
                      className="hover:scale-125 transition-transform duration-200 p-1 hover:bg-gray-50 rounded-full"
                      title={reaction.label}
                    >
                      <span className="text-xl">{reaction.emoji}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => handleInteraction('comment')}
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                !currentUser?.isSubscribed ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
              }`}
              disabled={!currentUser?.isSubscribed}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">{post.comments.length}</span>
              {!currentUser?.isSubscribed && <Lock className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className={`share-menu-dropdown flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  !currentUser?.isSubscribed ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
                }`}
                disabled={!currentUser?.isSubscribed}
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">{shareCount}</span>
                <span className="font-medium text-sm sm:text-base hidden sm:inline ml-1">{t('share')}</span>
              </button>
              
              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-strong border border-gray-200 p-3 z-50 animate-fadeIn share-menu-dropdown">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Del opslag</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {shareOptions.map((option) => (
                      <button
                        key={option.platform}
                        onClick={() => handleShare(option.platform)}
                        className={`flex items-center space-x-2 p-2 rounded-lg text-white hover:opacity-90 transition-all duration-200 hover:scale-105 ${option.color}`}
                      >
                        <span>{option.icon}</span>
                        <span className="text-xs font-medium">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {post.isJobPost && (
            <button
              onClick={() => handleInteraction('apply')}
              className={`px-3 sm:px-6 py-2 rounded-lg font-medium flex items-center space-x-2 text-sm sm:text-base transition-all duration-200 ${
                currentUser?.isSubscribed 
                  ? 'btn-primary text-white hover:scale-105' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!currentUser?.isSubscribed}
            >
              <span>{currentUser?.isSubscribed ? t('apply') : 'Kun Pro'}</span>
              {!currentUser?.isSubscribed && <Lock className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
          )}
        </div>

        {!currentUser?.isSubscribed && (
          <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-blue-800 font-medium mb-1">
                  🔒 Denne funktion er kun for Pro-medlemmer
                </p>
                <p className="text-xs text-blue-700">
                  Som Pro-medlem kan du like, kommentere, ansøge om jobs og sende beskeder
                </p>
              </div>
              <button
                onClick={onShowSubscription}
                className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs font-medium"
              >
                Opgrader
              </button>
            </div>
          </div>
        )}

        {/* Pro Comparison for non-subscribers */}
        {!currentUser?.isSubscribed && post.isJobPost && (
          <div className="mt-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-3">💎 Hvad får du med Pro?</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span className="text-yellow-800">Ansøg om jobs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span className="text-yellow-800">Send beskeder</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span className="text-yellow-800">Like og gem opslag</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span className="text-yellow-800">Verificeret profil</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-yellow-900">29 kr/måned</span>
                  <span className="text-xs text-yellow-700 ml-2">Opsig når som helst</span>
                </div>
                <button
                  onClick={onShowSubscription}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 text-sm font-medium"
                >
                  Opgrader Nu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin has access to everything */}
        {currentUser?.email === 'admin@privatrengoring.dk' && (
          <div className="mt-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-800 flex items-center space-x-2">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
              <span>🛡️ Admin har fuld adgang til alle funktioner</span>
            </p>
          </div>
        )}
      </div>

      {/* Comments Section */}
      {showComments && currentUser?.isSubscribed && (
        <div className="border-t border-gray-100 p-3 sm:p-4 bg-gradient-to-b from-gray-50 to-white animate-slideUp">
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3 animate-fadeIn">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 ring-2 ring-transparent hover:ring-blue-300 transition-all duration-200"
                />
                <div className="flex-1 bg-white rounded-lg p-3 shadow-soft hover:shadow-medium transition-shadow duration-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm">{comment.user.name}</span>
                    <span className="text-xs text-gray-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-sm text-gray-800">
                    {comment.content.split(' ').map((word, index) => {
                      if (word.startsWith('@')) {
                        return (
                          <span key={index} className="text-blue-600 font-medium cursor-pointer hover:underline">
                            {word}{' '}
                          </span>
                        );
                      }
                      return word + ' ';
                    })}
                  </p>
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
                <div className="relative">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                    placeholder={`${t('writeComment')} (brug @ for at tagge)`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-20 transition-all duration-200"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <button
                      onClick={() => setShowTagModal(true)}
                      className="p-1 rounded hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                      title="Tag brugere"
                    >
                      <Users className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={handleCommentSubmit}
                      disabled={!commentText.trim()}
                      className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 text-sm font-medium transition-all duration-200 hover:scale-105"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tag Users Modal */}
      {showTagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tag Brugere</h3>
            <div className="space-y-3 mb-6">
              {mockUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setCommentText(prev => prev + `@${user.name} `);
                      handleTagUser(user.id);
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm"
                  >
                    Tag
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowTagModal(false)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Luk
            </button>
          </div>
        </div>
      )}

      {/* Share Menu Overlay */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}

      {/* Reactions Overlay */}
      {showReactions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowReactions(false)}
        />
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

      {/* Image Modal */}
      {showImageModal && post.images && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={post.images[selectedImageIndex]}
              alt={`Post image ${selectedImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
            {post.images.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {post.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === selectedImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}
            
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded">
              {selectedImageIndex + 1} af {post.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}