import React, { useState } from 'react';
import { MapPin, Search, Filter, Briefcase, DollarSign, Clock, Star, Users, Eye, Navigation } from 'lucide-react';

interface LocalJobsPageProps {
  currentUser?: any;
  onShowSubscription?: () => void;
}

export default function LocalJobsPage({ currentUser, onShowSubscription }: LocalJobsPageProps) {
  const [selectedArea, setSelectedArea] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock job data
  const jobs = [
    {
      id: '1',
      title: 'Hjemmerengøring - Moderne lejlighed',
      description: 'Søger pålidelig rengøringshjælp til mit hjem i København. Har brug for hjælp hver 14. dag, ca. 3 timer ad gangen.',
      location: 'København NV',
      budget: '350-400 kr',
      urgency: 'flexible',
      client: {
        name: 'Maria Hansen',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.9
      },
      applicants: 5,
      postedTime: '2 timer siden',
      jobType: 'home_cleaning'
    },
    {
      id: '2',
      title: 'Kontorrengøring - Startup',
      description: 'Vores kontor har brug for daglig rengøring. Vi er et lille team på 15 personer.',
      location: 'Aarhus C',
      budget: '600-800 kr',
      urgency: 'this_week',
      client: {
        name: 'Lars Nielsen',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.7
      },
      applicants: 12,
      postedTime: '5 timer siden',
      jobType: 'office_cleaning'
    },
    {
      id: '3',
      title: 'Hovedrengøring - Villa',
      description: 'AKUT: Stor villa har brug for grundig hovedrengøring før familiefest i weekenden.',
      location: 'Odense',
      budget: '2000-2500 kr',
      urgency: 'immediate',
      client: {
        name: 'Sofie Andersen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: 4.8
      },
      applicants: 8,
      postedTime: '1 time siden',
      jobType: 'deep_cleaning'
    }
  ];

  const areas = [
    { id: 'all', name: 'Alle områder', count: 156 },
    { id: 'storkobenhavn', name: 'Storkøbenhavn', count: 89 },
    { id: 'storaarhus', name: 'Storaarhus', count: 34 },
    { id: 'storodense', name: 'Storodense', count: 18 },
    { id: 'storaalborg', name: 'Storaalborg', count: 15 }
  ];

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'immediate': 'bg-red-100 text-red-800 border-red-200',
      'this_week': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'flexible': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[urgency as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getUrgencyLabel = (urgency: string) => {
    const labels = {
      'immediate': 'Akut',
      'this_week': 'Denne uge',
      'flexible': 'Fleksibel'
    };
    return labels[urgency as keyof typeof labels] || urgency;
  };

  const handleApply = (jobId: string) => {
    if (!currentUser?.isSubscribed) {
      onShowSubscription?.();
      return;
    }
    
    // Real job application
    applyForJob(jobId);
  };

  const handleViewDetails = (jobId: string) => {
    if (!currentUser?.isSubscribed) {
      onShowSubscription?.();
      return;
    }
    
    // Open job details modal or navigate to job page
    window.location.href = `/job/${jobId}`;
  };

  const applyForJob = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          message: 'Jeg er interesseret i dette job og vil gerne høre mere.'
        })
      });
      
      if (!response.ok) {
        throw new Error('Kunne ikke sende ansøgning');
      }
      
      alert('Ansøgning sendt! Kunden vil kontakte dig snart.');
      
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Der opstod en fejl ved ansøgning. Prøv igen.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Lokale Jobs</h1>
        <p className="text-gray-600">Find rengøringsjobs i dit område</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Area Filter */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name} ({area.count})
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Søg efter jobs, lokationer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Nyeste først</option>
            <option value="closest">Nærmeste først</option>
            <option value="budget">Højeste budget</option>
          </select>

          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Viser <span className="font-semibold">{jobs.length}</span> jobs i{' '}
          <span className="font-semibold">
            {areas.find(a => a.id === selectedArea)?.name || 'alle områder'}
          </span>
        </p>
      </div>

      {/* Job List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(job.urgency)}`}>
                    {getUrgencyLabel(job.urgency)}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{job.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
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
                    <span>{job.applicants} ansøgere</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={job.client.avatar}
                  alt={job.client.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{job.client.name}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{job.client.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewDetails(job.id)}
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Eye className="w-4 h-4" />
                  <span>Se detaljer</span>
                </button>
                <button
                  onClick={() => handleApply(job.id)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    currentUser?.isSubscribed
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>{currentUser?.isSubscribed ? 'Ansøg nu' : 'Kun Pro'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Indlæs flere jobs
        </button>
      </div>

      {/* Pro Upgrade for non-subscribers */}
      {!currentUser?.isSubscribed && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">🔒 Opgrader til Pro for at ansøge om jobs</h3>
            <p className="text-blue-800 mb-4">
              Som Pro medlem kan du ansøge om alle jobs og kontakte kunder direkte
            </p>
            <button
              onClick={onShowSubscription}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Bliv Pro Medlem - 29 kr/måned
            </button>
          </div>
        </div>
      )}
    </div>
  );
}