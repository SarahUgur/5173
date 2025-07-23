import React, { useState } from 'react';
import { Briefcase, Clock, MapPin, DollarSign, Star, Filter, Search, CheckCircle, XCircle, Eye } from 'lucide-react';

interface MyTasksPageProps {
  currentUser: any;
}

export default function MyTasksPage({ currentUser }: MyTasksPageProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'applications'>('active');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Hjælpefunktion til at generere fremtidige datoer
  const getFutureDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  };
  
  const getPastDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  };

  const activeTasks = [
    {
      id: '1',
      title: 'Hjemmerengøring - Familie Hansen',
      description: 'Ugentlig rengøring af 3-værelses lejlighed. Inkluderer støvsugning, gulvvask og badeværelse.',
      location: 'København NV',
      budget: '350 kr/gang',
      client: 'Maria Hansen',
      clientAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.9,
      nextDate: getFutureDate(3),
      status: 'ongoing'
    },
    {
      id: '2',
      title: 'Kontorrengøring - TechCorp',
      description: 'Daglig rengøring af kontorområde med 20 arbejdspladser. Inkluderer køkken og mødelokaler.',
      location: 'Aarhus C',
      budget: '800 kr/dag',
      client: 'Sofie Andersen',
      clientAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.7,
      nextDate: getFutureDate(1),
      status: 'ongoing'
    }
  ];

  const completedTasks = [
    {
      id: '3',
      title: 'Hovedrengøring - Villa Østerbro',
      description: 'Omfattende hovedrengøring af 5-værelses villa inkl. vinduer og ovne.',
      location: 'København Ø',
      budget: '2.500 kr',
      client: 'Peter Larsen',
      clientAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5.0,
      completedDate: getPastDate(5),
      earnings: '2.500 kr'
    }
  ];

  const applications = [
    {
      id: '4',
      title: 'Butikslokale rengøring',
      description: 'Ugentlig rengøring af tøjbutik i Strøget. Weekendarbejde foretrækkes.',
      location: 'København K',
      budget: '600 kr/gang',
      client: 'Anna Nielsen',
      clientAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      appliedDate: getPastDate(2),
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ongoing': return 'Aktiv';
      case 'pending': return 'Afventer';
      case 'completed': return 'Afsluttet';
      default: return status;
    }
  };

  const renderTaskCard = (task: any, type: 'active' | 'completed' | 'application') => (
    <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{task.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{task.budget}</span>
            </div>
            {task.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{task.rating}</span>
              </div>
            )}
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {getStatusLabel(task.status)}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={task.clientAvatar}
            alt={task.client}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{task.client}</p>
            {type === 'active' && (
              <p className="text-xs text-gray-500">Næste: {new Date(task.nextDate).toLocaleDateString('da-DK')}</p>
            )}
            {type === 'completed' && (
              <p className="text-xs text-gray-500">Afsluttet: {new Date(task.completedDate).toLocaleDateString('da-DK')}</p>
                <button 
                  onClick={() => {
                    if (confirm('Marker denne opgave som færdig?')) {
                      alert('Opgave markeret som færdig! Kunden vil blive notificeret.');
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-green-100 transition-colors duration-200" 
                  title="Marker som færdig"
                >
            {type === 'application' && (
              <p className="text-xs text-gray-500">Ansøgt: {new Date(task.appliedDate).toLocaleDateString('da-DK')}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {type === 'active' && (
            <>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" title="Se detaljer">
                <Eye className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-green-100 transition-colors duration-200" title="Marker som færdig">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </button>
            </>
          )}
          {type === 'application' && (
            <button 
              onClick={() => {
                if (confirm('Træk denne ansøgning tilbage?')) {
                  alert('Ansøgning trukket tilbage.');
                }
              }}
              className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200" 
              title="Træk ansøgning tilbage"
            >
              <XCircle className="w-4 h-4 text-red-600" />
            </button>
          )}
          {type === 'completed' && task.earnings && (
            <div className="text-right">
              <p className="text-sm font-semibold text-green-600">{task.earnings}</p>
              <p className="text-xs text-gray-500">Indtjening</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mine Rengøringsjobs</h1>
        <p className="text-gray-600">Administrer dine aktive rengøringsjobs, ansøgninger og afsluttede opgaver</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'active' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Aktive ({activeTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'applications' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Ansøgninger ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'completed' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Afsluttede ({completedTasks.length})
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Søg opgaver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'active' && (
          <>
            {activeTasks.length > 0 ? (
              activeTasks.map(task => renderTaskCard(task, 'active'))
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen aktive opgaver</h3>
                <p className="text-gray-600">Du har ingen aktive rengøringsopgaver i øjeblikket.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'applications' && (
          <>
            {applications.length > 0 ? (
              applications.map(task => renderTaskCard(task, 'application'))
            ) : (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen ansøgninger</h3>
                <p className="text-gray-600">Du har ikke ansøgt om nogen jobs endnu.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'completed' && (
          <>
            {completedTasks.length > 0 ? (
              completedTasks.map(task => renderTaskCard(task, 'completed'))
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen afsluttede opgaver</h3>
                <p className="text-gray-600">Du har ikke afsluttet nogen opgaver endnu.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Summary Stats */}
      {activeTab === 'completed' && completedTasks.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Månedsoversigt</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">Afsluttede opgaver</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">18.500 kr</p>
              <p className="text-sm text-gray-600">Total indtjening</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">4.8</p>
              <p className="text-sm text-gray-600">Gennemsnitlig rating</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}