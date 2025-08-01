import React, { useState } from 'react';
import { Users, Activity, TrendingUp, DollarSign, Eye, MessageCircle, Briefcase, Shield, AlertTriangle, Ban, CheckCircle, Clock, Star, Crown } from 'lucide-react';
import AdRevenue from './AdRevenue';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'posts' | 'reports' | 'revenue'>('overview');
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    totalJobs: 0,
    reportsToday: 0,
    revenue: 0,
    newUsersToday: 0,
    onlineNow: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Mock admin data for demo
      setAdminStats({
        totalUsers: 1247,
        activeUsers: 89,
        totalPosts: 456,
        totalJobs: 234,
        reportsToday: 3,
        revenue: 18500,
        newUsersToday: 12,
        onlineNow: 24
      });
      
      setRecentUsers([
        {
          id: '1',
          name: 'Maria Hansen',
          email: 'maria@example.com',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          userType: 'private',
          isSubscribed: false,
          joinedDate: '2024-01-15',
          status: 'online',
          lastActive: 'Nu'
        },
        {
          id: '2',
          name: 'Lars Nielsen',
          email: 'lars@example.com',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          userType: 'cleaner',
          isSubscribed: true,
          joinedDate: '2024-01-10',
          status: 'away',
          lastActive: '30 min siden'
        }
      ]);
      
      setRecentReports([
        {
          id: '1',
          reported: 'Upassende opslag om kontorrengøring',
          reporter: 'Anna Nielsen',
          reason: 'Spam eller uønsket indhold',
          status: 'pending',
          createdAt: '2024-01-20 14:30'
        },
        {
          id: '2',
          reported: 'Bruger: Michael Sørensen',
          reporter: 'Emma Larsen',
          reason: 'Upassende eller krænkende sprog',
          status: 'pending',
          createdAt: '2024-01-20 12:15'
        }
      ]);
    } catch (error) {
      console.error('Error loading admin data:', error);
      setAdminStats({
        totalUsers: 0,
        activeUsers: 0,
        totalPosts: 0,
        totalJobs: 0,
        reportsToday: 0,
        revenue: 0,
        newUsersToday: 0,
        onlineNow: 0
      });
    }
    setLoading(false);
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'away': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserTypeLabel = (type: string) => {
    const labels = {
      'private': 'Privat kunde',
      'cleaner': 'Rengøringsekspert',
      'small_business': 'Lille virksomhed',
      'large_business': 'Stor virksomhed'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6">
      {/* Admin Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Administrer brugere, indhold og platform statistikker</p>
          </div>
        </div>
        
        {/* Admin Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">🛡️ Admin adgang - Behandl brugerdata ansvarligt</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total brugere</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{adminStats.newUsersToday} i dag</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Online nu</p>
              <p className="text-2xl font-bold text-green-600">{adminStats.onlineNow}</p>
              <p className="text-xs text-gray-500">Aktive brugere</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total opslag</p>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalPosts.toLocaleString()}</p>
              <p className="text-xs text-blue-600">{adminStats.totalJobs} jobs</p>
            </div>
            <Briefcase className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rapporter</p>
              <p className="text-2xl font-bold text-red-600">{adminStats.reportsToday}</p>
              <p className="text-xs text-gray-500">Afventer handling</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Ad Revenue Component */}
      <AdRevenue isAdmin={true} />

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Oversigt
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Brugere ({adminStats.totalUsers})
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Opslag ({adminStats.totalPosts})
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Rapporter ({adminStats.reportsToday})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Indlæser admin data...</p>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Aktivitet</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Nye brugere (7 dage)</h4>
                    <p className="text-2xl font-bold text-blue-700">156</p>
                    <p className="text-sm text-blue-600">+12% fra sidste uge</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Aktive jobs</h4>
                    <p className="text-2xl font-bold text-green-700">89</p>
                    <p className="text-sm text-green-600">+5% fra sidste uge</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Pro konvertering</h4>
                    <p className="text-2xl font-bold text-purple-700">18.7%</p>
                    <p className="text-sm text-purple-600">+2.3% fra sidste måned</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Online Brugere ({adminStats.onlineNow})</h3>
                <div className="space-y-3">
                  {recentUsers.filter((user: any) => user.status === 'online').map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{getUserTypeLabel(user.userType)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status === 'online' ? 'Online' : user.lastActive}
                        </span>
                        {user.isSubscribed && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Crown className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-yellow-600">Pro</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Bruger Administration</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Eksporter Data
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Filtrér
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {recentUsers.map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        {user.status === 'online' && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900">{user.name}</p>
                          {user.isSubscribed && (
                            <Crown className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">{getUserTypeLabel(user.userType)} • Medlem siden {user.joinedDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'online' ? 'Online' : user.lastActive}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-600 rounded-full hover:bg-red-50">
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Rapporter & Moderation</h3>
              
              <div className="space-y-3">
               {recentReports.map((report: any) => (
                  <div key={report.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          <span className="font-medium text-gray-900">{report.reported}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {report.status === 'pending' ? 'Afventer' : 'Løst'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Rapporteret af: {report.reporter}</p>
                        <p className="text-sm text-gray-700">Årsag: {report.reason}</p>
                        <p className="text-xs text-gray-500 mt-2">{report.createdAt}</p>
                      </div>
                      
                      {report.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                            Godkend
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                            Afvis
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}