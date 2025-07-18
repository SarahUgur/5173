import React, { useState } from 'react';
import { Shield, Users, Briefcase, TrendingUp, AlertTriangle, Eye, Ban, CheckCircle, XCircle, Search, Filter, BarChart3, DollarSign } from 'lucide-react';

interface AdminPageProps {
  currentUser: any;
}

export default function AdminPage({ currentUser }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'jobs' | 'reports'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock admin data
  const stats = {
    totalUsers: 1247,
    activeJobs: 89,
    completedJobs: 456,
    reportedContent: 12,
    newUsersToday: 23,
    revenueThisMonth: 45600,
    proSubscribers: 234
  };

  const recentUsers = [
    {
      id: '1',
      name: 'Maria Hansen',
      email: 'maria@example.com',
      userType: 'private',
      joinDate: '2024-01-15',
      status: 'active',
      isSubscribed: false
    },
    {
      id: '2',
      name: 'Lars Nielsen',
      email: 'lars@cleanpro.dk',
      userType: 'cleaner',
      joinDate: '2024-01-14',
      status: 'active',
      isSubscribed: true
    },
    {
      id: '3',
      name: 'Sofie Andersen',
      email: 'sofie@example.com',
      userType: 'small_business',
      joinDate: '2024-01-13',
      status: 'suspended',
      isSubscribed: false
    }
  ];

  const reportedContent = [
    {
      id: '1',
      type: 'post',
      content: 'Upassende opslag om rengøring...',
      reporter: 'Anna Petersen',
      reported: 'Michael Sørensen',
      reason: 'Spam',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      type: 'user',
      content: 'Bruger sender upassende beskeder',
      reporter: 'Emma Larsen',
      reported: 'John Doe',
      reason: 'Chikane',
      date: '2024-01-14',
      status: 'resolved'
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if user is admin
  const isAdmin = currentUser?.isAdmin === true || currentUser?.email === 'admin@privatrengoring.dk';

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-900 mb-4">Adgang Nægtet</h2>
          <p className="text-red-700 mb-6">Du har ikke tilladelse til at se admin panelet.</p>
          <p className="text-sm text-red-600">Kun administratorer kan få adgang til denne side.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Administrer Privat Rengøring platformen</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'users' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Brugere ({stats.totalUsers})
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'jobs' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Jobs ({stats.activeJobs})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'reports' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Rapporter ({stats.reportedContent})
          </button>
        </div>
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Brugere</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+{stats.newUsersToday} i dag</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Aktive Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
                  <p className="text-sm text-blue-600">{stats.completedJobs} afsluttet</p>
                </div>
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pro Abonnenter</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.proSubscribers}</p>
                  <p className="text-sm text-purple-600">{Math.round((stats.proSubscribers / stats.totalUsers) * 100)}% conversion</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Månedlig Omsætning</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.revenueThisMonth.toLocaleString()} kr</p>
                  <p className="text-sm text-green-600">+12% fra sidste måned</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nye Brugere</h3>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{getUserTypeLabel(user.userType)}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'Aktiv' : 'Suspenderet'}
                      </span>
                      {user.isSubscribed && (
                        <p className="text-xs text-purple-600 mt-1">Pro</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rapporteret Indhold</h3>
              <div className="space-y-4">
                {reportedContent.slice(0, 3).map((report) => (
                  <div key={report.id} className="border-l-4 border-red-400 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{report.reason}</p>
                        <p className="text-sm text-gray-600 truncate">{report.content}</p>
                        <p className="text-xs text-gray-500">Rapporteret af {report.reporter}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status === 'pending' ? 'Afventer' : 'Løst'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Bruger Administration</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Søg brugere..."
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Bruger</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tilmeldt</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-700">{getUserTypeLabel(user.userType)}</span>
                      {user.isSubscribed && (
                        <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Pro</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'Aktiv' : 'Suspenderet'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(user.joinDate).toLocaleDateString('da-DK')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded hover:bg-gray-100 transition-colors duration-200" title="Se profil">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 transition-colors duration-200" title="Suspender">
                          <Ban className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Administration</h3>
          <p className="text-gray-600">Job administration funktioner kommer snart...</p>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Rapporteret Indhold</h3>
          
          <div className="space-y-4">
            {reportedContent.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{report.reason}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status === 'pending' ? 'Afventer' : 'Løst'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{report.content}</p>
                    <div className="text-sm text-gray-600">
                      <p>Rapporteret af: <span className="font-medium">{report.reporter}</span></p>
                      <p>Rapporteret bruger: <span className="font-medium">{report.reported}</span></p>
                      <p>Dato: {new Date(report.date).toLocaleDateString('da-DK')}</p>
                    </div>
                  </div>
                </div>
                
                {report.status === 'pending' && (
                  <div className="flex items-center space-x-2 pt-3 border-t border-gray-200">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Godkend</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm">Afvis</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-200">
                      <Ban className="w-4 h-4" />
                      <span className="text-sm">Suspender Bruger</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}