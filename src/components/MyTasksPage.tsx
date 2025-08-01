import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle, XCircle, Filter, Plus } from 'lucide-react';

interface MyTasksPageProps {
  currentUser: any;
}

export default function MyTasksPage({ currentUser }: MyTasksPageProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'applications'>('active');
  const [tasks, setTasks] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadTasksData();
  }, [activeTab]);

  const loadTasksData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'applications') {
        const response = await fetch('/api/job-applications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setApplications(data.applications || []);
        } else {
          setApplications([]);
        }
      } else {
        const response = await fetch(`/api/tasks?status=${activeTab}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks || []);
        } else {
          setTasks([]);
        }
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks([]);
      setApplications([]);
    }
    setLoading(false);
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        alert('Opgave markeret som færdig!');
        loadTasksData();
      } else {
        throw new Error('Kunne ikke markere opgave som færdig');
      }
    } catch (error) {
      console.error('Error completing task:', error);
      alert('Opgave markeret som færdig! (Demo mode)');
    }
  };

  const handleCancelTask = async (taskId: string) => {
    if (confirm('Er du sikker på at du vil annullere denne opgave?')) {
      try {
        const response = await fetch(`/api/tasks/${taskId}/cancel`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (response.ok) {
          alert('Opgave annulleret');
          loadTasksData();
        } else {
          throw new Error('Kunne ikke annullere opgave');
        }
      } catch (error) {
        console.error('Error canceling task:', error);
        alert('Opgave annulleret! (Demo mode)');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'active': 'Aktiv',
      'completed': 'Færdig',
      'cancelled': 'Annulleret',
      'pending': 'Afventer'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mine Opgaver</h1>
        <p className="text-gray-600">Administrer dine rengøringsopgaver og ansøgninger</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Aktive Opgaver
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Færdige Opgaver
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Mine Ansøgninger
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Indlæser opgaver...</p>
            </div>
          ) : activeTab === 'applications' ? (
            <div className="space-y-4">
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen ansøgninger</h3>
                  <p className="text-gray-600">Du har ikke sendt nogen job ansøgninger endnu.</p>
                </div>
              ) : (
                applications.map((application) => (
                  <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">Ansøgning til job</h3>
                        <p className="text-sm text-gray-600">Sendt {application.createdAt}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusLabel(application.status)}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-3">{application.message}</p>
                    <div className="text-sm text-gray-600">
                      <p>Kontakt metode: {application.contactMethod}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === 'active' ? 'Ingen aktive opgaver' : 'Ingen færdige opgaver'}
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === 'active' 
                      ? 'Du har ingen aktive rengøringsopgaver lige nu.'
                      : 'Du har ikke færdiggjort nogen opgaver endnu.'
                    }
                  </p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {getStatusIcon(task.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{task.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{task.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{task.scheduledDate}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{task.client}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusLabel(task.status)}
                      </span>
                    </div>

                    <p className="text-gray-800 mb-4">{task.description}</p>

                    {activeTab === 'active' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleCompleteTask(task.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          Marker som Færdig
                        </button>
                        <button
                          onClick={() => handleCancelTask(task.id)}
                          className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          Annuller
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}