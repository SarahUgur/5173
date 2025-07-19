import React, { useState } from 'react';
import { Star, MapPin, Briefcase, Users, TrendingUp, Clock, DollarSign, ChevronRight } from 'lucide-react';

interface RecommendationWidgetProps {
  currentUser: any;
  onShowUserProfile?: (user: any) => void;
  onPageChange?: (page: string) => void;
}

export default function RecommendationWidget({ currentUser, onShowUserProfile, onPageChange }: RecommendationWidgetProps) {
  const [activeTab, setActiveTab] = useState<'users' | 'jobs' | 'trending'>('users');

  // Auto-close any dropdowns when clicking outside (if any are added later)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Future dropdown handling can be added here
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock recommendation data
  const recommendedUsers = [
    {
      id: '1',
      name: 'Emma Larsen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'cleaner',
      location: 'København',
      rating: 4.9,
      mutualFriends: 3,
      reason: 'Arbejder i samme område',
      verified: true
    },
    {
      id: '2',
      name: 'Michael Sørensen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'private',
      location: 'Aarhus',
      rating: 4.7,
      mutualFriends: 7,
      reason: 'Fælles interesser',
      verified: false
    },
    {
      id: '3',
      name: 'Anna Nielsen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      userType: 'small_business',
      location: 'Odense',
      rating: 4.8,
      mutualFriends: 2,
      reason: 'Lignende virksomhed',
      verified: true
    }
  ];

  const recommendedJobs = [
    {
      id: '1',
      title: 'Hjemmerengøring - Moderne lejlighed',
      location: 'København NV',
      budget: '350-400 kr',
      distance: '2.3 km',
      urgency: 'flexible',
      postedTime: '3 timer siden',
      matchScore: 95
    },
    {
      id: '2',
      title: 'Kontorrengøring - Startup',
      location: 'Aarhus C',
      budget: '600-800 kr',
      distance: '1.8 km',
      urgency: 'this_week',
      postedTime: '5 timer siden',
      matchScore: 88
    },
    {
      id: '3',
      title: 'Hovedrengøring - Villa',
      location: 'Odense SV',
      budget: '2000-2500 kr',
      distance: '5.2 km',
      urgency: 'immediate',
      postedTime: '1 time siden',
      matchScore: 92
    }
  ];

  const trendingTopics = [
    { topic: 'Miljøvenlig rengøring', posts: 45, growth: '+24%', color: 'text-green-600' },
    { topic: 'Kontorrengøring', posts: 32, growth: '+18%', color: 'text-blue-600' },
    { topic: 'Hovedrengøring', posts: 28, growth: '+15%', color: 'text-purple-600' },
    { topic: 'Vinduesrengøring', posts: 19, growth: '+12%', color: 'text-orange-600' },
    { topic: 'Tæpperengøring', posts: 15, growth: '+8%', color: 'text-pink-600' }
  ];

  const getUserTypeLabel = (type: string) => {
    const labels = {
      'private': 'Privat kunde',
      'cleaner': 'Rengøringsekspert',
      'small_business': 'Lille virksomhed',
      'large_business': 'Stor virksomhed'
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Anbefalinger til dig</h3>
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm ${
              activeTab === 'users' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            <Users className="w-4 h-4 mx-auto mb-1" />
            Personer
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm ${
              activeTab === 'jobs' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            <Briefcase className="w-4 h-4 mx-auto mb-1" />
            Jobs
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm ${
              activeTab === 'trending' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
          >
            <TrendingUp className="w-4 h-4 mx-auto mb-1" />
            Trending
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'users' && (
          <div className="space-y-4">
            {recommendedUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="relative">
                  <>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={() => onShowUserProfile?.(user)}
                    />
                    {user.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </>
                </div>
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => onShowUserProfile?.(user)}
                    className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 text-left"
                  >
                    {user.name}
                  </button>
                  <p className="text-sm text-gray-600">{getUserTypeLabel(user.userType)}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{user.location}</span>
                    <span>•</span>
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{user.rating}</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">{user.reason}</p>
                </div>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm">
                  Følg
                </button>
              </div>
            ))}
            <button 
              onClick={() => onPageChange?.('network')}
              className="w-full flex items-center justify-center space-x-2 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <span className="text-sm font-medium">Se alle anbefalinger</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{job.title}</h4>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {job.matchScore}% match
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{job.location} • {job.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-3 h-3" />
                    <span>{job.budget}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{job.postedTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(job.urgency)}`}>
                    {job.urgency === 'immediate' ? 'Akut' : job.urgency === 'this_week' ? 'Denne uge' : 'Fleksibel'}
                  </span>
                  <button 
                    onClick={() => {
                      // Simuler følg funktionalitet
                      alert(`Du følger nu ${user.name}!`);
                    }}
                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-200"
                  >
                    Ansøg
                  </button>
                </div>
              </div>
            ))}
            <button 
              onClick={() => onPageChange?.('local')}
              className="w-full flex items-center justify-center space-x-2 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <span className="text-sm font-medium">Se alle jobs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{topic.topic}</h4>
                  <p className="text-xs text-gray-600">{topic.posts} opslag</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${topic.color}`}>{topic.growth}</span>
                  <TrendingUp className={`w-4 h-4 ${topic.color} ml-1 inline`} />
                </div>
              </div>
            ))}
            <button 
              onClick={() => onPageChange?.('trending')}
              className="w-full flex items-center justify-center space-x-2 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <span className="text-sm font-medium">Se alle trends</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}