import React, { useState, useEffect } from 'react';
import { Shield, Users, Briefcase, TrendingUp, AlertTriangle, Eye, Ban, CheckCircle, XCircle, Search, Filter, BarChart3, DollarSign, Activity, Clock, Globe, MessageCircle, Star, MapPin, Calendar, Bell, Zap, Target, UserCheck, FileText, Settings } from 'lucide-react';
import AdRevenue from './AdRevenue';

interface AdminPageProps {
  currentUser: any;
}

export default function AdminPage({ currentUser }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'jobs' | 'reports' | 'monitoring' | 'analytics' | 'settings'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [systemAlerts, setSystemAlerts] = useState<any[]>([]);
  const [realTimeStats, setRealTimeStats] = useState({
    totalUsers: 1247,
    onlineNow: 0,
    activeJobs: 89,
    completedJobs: 456,
    reportedContent: 12,
    newUsersToday: 23,
    revenueThisMonth: 45600,
    proSubscribers: 234,
    avgResponseTime: '2.3 min',
    systemUptime: '99.9%',
    totalPosts: 3456,
    totalComments: 8901,
    suspendedUsers: 5,
    bannedUsers: 2
  });

  // Simuler real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const newOnlineCount = Math.floor(Math.random() * 50) + 20;
      setOnlineUsers(newOnlineCount);
      
      setRealTimeStats(prev => ({
        ...prev,
        onlineNow: newOnlineCount,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        activeJobs: prev.activeJobs + Math.floor(Math.random() * 5) - 2,
        reportedContent: prev.reportedContent + Math.floor(Math.random() * 2)
      }));
      
      // Simuler system alerts
      const alerts = [
        {
          id: '1',
          type: 'warning',
          message: `Høj aktivitet: ${Math.floor(Math.random() * 10) + 5} rapporter i den sidste time`,
          time: new Date().toLocaleTimeString('da-DK'),
          severity: 'medium'
        },
        {
          id: '2',
          type: 'info',
          message: `Ny bruger registrering: +${Math.floor(Math.random() * 20) + 5} i dag`,
          time: new Date().toLocaleTimeString('da-DK'),
          severity: 'low'
        },
        {
          id: '3',
          type: 'alert',
          message: 'Mistænkelig aktivitet: Bruger forsøger at sælge udenfor platform',
          time: new Date().toLocaleTimeString('da-DK'),
          severity: 'high'
        },
        {
          id: '4',
          type: 'success',
          message: `${Math.floor(Math.random() * 15) + 10} nye Pro abonnementer i dag`,
          time: new Date().toLocaleTimeString('da-DK'),
          severity: 'low'
        }
      ];
      setSystemAlerts(alerts);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock admin data
  const recentUsers = [
    {
      id: '1',
      name: 'Maria Hansen',
      email: 'maria@example.com',
      userType: 'private',
      joinDate: '2024-01-15',
      status: 'active',
      isSubscribed: false,
      lastActive: '2 min siden',
      ipAddress: '192.168.1.1',
      location: 'København',
      postsCount: 12,
      reportsReceived: 0
    },
    {
      id: '2',
      name: 'Lars Nielsen',
      email: 'lars@cleanpro.dk',
      userType: 'cleaner',
      joinDate: '2024-01-14',
      status: 'active',
      isSubscribed: true,
      lastActive: '5 min siden',
      ipAddress: '192.168.1.2',
      location: 'Aarhus',
      postsCount: 45,
      reportsReceived: 1
    },
    {
      id: '3',
      name: 'Sofie Andersen',
      email: 'sofie@example.com',
      userType: 'small_business',
      joinDate: '2024-01-13',
      status: 'suspended',
      isSubscribed: false,
      lastActive: '1 time siden',
      ipAddress: '192.168.1.3',
      location: 'Odense',
      postsCount: 8,
      reportsReceived: 3
    }
  ];

  const reportedContent = [
    {
      id: '1',
      type: 'post',
      content: 'Bruger forsøger at sælge rengøringsservice udenfor platformen med direkte betaling via MobilePay',
      reporter: 'Anna Petersen',
      reported: 'Michael Sørensen',
      reason: 'Omgåelse af platform',
      date: '2024-01-15',
      status: 'pending',
      severity: 'high',
      postId: 'post_123',
      evidence: 'Screenshot af besked med MobilePay nummer'
    },
    {
      id: '2',
      type: 'user',
      content: 'Bruger sender upassende beskeder og chikanerer andre brugere med trusler',
      reporter: 'Emma Larsen',
      reported: 'John Doe',
      reason: 'Chikane og trusler',
      date: '2024-01-14',
      status: 'resolved',
      severity: 'medium',
      action: 'Bruger suspenderet i 7 dage og advaret'
    },
    {
      id: '3',
      type: 'comment',
      content: 'Kommentar indeholder spam links til eksterne hjemmesider og falske tilbud',
      reporter: 'Peter Hansen',
      reported: 'Spam Bot',
      reason: 'Spam og falske tilbud',
      date: '2024-01-15',
      status: 'pending',
      severity: 'low',
      commentId: 'comment_456'
    }
  ];

  const systemMonitoring = [
    {
      metric: 'Server Response Time',
      value: '145ms',
      status: 'good',
      trend: 'stable',
      target: '< 200ms'
    },
    {
      metric: 'Database Queries/sec',
      value: '1,234',
      status: 'good',
      trend: 'up',
      target: '< 2,000'
    },
    {
      metric: 'Error Rate',
      value: '0.02%',
      status: 'good',
      trend: 'down',
      target: '< 0.1%'
    },
    {
      metric: 'Memory Usage',
      value: '67%',
      status: 'warning',
      trend: 'up',
      target: '< 80%'
    },
    {
      metric: 'Active Connections',
      value: '456',
      status: 'good',
      trend: 'stable',
      target: '< 1,000'
    },
    {
      metric: 'Disk Usage',
      value: '34%',
      status: 'good',
      trend: 'stable',
      target: '< 70%'
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
      case 'banned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleReportAction = (reportId: string, action: 'approve' | 'reject' | 'suspend') => {
    console.log(`Admin action: ${action} on report ${reportId}`);
    // I en rigtig app ville dette opdatere databasen
    alert(`Rapport ${reportId} blev ${action === 'approve' ? 'godkendt' : action === 'reject' ? 'afvist' : 'bruger suspenderet'}`);
  };

  const handleUserAction = (userId: string, action: 'suspend' | 'activate' | 'ban' | 'message') => {
    console.log(`Admin action: ${action} on user ${userId}`);
    alert(`Bruger ${userId} - handling: ${action}`);
  };

  // Check if user is admin
  const isAdmin = currentUser?.email === 'admin@privatrengoring.dk';

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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Komplet administrationspanel for Privat Rengøring</p>
            </div>
          </div>
          
          {/* Live Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Dashboard</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Online nu</p>
              <p className="text-xl font-bold text-green-600">{realTimeStats.onlineNow}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical System Alerts */}
      {systemAlerts.filter(alert => alert.severity === 'high').length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Kritiske Advarsler</h3>
          </div>
          <div className="space-y-2">
            {systemAlerts.filter(alert => alert.severity === 'high').map((alert) => (
              <div key={alert.id} className="p-3 rounded-lg border bg-red-100 border-red-200">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-red-900">{alert.message}</p>
                  <span className="text-xs text-red-700">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Brugere</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{realTimeStats.newUsersToday} i dag</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Online Nu</p>
              <p className="text-2xl font-bold text-green-600">{realTimeStats.onlineNow}</p>
              <p className="text-sm text-blue-600">Live opdatering</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aktive Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeStats.activeJobs}</p>
              <p className="text-sm text-blue-600">{realTimeStats.completedJobs} afsluttet</p>
            </div>
            <Briefcase className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rapporter</p>
              <p className="text-2xl font-bold text-red-600">{realTimeStats.reportedContent}</p>
              <p className="text-sm text-red-600">Kræver handling</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'users' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            👥 Brugere ({realTimeStats.totalUsers})
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'jobs' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            💼 Jobs ({realTimeStats.activeJobs})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'reports' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🚨 Rapporter ({realTimeStats.reportedContent})
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'monitoring' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📈 Overvågning
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
              activeTab === 'analytics' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Analytics
          </button>
        </div>
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Ad Revenue Component */}
          <AdRevenue isAdmin={true} />
          
          {/* Extended Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pro Abonnenter</p>
                  <p className="text-2xl font-bold text-purple-600">{realTimeStats.proSubscribers}</p>
                  <p className="text-sm text-green-600">+12 i dag</p>
                </div>
                <Star className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Opslag</p>
                  <p className="text-2xl font-bold text-blue-600">{realTimeStats.totalPosts.toLocaleString()}</p>
                  <p className="text-sm text-blue-600">+45 i dag</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Kommentarer</p>
                  <p className="text-2xl font-bold text-green-600">{realTimeStats.totalComments.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+123 i dag</p>
                </div>
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Månedlig Omsætning</p>
                  <p className="text-2xl font-bold text-green-600">{realTimeStats.revenueThisMonth.toLocaleString()} kr</p>
                  <p className="text-sm text-green-600">+15% vs sidste måned</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* System Health og Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Sundhed</h3>
              <div className="space-y-4">
                {systemMonitoring.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{metric.value}</span>
                          <div className={`w-3 h-3 rounded-full ${
                            metric.status === 'good' ? 'bg-green-500' : 
                            metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">Mål: {metric.target}</span>
                        <span className={`text-xs ${getSystemStatusColor(metric.status)}`}>
                          {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '➡️'} {metric.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seneste Aktivitet</h3>
              <div className="space-y-4">
                {recentUsers.slice(0, 4).map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.lastActive} • {user.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'Aktiv' : user.status === 'suspended' ? 'Suspenderet' : user.status}
                      </span>
                      {user.reportsReceived > 0 && (
                        <p className="text-xs text-red-600 mt-1">{user.reportsReceived} rapporter</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live System Advarsler</h3>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs mt-1 opacity-75">Type: {alert.type} • Prioritet: {alert.severity}</p>
                    </div>
                    <span className="text-xs">{alert.time}</span>
                  </div>
                </div>
              ))}
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
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Aktivitet</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Rapporter</th>
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
                        <p className="text-xs text-gray-500">IP: {user.ipAddress}</p>
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
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-gray-600">{user.lastActive}</p>
                        <p className="text-gray-500">{user.postsCount} opslag</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.reportsReceived > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.reportsReceived} rapporter
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleUserAction(user.id, 'message')}
                          className="p-1 rounded hover:bg-gray-100 transition-colors duration-200" 
                          title="Send besked"
                        >
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                        </button>
                        <button 
                          onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                          className="p-1 rounded hover:bg-gray-100 transition-colors duration-200" 
                          title={user.status === 'active' ? 'Suspender' : 'Aktiver'}
                        >
                          {user.status === 'active' ? 
                            <Ban className="w-4 h-4 text-red-600" /> : 
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          }
                        </button>
                        <button 
                          onClick={() => handleUserAction(user.id, 'ban')}
                          className="p-1 rounded hover:bg-gray-100 transition-colors duration-200" 
                          title="Permanent ban"
                        >
                          <XCircle className="w-4 h-4 text-gray-600" />
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

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Rapporteret Indhold</h3>
          
          <div className="space-y-4">
            {reportedContent.map((report) => (
              <div key={report.id} className={`border rounded-lg p-4 ${getSeverityColor(report.severity)}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">{report.reason}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status === 'pending' ? 'Afventer' : 'Løst'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                        {report.severity === 'high' ? 'Høj' : report.severity === 'medium' ? 'Medium' : 'Lav'} prioritet
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{report.content}</p>
                    <div className="text-sm text-gray-600">
                      <p>Rapporteret af: <span className="font-medium">{report.reporter}</span></p>
                      <p>Rapporteret bruger: <span className="font-medium">{report.reported}</span></p>
                      <p>Dato: {new Date(report.date).toLocaleDateString('da-DK')}</p>
                      {report.evidence && <p>Bevis: <span className="font-medium text-blue-600">{report.evidence}</span></p>}
                      {report.action && <p>Handling: <span className="font-medium text-blue-600">{report.action}</span></p>}
                    </div>
                  </div>
                </div>
                
                {report.status === 'pending' && (
                  <div className="flex items-center space-x-2 pt-3 border-t border-gray-200">
                    <button 
                      onClick={() => handleReportAction(report.id, 'approve')}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Godkend</span>
                    </button>
                    <button 
                      onClick={() => handleReportAction(report.id, 'reject')}
                      className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm">Afvis</span>
                    </button>
                    <button 
                      onClick={() => handleReportAction(report.id, 'suspend')}
                      className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-200"
                    >
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

      {/* Monitoring Tab */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Overvågning</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Brugere online</span>
                  <span className="text-2xl font-bold text-green-600">{realTimeStats.onlineNow}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Aktive sessioner</span>
                  <span className="text-xl font-semibold text-blue-600">{Math.floor(realTimeStats.onlineNow * 1.2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Gennemsnitlig responstid</span>
                  <span className="text-lg font-medium text-gray-900">{realTimeStats.avgResponseTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">System oppetid</span>
                  <span className="text-lg font-medium text-green-600">{realTimeStats.systemUptime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Suspenderede brugere</span>
                  <span className="text-lg font-medium text-red-600">{realTimeStats.suspendedUsers}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sikkerhedsovervågning</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-900">Mistænkelig aktivitet opdaget</p>
                  <p className="text-xs text-red-700">Bruger forsøger at omgå betalingssystem</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-900">Høj rapport aktivitet</p>
                  <p className="text-xs text-yellow-700">{realTimeStats.reportedContent} rapporter i den sidste time</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-900">System sikkerhed OK</p>
                  <p className="text-xs text-green-700">Alle sikkerhedstjek bestået</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Backup status</p>
                  <p className="text-xs text-blue-700">Sidste backup: {new Date().toLocaleString('da-DK')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed System Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detaljerede System Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemMonitoring.map((metric, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                    <div className={`w-3 h-3 rounded-full ${
                      metric.status === 'good' ? 'bg-green-500' : 
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Mål: {metric.target}</span>
                    <span className={getSystemStatusColor(metric.status)}>
                      {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '➡️'} {metric.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{realTimeStats.totalPosts.toLocaleString()}</p>
                <p className="text-sm text-blue-700">Total Opslag</p>
                <p className="text-xs text-blue-600">+45 i dag</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{realTimeStats.totalComments.toLocaleString()}</p>
                <p className="text-sm text-green-700">Total Kommentarer</p>
                <p className="text-xs text-green-600">+123 i dag</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{realTimeStats.proSubscribers}</p>
                <p className="text-sm text-purple-700">Pro Abonnenter</p>
                <p className="text-xs text-purple-600">18.8% conversion</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{realTimeStats.revenueThisMonth.toLocaleString()} kr</p>
                <p className="text-sm text-orange-700">Månedlig Omsætning</p>
                <p className="text-xs text-orange-600">+15% vs sidste måned</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Bruger Fordeling</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Privat kunder</span>
                    <span className="text-sm font-medium">65% (810)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rengøringseksperter</span>
                    <span className="text-sm font-medium">20% (249)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Små virksomheder</span>
                    <span className="text-sm font-medium">12% (150)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Store virksomheder</span>
                    <span className="text-sm font-medium">3% (38)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Job Kategorier</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hjemmerengøring</span>
                    <span className="text-sm font-medium">45% (40 jobs)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Kontorrengøring</span>
                    <span className="text-sm font-medium">30% (27 jobs)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hovedrengøring</span>
                    <span className="text-sm font-medium">15% (13 jobs)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Specialrengøring</span>
                    <span className="text-sm font-medium">10% (9 jobs)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}