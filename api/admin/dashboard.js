const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and admin access
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Ingen adgangstoken' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    
    // Check if user is admin
    if (decoded.email !== 'admin@privaterengoring.dk' && decoded.email !== 'admin@privatrengoring.dk') {
      return res.status(403).json({ error: 'Kun admin har adgang' });
    }
    
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Ugyldig token' });
  }
};

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  verifyAdminToken(req, res, async () => {
    try {
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

      const mockRecentUsers = [
        {
          id: '1',
          name: 'Maria Hansen',
          email: 'maria@example.com',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          userType: 'private',
          status: 'online',
          isSubscribed: false,
          joinedDate: '2024-01-15',
          lastActive: 'Nu'
        },
        {
          id: '2',
          name: 'Lars Nielsen',
          email: 'lars@example.com',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          userType: 'cleaner',
          status: 'online',
          isSubscribed: true,
          joinedDate: '2023-08-20',
          lastActive: 'Nu'
        },
        {
          id: '3',
          name: 'Sofie Andersen',
          email: 'sofie@example.com',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          userType: 'small_business',
          status: 'away',
          isSubscribed: false,
          joinedDate: '2023-12-10',
          lastActive: '5 min siden'
        },
        {
          id: '4',
          name: 'Peter Larsen',
          email: 'peter@example.com',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          userType: 'cleaner',
          status: 'offline',
          isSubscribed: true,
          joinedDate: '2023-11-05',
          lastActive: '2 timer siden'
        }
      ];

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

      // In production, fetch real data from database:
      /*
      const statsQuery = `
        SELECT 
          (SELECT COUNT(*) FROM users) as total_users,
          (SELECT COUNT(*) FROM users WHERE last_seen > NOW() - INTERVAL '24 hours') as active_users,
          (SELECT COUNT(*) FROM posts) as total_posts,
          (SELECT COUNT(*) FROM posts WHERE post_type = 'job') as total_jobs,
          (SELECT COUNT(*) FROM reports WHERE created_at::date = CURRENT_DATE) as reports_today,
          (SELECT COUNT(*) FROM users WHERE created_at::date = CURRENT_DATE) as new_users_today,
          (SELECT COUNT(*) FROM users WHERE last_seen > NOW() - INTERVAL '5 minutes') as online_now
      `;
      
      const recentUsersQuery = `
        SELECT id, name, email, avatar_url, user_type, is_subscribed, created_at, last_seen
        FROM users 
        ORDER BY created_at DESC 
        LIMIT 10
      `;
      
      const recentReportsQuery = `
        SELECT r.*, u.name as reporter_name
        FROM reports r
        JOIN users u ON r.reporter_id = u.id
        ORDER BY r.created_at DESC
        LIMIT 10
      `;
      */

      res.status(200).json({
        stats: mockStats,
        recentUsers: mockRecentUsers,
        recentReports: mockRecentReports
      });

    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
      res.status(500).json({ error: 'Server fejl ved hentning af admin data' });
    }
  });
}