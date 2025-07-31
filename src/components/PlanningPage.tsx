import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Plus, Filter, ChevronLeft, ChevronRight, X, Briefcase, DollarSign } from 'lucide-react';

interface PlanningPageProps {
  currentUser: any;
}

export default function PlanningPage({ currentUser }: PlanningPageProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDateForPost, setSelectedDateForPost] = useState<Date | null>(null);
  const [newPostData, setNewPostData] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    time: '',
    jobType: 'home_cleaning',
    urgency: 'flexible'
  });

  // Real appointments from API
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadAppointments();
  }, [selectedDate]);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/appointments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
    setLoading(false);
  };

  // Generate calendar days for selected month
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    // Første dag i måneden
    const firstDay = new Date(year, month, 1);
    // Sidste dag i måneden
    const lastDay = new Date(year, month + 1, 0);
    // Hvilken ugedag starter måneden på (0 = søndag, 1 = mandag, etc.)
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Konverter til mandag = 0
    
    const days = [];
    
    // Tilføj tomme celler for dage før månedens start
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Tilføj alle dage i måneden
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'regular_cleaning': 'Fast rengøring',
      'office_cleaning': 'Kontorrengøring',
      'deep_cleaning': 'Hovedrengøring',
      'home_cleaning': 'Hjemmerengøring'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => isSameDay(apt.date, date));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDateForPost(date);
    setShowCreateModal(true);
  };

  const handleCreatePost = async () => {
    if (!selectedDateForPost || !newPostData.title || !newPostData.location) {
      alert('Udfyld venligst titel og lokation');
      return;
    }

    try {
      // Opret opslag med specifik dato
      const postData = {
        ...newPostData,
        scheduledDate: selectedDateForPost.toISOString(),
        type: 'job',
        content: `${newPostData.title} - ${newPostData.description}`,
        isScheduled: true
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        alert(`🎉 Opslag planlagt til ${selectedDateForPost.toLocaleDateString('da-DK')}!`);
        setShowCreateModal(false);
        setNewPostData({
          title: '',
          description: '',
          location: '',
          budget: '',
          time: '',
          jobType: 'home_cleaning',
          urgency: 'flexible'
        });
      } else {
        throw new Error('Kunne ikke oprette opslag');
      }
    } catch (error) {
      console.error('Error creating scheduled post:', error);
      alert('Kunne ikke oprette opslag. Prøv igen.');
    }
  };

  const monthNames = [
    'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'December'
  ];

  const dayNames = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Planlægning</h1>
        <p className="text-gray-600">Administrer dine rengøringsaftaler og planlæg nye opgaver</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Uge
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Måned
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => {
              setSelectedDateForPost(new Date());
              setShowCreateModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ny Aftale</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => setSelectedDate(new Date())}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                >
                  I dag
                </button>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {dayNames.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((date, index) => {
                if (!date) {
                  return <div key={index} className="p-2"></div>;
                }
                
                const dayAppointments = getAppointmentsForDate(date);
                const isCurrentDay = isToday(date);
                
                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`p-2 text-center text-sm cursor-pointer rounded-lg transition-all duration-200 hover:bg-blue-50 relative ${
                      isCurrentDay 
                        ? 'bg-blue-600 text-white font-bold' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="relative z-10">{date.getDate()}</span>
                    
                    {/* Appointment indicators */}
                    {dayAppointments.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {dayAppointments.slice(0, 3).map((apt, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              apt.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                          />
                        ))}
                        {dayAppointments.length > 3 && (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Bekræftet</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Afventer</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span>I dag</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedDateForPost ? 
                `${selectedDateForPost.toLocaleDateString('da-DK')} aftaler` : 
                'I dag\'s aftaler'
              }
            </h3>
            <div className="space-y-4">
              {appointments
                .filter(apt => selectedDateForPost ? isSameDay(apt.date, selectedDateForPost) : isToday(apt.date))
               .length === 0 && !loading ? (
                 <div className="text-center py-8">
                   <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                   <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen aftaler</h3>
                   <p className="text-gray-600">
                     {selectedDateForPost ? 
                       `Ingen aftaler den ${selectedDateForPost.toLocaleDateString('da-DK')}` :
                       'Du har ingen aftaler i dag'
                     }
                   </p>
                   <button
                     onClick={() => {
                       setSelectedDateForPost(selectedDateForPost || new Date());
                       setShowCreateModal(true);
                     }}
                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-4"
                   >
                 appointments
                   .filter(apt => selectedDateForPost ? isSameDay(apt.date, selectedDateForPost) : isToday(apt.date))
                   .map((appointment, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status === 'confirmed' ? 'Bekræftet' : 
                       appointment.status === 'pending' ? 'Afventer' : 'Aflyst'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{appointment.client}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {getTypeLabel(appointment.type)}
                    </span>
                  </div>
                </div>
              )))}
              
              {appointments.filter(apt => selectedDateForPost ? isSameDay(apt.date, selectedDateForPost) : isToday(apt.date)).length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen aftaler</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedDateForPost ? 
                      `Ingen aftaler den ${selectedDateForPost.toLocaleDateString('da-DK')}` :
                      'Du har ingen aftaler i dag'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDateForPost(selectedDateForPost || new Date());
                      setShowCreateModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Opret Aftale
                  </button>
                </div>
              )}

             {loading && (
               <div className="text-center py-8">
                 <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                 <p className="text-gray-600">Indlæser aftaler...</p>
               </div>
             )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Denne måned</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bekræftede aftaler</span>
                <span className="font-semibold text-green-600">
                  {appointments.filter(apt => apt.status === 'confirmed').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Afventende aftaler</span>
                <span className="font-semibold text-yellow-600">
                  {appointments.filter(apt => apt.status === 'pending').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Estimeret indtjening</span>
                <span className="font-semibold text-blue-600">4.200 kr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && selectedDateForPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Opret Planlagt Opslag</h2>
                <p className="text-gray-600">
                  Opret et job opslag til {selectedDateForPost.toLocaleDateString('da-DK', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titel</label>
                  <input
                    type="text"
                    value={newPostData.title}
                    onChange={(e) => setNewPostData({...newPostData, title: e.target.value})}
                    placeholder="F.eks. Hjemmerengøring søges"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivelse</label>
                  <textarea
                    value={newPostData.description}
                    onChange={(e) => setNewPostData({...newPostData, description: e.target.value})}
                    placeholder="Beskriv rengøringsopgaven detaljeret..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lokation</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={newPostData.location}
                        onChange={(e) => setNewPostData({...newPostData, location: e.target.value})}
                        placeholder="F.eks. København NV"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget (valgfrit)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={newPostData.budget}
                        onChange={(e) => setNewPostData({...newPostData, budget: e.target.value})}
                        placeholder="F.eks. 300-400 kr"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tidspunkt (valgfrit)</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        value={newPostData.time}
                        onChange={(e) => setNewPostData({...newPostData, time: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type rengøring</label>
                    <select
                      value={newPostData.jobType}
                      onChange={(e) => setNewPostData({...newPostData, jobType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="home_cleaning">Hjemmerengøring</option>
                      <option value="office_cleaning">Kontorrengøring</option>
                      <option value="deep_cleaning">Hovedrengøring</option>
                      <option value="regular_cleaning">Fast rengøring</option>
                      <option value="window_cleaning">Vinduesrengøring</option>
                      <option value="move_cleaning">Fraflytningsrengøring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hastighed</label>
                  <select
                    value={newPostData.urgency}
                    onChange={(e) => setNewPostData({...newPostData, urgency: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="flexible">Fleksibel</option>
                    <option value="this_week">Denne uge</option>
                    <option value="immediate">Akut</option>
                  </select>
                </div>

                {/* Preview */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">📅 Preview af dit planlagte opslag:</h4>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <img
                        src={currentUser?.avatar}
                        alt="Din avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{currentUser?.name}</p>
                        <p className="text-xs text-gray-600">
                          Planlagt til {selectedDateForPost.toLocaleDateString('da-DK')}
                          {newPostData.time && ` kl. ${newPostData.time}`}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800 text-sm mb-2">
                      <strong>{newPostData.title || 'Din titel kommer her'}</strong>
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      {newPostData.description || 'Din beskrivelse kommer her...'}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📍 {newPostData.location || 'Lokation'}</span>
                      {newPostData.budget && <span>💰 {newPostData.budget}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Annuller
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostData.title || !newPostData.location}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📅 Planlæg Opslag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}