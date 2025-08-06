const jwt = require('jsonwebtoken');

// Helper function to verify admin JWT token
const verifyAdminToken = (event) => {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    throw new Error('Ingen adgangstoken');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    
    // Check if user is admin
    if (decoded.email !== 'admin@privaterengoring.dk') {
      throw new Error('Kun admin har adgang');
    }
    
    return decoded;
  } catch (error) {
    if (error.message === 'Kun admin har adgang') {
      throw error;
    }
    throw new Error('Ugyldig token');
  }
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const user = verifyAdminToken(event);

    // Mock admin dashboard data for demo
    const mockStats = {
      totalUsers: 1247,
      activeUsers: 89,
      totalPosts: 456,
      totalJobs: 234,
      reportsToday: 3,
      revenue: 18500,
      newUsersToday: 12,
      onlineNow: 24
    };

    const mockRecentUsers = [];

    const mockRecentReports = [
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
      },
      {
        id: '3',
        reported: 'Falske oplysninger i jobopslag',
        reporter: 'Thomas Hansen',
        reason: 'Falske oplysninger',
        status: 'resolved',
        createdAt: '2024-01-19 16:45'
      }
    ];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        stats: mockStats,
        recentUsers: mockRecentUsers,
        recentReports: mockRecentReports
      })
    };

  } catch (error) {
    const statusCode = error.message === 'Ingen adgangstoken' || error.message === 'Ugyldig token' ? 401 :
                      error.message === 'Kun admin har adgang' ? 403 : 500;
    
    return {
      statusCode,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};