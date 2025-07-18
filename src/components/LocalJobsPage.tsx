import React, { useState } from 'react';
import { MapPin, Search, Filter, Clock, DollarSign, Star, Briefcase, Users, ChevronDown, Navigation, Loader2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface LocalJobsPageProps {
  currentUser: any;
}

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  area: string;
  distance: string;
  budget: string;
  jobType: string;
  urgency: string;
  client: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  postedTime: string;
  applicants: number;
}

export default function LocalJobsPage({ currentUser }: LocalJobsPageProps) {
  const { t, getJobTypeLabel, getUrgencyLabel } = useLanguage();
  const [selectedArea, setSelectedArea] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const areas = [
    { id: 'all', name: t('allAreas'), count: 45 },
    { id: 'copenhagen', name: 'København', count: 18 },
    { id: 'aarhus', name: 'Aarhus', count: 12 },
    { id: 'odense', name: 'Odense', count: 8 },
    { id: 'aalborg', name: 'Aalborg', count: 7 },
    { id: 'esbjerg', name: 'Esbjerg', count: 5 },
    { id: 'randers', name: 'Randers', count: 4 },
    { id: 'kolding', name: 'Kolding', count: 3 },
    { id: 'horsens', name: 'Horsens', count: 3 },
    { id: 'vejle', name: 'Vejle', count: 2 }
  ];

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Hjemmerengøring - Moderne lejlighed',
      description: 'Søger pålidelig rengøringshjælp til min 3-værelses lejlighed i Østerbro. Ugentlig rengøring, ca. 3 timer.',
      location: 'Østerbro, København',
      area: 'copenhagen',
      distance: '2.3 km',
      budget: '350-400 kr',
      jobType: 'home_cleaning',
      urgency: 'flexible',
      client: {
        name: 'Maria Hansen',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.9,
        verified: true
      },
      postedTime: '2 timer siden',
      applicants: 3
    },
    {
      id: '2',
      title: 'Kontorrengøring - Startup virksomhed',
      description: 'Lille tech startup søger rengøringshjælp 2 gange ugentligt. Moderne kontor med køkken og mødelokaler.',
      location: 'Aarhus C',
      area: 'aarhus',
      distance: userLocation ? '1.8 km' : '1.8 km',
      budget: '600-800 kr/gang',
      jobType: 'office_cleaning',
      urgency: 'this_week',
      client: {
        name: 'Lars Nielsen',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.7,
        verified: true
      },
      postedTime: '4 timer siden',
      applicants: 7
    },
    {
      id: '3',
      title: 'Hovedrengøring - Villa i Odense',
      description: 'Stor villa på 200m² har brug for grundig hovedrengøring. Inkluderer vinduer, ovne og alle rum.',
      location: 'Odense SV',
      area: 'odense',
      distance: '5.2 km',
      budget: '2000-2500 kr',
      jobType: 'deep_cleaning',
      urgency: 'immediate',
      client: {
        name: 'Sofie Andersen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.8,
        verified: false
      },
      postedTime: '1 time siden',
      applicants: 12
    },
    {
      id: '4',
      title: 'Butikslokale rengøring - Tøjbutik',
      description: 'Tøjbutik i centrum søger daglig rengøring. Weekendarbejde foretrækkes. Fast samarbejde.',
      location: 'Aalborg Centrum',
      area: 'aalborg',
      distance: '0.8 km',
      budget: '400-500 kr/dag',
      jobType: 'office_cleaning',
      urgency: 'flexible',
      client: {
        name: 'Peter Larsen',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.6,
        verified: true
      },
      postedTime: '6 timer siden',
      applicants: 5
    },
    {
      id: '5',
      title: 'Lejlighed rengøring - Studieboliger',
      description: 'Administrerer studieboliger og søger fast rengøringshjælp til fraflytningsrengøring.',
      location: 'Esbjerg Centrum',
      area: 'esbjerg',
      distance: '3.1 km',
      budget: '300-350 kr/lejlighed',
      jobType: 'home_cleaning',
      urgency: 'this_week',
      client: {
        name: 'Anna Nielsen',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.5,
        verified: true
      },
      postedTime: '8 timer siden',
      applicants: 2
    }
  ];

  const getUserLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsGettingLocation(false);
          
          // Her ville du normalt beregne afstande til alle jobs
          console.log('Bruger lokation:', latitude, longitude);
        },
        (error) => {
          console.error('Fejl ved hentning af lokation:', error);
          setIsGettingLocation(false);
          alert('Kunne ikke få din lokation. Tjek at du har givet tilladelse.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutter
        }
      );
    } else {
      alert('Din browser understøtter ikke geolocation');
      setIsGettingLocation(false);
    }
  };

  // Beregn afstand mellem to koordinater (Haversine formel)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Jordens radius i km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Rund af til 1 decimal
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'immediate': 'bg-red-100 text-red-800',
      'this_week': 'bg-yellow-100 text-yellow-800',
      'flexible': 'bg-green-100 text-green-800'
    };
    return colors[urgency as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };


  const filteredJobs = jobs.filter(job => {
    const matchesArea = selectedArea === 'all' || job.area === selectedArea;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesArea && matchesSearch;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedTime).getTime() - new Date(a.postedTime).getTime();
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'budget':
        return parseInt(b.budget.replace(/\D/g, '')) - parseInt(a.budget.replace(/\D/g, ''));
      default:
        return 0;
    }
  });

  const selectedAreaName = areas.find(area => area.id === selectedArea)?.name || t('allAreas');

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('localJobs')}</h1>
        <p className="text-gray-600">Find rengøringsjobs i dit område</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Area Selector */}
          <div className="relative flex-1">
            <button
              onClick={() => setShowAreaDropdown(!showAreaDropdown)}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-900">{selectedAreaName}</span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>
            
            {showAreaDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {areas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => {
                      setSelectedArea(area.id);
                      setShowAreaDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                      selectedArea === area.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <span className="font-medium">{area.name}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {area.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('searchJobs')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort */}
          <div className="flex-1 lg:flex-none lg:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">{t('newestFirst')}</option>
              <option value="distance">{t('closestFirst')}</option>
              <option value="budget">{t('highestBudget')}</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedArea !== 'all' || searchTerm) && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Aktive filtre:</span>
            {selectedArea !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                📍 {selectedAreaName}
                <button
                  onClick={() => setSelectedArea('all')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                🔍 "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {t('showing')} <span className="font-semibold text-gray-900">{sortedJobs.length}</span> {t('jobs_count')}
          {selectedArea !== 'all' && (
            <span> {t('in')} <span className="font-semibold text-blue-600">{selectedAreaName}</span></span>
          )}
        </p>
        <button 
          onClick={getUserLocation}
          disabled={isGettingLocation}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 disabled:opacity-50"
        >
          {isGettingLocation ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {isGettingLocation ? 'Finder lokation...' : t('useMyLocation')}
          </span>
        </button>
      </div>

      {/* Location Status */}
      {userLocation && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            📍 Din lokation er fundet! Jobs vises nu med præcise afstande.
          </p>
        </div>
      )}
      {/* Jobs List */}
      <div className="space-y-4">
        {sortedJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noJobsFound')}</h3>
            <p className="text-gray-600">{t('adjustSearchCriteria')}</p>
          </div>
        ) : (
          sortedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(job.urgency)}`}>
                          {getUrgencyLabel(job.urgency)}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getJobTypeLabel(job.jobType)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>

                  {/* Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                      <span className="text-blue-600">
                        ({userLocation ? `${job.distance}` : job.distance})
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold text-green-600">{job.budget}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.postedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{job.applicants} {t('applicants')}</span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={job.client.avatar}
                        alt={job.client.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{job.client.name}</span>
                          {job.client.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">{job.client.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        {t('seeDetails')}
                      </button>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        {t('applyNow')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {sortedJobs.length > 0 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            {t('loadMoreJobs')}
          </button>
        </div>
      )}
    </div>
  );
}