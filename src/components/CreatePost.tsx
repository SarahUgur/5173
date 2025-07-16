import React, { useState } from 'react';
import { Image, MapPin, DollarSign, Clock, Briefcase, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface CreatePostProps {
  currentUser: any;
}

export default function CreatePost({ currentUser }: CreatePostProps) {
  const { t } = useLanguage();
  const [postType, setPostType] = useState<'regular' | 'job'>('regular');
  const [content, setContent] = useState('');
  const [jobType, setJobType] = useState('home_cleaning');
  const [budget, setBudget] = useState('');
  const [urgency, setUrgency] = useState('flexible');
  const [location, setLocation] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post creation
    console.log('Creating post:', { postType, content, jobType, budget, urgency, location });
    // Reset form
    setContent('');
    setBudget('');
    setLocation('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6 mx-3 sm:mx-0">
      <div className="flex items-start space-x-3">
        <img
          src={currentUser?.avatar || "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
          alt="Your avatar"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          {/* Post Type Selector */}
          {(isExpanded || postType === 'job') && (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
              <button
                onClick={() => setPostType('regular')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  postType === 'regular'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('regularPost')}
              </button>
              <button
                onClick={() => setPostType('job')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
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
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {isExpanded && postType === 'job' && (
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('cleaningType')}</label>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="home_cleaning">{t('homeCleaning')}</option>
                      <option value="office_cleaning">{t('officeCleaning')}</option>
                      <option value="deep_cleaning">{t('deepCleaning')}</option>
                      <option value="regular_cleaning">{t('regularCleaning')}</option>
                      <option value="one_time">{t('oneTimeJob')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('urgency')}</label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="flexible">{t('flexible')}</option>
                      <option value="this_week">{t('thisWeek')}</option>
                      <option value="immediate">{t('immediate')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t('location')}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder={t('budget')}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {isExpanded && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
                  >
                    <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t('image')}</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t('location')}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!content.trim()}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                    content.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
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
    </div>
  );
}