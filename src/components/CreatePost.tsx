import React, { useState } from 'react';
import { Image, MapPin, DollarSign, Clock, Briefcase, X, Users, Building, Home, Car, Shirt } from 'lucide-react';
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
  };

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

            {isExpanded && postType === 'job' && (
              <div className="mt-4 space-y-4">
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
                  <div className="space-y-3">
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
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-200 text-sm hover:scale-105"
                  >
                    <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{t('image')}</span>
                  </button>
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
    </div>
  );
}