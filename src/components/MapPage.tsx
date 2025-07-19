import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Filter, Search, Briefcase, DollarSign, Clock, Star, Users, Layers, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from 'lucide-react';

interface MapPageProps {
  currentUser: any;
}

interface JobLocation {
  id: string;
  title: string;
  location: string;
  address: string;
  lat: number;
  lng: number;
  budget: string;
  urgency: string;
  distance: string;
  client: {
    name: string;
    avatar: string;
    rating: number;
  };
  jobType: string;
}

export default function MapPage({ currentUser }: MapPageProps) {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobLocation | null>(null);
  const [mapFilter, setMapFilter] = useState('all');
  const [searchRadius, setSearchRadius] = useState(10); // km
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [mapZoom, setMapZoom] = useState(12);
  const [mapCenter, setMapCenter] = useState({ lat: 55.6761, lng: 12.5683 }); // København centrum
  const [showGoogleMapsEmbed, setShowGoogleMapsEmbed] = useState(false);
  const [selectedArea, setSelectedArea] = useState('all');

  // Mock job locations med rigtige adresser
  const jobLocations: JobLocation[] = [
    {
      id: '1',
      title: 'Hjemmerengøring - Moderne lejlighed',
      location: 'Østerbro, København',
      address: 'Øster Allé 42, 2100 København Ø',
      lat: 55.7058,
      lng: 12.5653,
      budget: '350-400 kr',
      urgency: 'flexible',
      distance: '2.3 km',
      client: {
        name: 'Maria Hansen',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.9
      },
      jobType: 'home_cleaning'
    },
    {
      id: '2',
      title: 'Kontorrengøring - Startup',
      location: 'Nørrebro, København',
      address: 'Nørrebrogade 165, 2200 København N',
      lat: 55.6867,
      lng: 12.5536,
      budget: '600-800 kr',
      urgency: 'this_week',
      distance: '1.8 km',
      client: {
        name: 'Lars Nielsen',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.7
      },
      jobType: 'office_cleaning'
    },
    {
      id: '3',
      title: 'Hovedrengøring - Villa',
      location: 'Frederiksberg',
      address: 'Frederiksberg Allé 12, 1820 Frederiksberg C',
      lat: 55.6761,
      lng: 12.5342,
      budget: '2000-2500 kr',
      urgency: 'immediate',
      distance: '3.2 km',
      client: {
        name: 'Sofie Andersen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.8
      },
      jobType: 'deep_cleaning'
    },
    {
      id: '4',
      title: 'Butikslokale rengøring',
      location: 'Vesterbro, København',
      address: 'Vesterbrogade 89, 1620 København V',
      lat: 55.6736,
      lng: 12.5504,
      budget: '500-700 kr',
      urgency: 'this_week',
      distance: '1.5 km',
      client: {
        name: 'Peter Larsen',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.6
      },
      jobType: 'office_cleaning'
    },
    {
      id: '5',
      title: 'Lejlighed rengøring',
      location: 'Amager, København',
      address: 'Amagerbrogade 200, 2300 København S',
      lat: 55.6586,
      lng: 12.6022,
      budget: '300-350 kr',
      urgency: 'flexible',
      distance: '4.1 km',
      client: {
        name: 'Anna Nielsen',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.5
      },
      jobType: 'home_cleaning'
    }
  ];

  const getUserLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Fejl ved hentning af lokation:', error);
          setIsGettingLocation(false);
          // Fallback til København centrum
          setUserLocation({ lat: 55.6761, lng: 12.5683 });
          setMapCenter({ lat: 55.6761, lng: 12.5683 });
          alert('Kunne ikke få din præcise lokation. Viser København centrum.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      alert('Din browser understøtter ikke geolocation');
      setIsGettingLocation(false);
      setUserLocation({ lat: 55.6761, lng: 12.5683 });
    }
  };

  useEffect(() => {
    // Auto-get location on component mount
    getUserLocation();
  }, []);

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 8));
  };

  const handleResetView = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      setMapZoom(12);
    }
  };

  const openGoogleMapsWithJobs = () => {
    if (userLocation) {
      // Opret URL med alle job lokationer som waypoints
      const jobCoords = filteredJobs.map(job => `${job.lat},${job.lng}`).join('|');
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${jobCoords}/@${userLocation.lat},${userLocation.lng},${mapZoom}z`;
      window.open(url, '_blank');
    }
  };

  const openJobInGoogleMaps = (job: JobLocation) => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(job.address)}/@${job.lat},${job.lng},15z`;
    window.open(url, '_blank');
  };

  const getJobTypeColor = (type: string) => {
    const colors = {
      'home_cleaning': 'bg-blue-500',
      'office_cleaning': 'bg-green-500',
      'deep_cleaning': 'bg-purple-500',
      'regular_cleaning': 'bg-orange-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'immediate': 'border-red-500 bg-red-50',
      'this_week': 'border-yellow-500 bg-yellow-50',
      'flexible': 'border-green-500 bg-green-50'
    };
    return colors[urgency as keyof typeof colors] || 'border-gray-500 bg-gray-50';
  };

  const filteredJobs = jobLocations.filter(job => {
    if (mapFilter === 'all') return true;
    return job.jobType === mapFilter;
  });

  // Generer Google Maps Embed URL med jobs
  const generateGoogleMapsEmbedUrl = () => {
    if (!userLocation) return '';
    
    const baseUrl = 'https://www.google.com/maps/embed/v1/search';
    const apiKey = 'AIzaSyBFw0Qcb2BdgMDuq8HiMSyJOVEg'; // Demo key - skal erstattes med rigtig
    const query = encodeURIComponent('rengøring København');
    
    return `${baseUrl}?key=${apiKey}&q=${query}&center=${userLocation.lat},${userLocation.lng}&zoom=${mapZoom}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Jobs på Kort</h1>
        <p className="text-gray-600">Find rengøringsjobs i dit område med interaktivt Google Maps</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Location Button */}
          <button
            onClick={getUserLocation}
            disabled={isGettingLocation}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              userLocation 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>
              {isGettingLocation ? 'Finder lokation...' : 
               userLocation ? 'Lokation fundet' : 'Find min lokation'}
            </span>
          </button>

          {/* Area Filter */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {areas.map((area) => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>

          {/* Google Maps Toggle */}
          <button
            onClick={() => setShowGoogleMapsEmbed(!showGoogleMapsEmbed)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              showGoogleMapsEmbed 
                ? 'bg-red-100 text-red-700' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{showGoogleMapsEmbed ? 'Skjul Google Maps' : 'Vis Google Maps'}</span>
          </button>

          {/* Open Google Maps with Jobs */}
          <button
            onClick={openGoogleMapsWithJobs}
            disabled={!userLocation}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Åbn i Google Maps</span>
          </button>

          {/* Filter */}
          <select
            value={mapFilter}
            onChange={(e) => setMapFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Alle job typer</option>
            <option value="home_cleaning">Hjemmerengøring</option>
            <option value="office_cleaning">Kontorrengøring</option>
            <option value="deep_cleaning">Hovedrengøring</option>
          </select>

          {/* Search Radius */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Radius: {searchRadius}km</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Zoom Controls */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Zoom: {mapZoom}</span>
            </div>
            <input
              type="range"
              min="8"
              max="18"
              value={mapZoom}
              onChange={(e) => setMapZoom(Number(e.target.value))}
              className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span>{filteredJobs.length} jobs fundet</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Map Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {showGoogleMapsEmbed ? 'Google Maps' : 'Interaktivt Kort'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Zoom: {mapZoom} • Radius: {searchRadius}km • {filteredJobs.length} jobs
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleResetView}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    title="Nulstil visning"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Layers className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Filter className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Google Maps Embed eller Mock Map */}
            <div className="relative h-96">
              {showGoogleMapsEmbed && userLocation ? (
                <iframe
                  src={generateGoogleMapsEmbedUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-xl"
                />
              ) : (
                <div className="relative h-full bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      {/* Streets */}
                      <path d="M0,150 L400,150" stroke="#666" strokeWidth="2" />
                      <path d="M200,0 L200,300" stroke="#666" strokeWidth="2" />
                      <path d="M0,100 L400,100" stroke="#999" strokeWidth="1" />
                      <path d="M0,200 L400,200" stroke="#999" strokeWidth="1" />
                      <path d="M100,0 L100,300" stroke="#999" strokeWidth="1" />
                      <path d="M300,0 L300,300" stroke="#999" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* User Location */}
                  {userLocation && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse" style={{ transform: `scale(${mapZoom / 12})` }}></div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-blue-600 text-white px-2 py-1 rounded whitespace-nowrap">
                        Din lokation
                      </div>
                    </div>
                  )}

                  {/* Job Markers med adresser */}
                  {filteredJobs.map((job, index) => (
                    <div
                      key={job.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                        index === 0 ? 'top-1/3 left-2/3' :
                        index === 1 ? 'top-2/3 left-1/3' :
                        index === 2 ? 'top-1/4 left-3/4' :
                        index === 3 ? 'top-3/4 left-2/3' :
                        'top-1/6 left-1/4'
                      }`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${getJobTypeColor(job.jobType)} hover:scale-110 transition-transform duration-200`} style={{ transform: `scale(${mapZoom / 12})` }}>
                        <div className="w-full h-full rounded-full animate-ping opacity-75"></div>
                      </div>
                      {selectedJob?.id === job.id && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 border border-gray-200"></div>
                      )}
                      
                      {/* Adresse tooltip */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200">
                        {job.address}
                      </div>
                    </div>
                  ))}

                  {/* Search Radius Circle */}
                  {userLocation && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div 
                        className="border-2 border-blue-300 border-dashed rounded-full opacity-50"
                        style={{
                          width: `${searchRadius * (mapZoom / 3)}px`,
                          height: `${searchRadius * (mapZoom / 3)}px`
                        }}
                      ></div>
                    </div>
                  )}

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button onClick={handleZoomIn} className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 shadow-sm transition-all duration-200 hover:scale-110">
                      <ZoomIn className="w-4 h-4 text-gray-600" />
                    </button>
                    <button onClick={handleZoomOut} className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 shadow-sm transition-all duration-200 hover:scale-110">
                      <ZoomOut className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">Legende</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Hjemmerengøring</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Kontorrengøring</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span>Hovedrengøring</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job Details Sidebar */}
        <div className="space-y-6">
          {/* Selected Job Details */}
          {selectedJob ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Job Detaljer</h3>
              
              <div className={`p-4 rounded-lg border-2 ${getUrgencyColor(selectedJob.urgency)} mb-4`}>
                <h4 className="font-medium text-gray-900 mb-2">{selectedJob.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{selectedJob.location}</p>
                      <p className="text-gray-600">{selectedJob.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-green-600">{selectedJob.budget}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4 text-gray-500" />
                    <span>{selectedJob.distance} fra dig</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={selectedJob.client.avatar}
                  alt={selectedJob.client.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{selectedJob.client.name}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{selectedJob.client.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Ansøg Nu
                </button>
                <button 
                  onClick={() => openJobInGoogleMaps(selectedJob)}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Se i Google Maps</span>
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Detaljer
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Vælg et job</h3>
              <p className="text-gray-600 text-sm">Klik på en markør på kortet for at se job detaljer og adresse</p>
            </div>
          )}

          {/* Nearby Jobs List med adresser */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Jobs i Nærheden</h3>
            <div className="space-y-3">
              {filteredJobs.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                    selectedJob?.id === job.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-4 h-4 rounded-full ${getJobTypeColor(job.jobType)} mt-1 flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{job.title}</h4>
                      <p className="text-xs text-gray-600">{job.location}</p>
                      <p className="text-xs text-gray-500 truncate">{job.address}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-medium text-green-600">{job.budget}</span>
                        <span className="text-xs text-gray-500">{job.distance}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openJobInGoogleMaps(job);
                        }}
                        className="mt-1 text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Se i Maps</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Område Statistik</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Jobs i {searchRadius}km radius</span>
                <span className="font-semibold text-blue-600">{filteredJobs.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Gennemsnitlig budget</span>
                <span className="font-semibold text-green-600">650 kr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Aktive kunder</span>
                <span className="font-semibold text-purple-600">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Gennemsnitlig afstand</span>
                <span className="font-semibold text-orange-600">2.8 km</span>
              </div>
            </div>
          </div>

          {/* Map Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3">🗺️ Sådan Bruger Du Kortet</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• <strong>Hover over markører</strong> for at se adresser</p>
              <p>• <strong>Klik på markører</strong> for job detaljer</p>
              <p>• <strong>Brug sliders</strong> til zoom og radius</p>
              <p>• <strong>Toggle Google Maps</strong> for rigtig kort</p>
              <p>• <strong>"Se i Maps"</strong> åbner specifik adresse</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}