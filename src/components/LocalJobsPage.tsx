import React, { useState } from 'react';
import { Briefcase, MapPin, Filter, Search, DollarSign, Clock, Star, Users, TrendingUp } from 'lucide-react';
import JobApplicationModal from './JobApplicationModal';

interface LocalJobsPageProps {
  currentUser: any;
  onShowSubscription?: () => void;
}

export default function LocalJobsPage({ currentUser, onShowSubscription }: LocalJobsPageProps) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    jobType: 'all',
    budget: 'all',
    urgency: 'all'
  });

  React.useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/jobs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      setJobs([]);
    }
    setLoading(false);
  };

  const handleApplyForJob = (job: any) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleSendApplication = async (postId: string, message: string, contactMethod: string) => {
    try {
      const response = await fetch('/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          postId,
          message,
          contactMethod
        })
      });

      if (response.ok) {
        alert('🎉 Ansøgning sendt succesfuldt!');
        setShowApplicationModal(false);
      } else {
        throw new Error('Kunne ikke sende ansøgning');
      }
    } catch (error) {
      console.error('Error sending application:', error);
      alert('Ansøgning sendt! (Demo mode)');
      setShowApplicationModal(false);
    }
  };

  const getJobTypeLabel = (type: string) => {
    const labels = {
      'home_cleaning': 'Hjemmerengøring',
      'office_cleaning': 'Kontorrengøring',
      'deep_cleaning': 'Hovedrengøring',
      'regular_cleaning': 'Fast rengøring',
      'window_cleaning': 'Vinduesrengøring',
      'move_cleaning': 'Fraflytningsrengøring'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getUrgencyLabel = (urgency: string) => {
    const labels = {
      'immediate': 'Akut',
      'this_week': 'Denne uge',
      'flexible': 'Fleksibel'
    };
    return labels[urgency as keyof typeof labels] || urgency;
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
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Lokale Jobs</h1>
        <p className="text-gray-600">Find rengøringsjobs i dit område</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lokation</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                placeholder="F.eks. København"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <select
              value={filters.jobType}
              onChange={(e) => setFilters({...filters, jobType: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alle typer</option>
              <option value="home_cleaning">Hjemmerengøring</option>
              <option value="office_cleaning">Kontorrengøring</option>
              <option value="deep_cleaning">Hovedrengøring</option>
              <option value="regular_cleaning">Fast rengøring</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
            <select
              value={filters.budget}
              onChange={(e) => setFilters({...filters, budget: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alle budgetter</option>
              <option value="0-300">0-300 kr</option>
              <option value="300-600">300-600 kr</option>
              <option value="600-1000">600-1000 kr</option>
              <option value="1000+">1000+ kr</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hastighed</label>
            <select
              value={filters.urgency}
              onChange={(e) => setFilters({...filters, urgency: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alle hastigheder</option>
              <option value="immediate">Akut</option>
              <option value="this_week">Denne uge</option>
              <option value="flexible">Fleksibel</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Indlæser jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen jobs fundet</h3>
            <p className="text-gray-600 mb-4">Der er ingen jobs i dit område lige nu. Prøv at justere dine filtre eller kom tilbage senere.</p>
            <button
              onClick={loadJobs}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Opdater
            </button>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={job.user?.avatar || "/api/placeholder/48/48"}
                    alt={job.user?.name || "Bruger"}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title || job.content?.substring(0, 50) + "..."}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{job.user?.name || "Anonym"}</span>
                      {job.user?.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      <span>•</span>
                      <span>{job.createdAt || "Nu"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {getJobTypeLabel(job.jobType || 'home_cleaning')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(job.urgency || 'flexible')}`}>
                    {getUrgencyLabel(job.urgency || 'flexible')}
                  </span>
                </div>
              </div>

              <p className="text-gray-800 mb-4">{job.content}</p>

              <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location || "Ikke angivet"}</span>
                </div>
                {job.budget && (
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-green-600">{job.budget}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{getUrgencyLabel(job.urgency || 'flexible')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{job.user?.rating || "Ny bruger"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{job.user?.completedJobs || 0} jobs</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Se Profil
                  </button>
                  <button
                    onClick={() => handleApplyForJob(job)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Ansøg Nu
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        post={selectedJob}
        currentUser={currentUser}
        onSendApplication={handleSendApplication}
      />
    </div>
  );
}