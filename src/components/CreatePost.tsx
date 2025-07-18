import React, { useState } from 'react';
import { Image, MapPin, DollarSign, Clock, Briefcase, X, Users, Building, Home, Car, Shirt, Video, Camera, Upload, Filter, Music, Type, Smile, Trash2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface CreatePostProps {
  currentUser: any;
}

export default function CreatePost({ currentUser }: CreatePostProps) {
  const { t } = useLanguage();
  const [postType, setPostType] = useState<'regular' | 'job'>('regular');
  const [content, setContent] = useState('');
  const [jobType, setJobType] = useState('home_cleaning');
  const [jobCategory, setJobCategory] = useState('private_customer');
  const [targetAudience, setTargetAudience] = useState<'looking_for_work' | 'hiring_cleaner'>('hiring_cleaner');
  const [budget, setBudget] = useState('');
  const [urgency, setUrgency] = useState('flexible');
  const [location, setLocation] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [showMediaEditor, setShowMediaEditor] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('none');
  const [videoText, setVideoText] = useState('');
  const [selectedMusic, setSelectedMusic] = useState('none');

  // Auto-close media editor when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (showMediaEditor && !target.closest('.media-editor-modal')) {
        setShowMediaEditor(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMediaEditor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating post:', { 
      postType, 
      content, 
      jobType, 
      jobCategory, 
      targetAudience, 
      budget, 
      urgency, 
      location 
    });
    // Reset form
    setContent('');
    setBudget('');
    setLocation('');
    setIsExpanded(false);
    setSelectedImages([]);
    setSelectedVideo(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 10)); // Max 10 billeder
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      setShowMediaEditor(true);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const filters = [
    { id: 'none', name: 'Ingen', style: {} },
    { id: 'vintage', name: 'Vintage', style: { filter: 'sepia(0.5) contrast(1.2)' } },
    { id: 'bw', name: 'Sort/Hvid', style: { filter: 'grayscale(1)' } },
    { id: 'bright', name: 'Lys', style: { filter: 'brightness(1.3)' } },
    { id: 'warm', name: 'Varm', style: { filter: 'hue-rotate(30deg) saturate(1.2)' } },
    { id: 'cool', name: 'Kølig', style: { filter: 'hue-rotate(-30deg) saturate(1.1)' } }
  ];

  const musicOptions = [
    { id: 'none', name: 'Ingen musik' },
    { id: 'upbeat', name: 'Energisk' },
    { id: 'chill', name: 'Afslappet' },
    { id: 'professional', name: 'Professionel' },
    { id: 'happy', name: 'Glad' }
  ];
  const jobCategories = [
    { 
      id: 'home_cleaning', 
      label: t('homeCleaning'), 
      icon: Home,
      subcategories: [
        { id: 'regular_cleaning', label: t('regularCleaning') },
        { id: 'deep_cleaning', label: t('deepCleaning') },
        { id: 'move_cleaning', label: t('moveCleaning') },
        { id: 'window_cleaning', label: t('windowCleaning') }
      ]
    },
    { 
      id: 'office_cleaning', 
      label: t('officeCleaning'), 
      icon: Building,
      subcategories: [
        { id: 'daily_office', label: t('dailyOfficeCleaning') },
        { id: 'construction_cleaning', label: t('constructionCleaning') },
        { id: 'industrial_cleaning', label: t('industrialCleaning') }
      ]
    },
    { 
      id: 'specialized_cleaning', 
      label: t('specializedCleaning'), 
      icon: Shirt,
      subcategories: [
        { id: 'carpet_sofa_cleaning', label: t('carpetSofaCleaning') },
        { id: 'car_cleaning', label: t('carCleaning') },
        { id: 'garden_cleaning', label: t('gardenCleaning') },
        { id: 'laundry_service', label: t('laundryService') },
        { id: 'dry_cleaning', label: t('dryCleaning') }
      ]
    }
  ];

  const userTypes = [
    { id: 'private_customer', label: t('privateCustomer'), icon: Home },
    { id: 'business_customer', label: t('businessCustomer'), icon: Building },
    { id: 'cleaning_expert', label: t('cleaningExpert'), icon: Users },
    { id: 'subcontractor', label: t('subcontractor'), icon: Briefcase }
  ];

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6 mx-3 sm:mx-0 hover:shadow-medium transition-all duration-300 card">
      <div className="flex items-start space-x-3">
        <img
          src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
          alt="Your avatar"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0 ring-2 ring-transparent hover:ring-blue-300 transition-all duration-200"
        />
        <div className="flex-1 min-w-0">
          {/* Post Type Selector */}
          {(isExpanded || postType === 'job') && (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
              <button
                onClick={() => setPostType('regular')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  postType === 'regular'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('regularPost')}
              </button>
              <button
                onClick={() => setPostType('job')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105 ${
                  postType === 'job'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>{t('jobPost')}</span>
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder={postType === 'job' ? t('describeCleaningTask') : t('whatAreYouThinking')}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                rows={isExpanded ? 4 : 2}
              />
              {isExpanded && (
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setContent('');
                    setPostType('regular');
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Media Preview */}
            {(selectedImages.length > 0 || selectedVideo) && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Valgte medier</h4>
                
                {/* Images */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                          style={currentFilter !== 'none' ? filters.find(f => f.id === currentFilter)?.style : {}}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Video */}
                {selectedVideo && (
                  <div className="relative mb-3">
                    <video
                      src={URL.createObjectURL(selectedVideo)}
                      className="w-full h-32 object-cover rounded-lg"
                      style={currentFilter !== 'none' ? filters.find(f => f.id === currentFilter)?.style : {}}
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(null)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {videoText && (
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                        {videoText}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter Options */}
                <div className="flex space-x-2 mb-3 overflow-x-auto">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setCurrentFilter(filter.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        currentFilter === filter.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isExpanded && postType === 'job' && (
              <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('targetAudience')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTargetAudience('hiring_cleaner')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        targetAudience === 'hiring_cleaner'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <Users className="w-6 h-6 mx-auto mb-1" />
                        <div className="text-sm font-medium">{t('hiringCleaner')}</div>
                        <div className="text-xs text-gray-500">{t('lookingForHelp')}</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetAudience('looking_for_work')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        targetAudience === 'looking_for_work'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <Briefcase className="w-6 h-6 mx-auto mb-1" />
                        <div className="text-sm font-medium">{t('lookingForWork')}</div>
                        <div className="text-xs text-gray-500">{t('offeringServices')}</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* User Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('userCategory')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {userTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setJobCategory(type.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                          jobCategory === type.id
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <type.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{type.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('cleaningCategory')}</label>
                  <div className="space-y-3 max-h-[40vh] overflow-y-auto">
                    {jobCategories.map((category) => (
                      <div key={category.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <category.icon className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-900">{category.label}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {category.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => setJobType(sub.id)}
                              className={`p-2 rounded-md text-sm transition-all duration-200 hover:scale-105 ${
                                jobType === sub.id
                                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location and Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t('location')}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200"
                    />
                  </div>
                  
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder={t('budget')}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('urgency')}</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200"
                  >
                    <option value="flexible">{t('flexible')}</option>
                    <option value="this_week">{t('thisWeek')}</option>
                    <option value="immediate">{t('immediate')}</option>
                  </select>
                </div>
              </div>
            )}

            {isExpanded && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <label className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-200 text-sm hover:scale-105 cursor-pointer">
                    <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Billeder</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <label className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-200 text-sm hover:scale-105 cursor-pointer">
                    <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Video</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-200 text-sm hover:scale-105"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t('location')}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!content.trim()}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 text-sm hover:scale-105 ${
                    content.trim()
                      ? 'btn-primary text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {postType === 'job' ? t('createJob') : t('share')}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Media Editor Modal */}
      {showMediaEditor && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto media-editor-modal">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Rediger Video</h3>
                <button
                  onClick={() => setShowMediaEditor(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Preview */}
              <div className="relative mb-4">
                <video
                  src={URL.createObjectURL(selectedVideo)}
                  className="w-full h-64 object-cover rounded-lg"
                  style={currentFilter !== 'none' ? filters.find(f => f.id === currentFilter)?.style : {}}
                  controls
                />
                {videoText && (
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded text-sm">
                    {videoText}
                  </div>
                )}
              </div>

              {/* Editing Tools */}
              <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                {/* Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Filter className="w-4 h-4 inline mr-1" />
                    Filtre
                  </label>
                  <div className="flex space-x-2 overflow-x-auto">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setCurrentFilter(filter.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                          currentFilter === filter.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {filter.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Overlay */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Type className="w-4 h-4 inline mr-1" />
                    Tekst Overlay
                  </label>
                  <input
                    type="text"
                    value={videoText}
                    onChange={(e) => setVideoText(e.target.value)}
                    placeholder="Tilføj tekst til video..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Music */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Music className="w-4 h-4 inline mr-1" />
                    Baggrundsmusik
                  </label>
                  <select
                    value={selectedMusic}
                    onChange={(e) => setSelectedMusic(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {musicOptions.map((music) => (
                      <option key={music.id} value={music.id}>{music.name}</option>
                    ))}
                  </select>
                </div>

                {/* Emoji Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Smile className="w-4 h-4 inline mr-1" />
                    Emoji
                  </label>
                  <div className="flex space-x-2">
                    {['😊', '😍', '🔥', '💪', '✨', '👍', '❤️', '🎉'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setVideoText(prev => prev + emoji)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-xl"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowMediaEditor(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuller
                </button>
                <button
                  onClick={() => setShowMediaEditor(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Gem Ændringer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}