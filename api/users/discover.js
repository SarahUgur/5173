const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Ingen adgangstoken' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Ugyldig token' });
  }
};

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    verifyToken(req, res, async () => {
      try {
        // Mock users for discovery
        const mockUsers = [
          {
            id: '1',
            name: 'Maria Hansen',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            location: 'København',
            userType: 'private',
            rating: 4.8,
            completedJobs: 23,
            verified: true
          },
          {
            id: '2',
            name: 'Peter Larsen',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            location: 'Aarhus',
            userType: 'cleaner',
            rating: 4.9,
            completedJobs: 45,
            verified: true
          },
          {
            id: '3',
            name: 'Sofie Andersen',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            location: 'Odense',
            userType: 'small_business',
            rating: 4.7,
            completedJobs: 67,
            verified: false
          }
        ];

        res.status(200).json({ users: mockUsers });

      } catch (error) {
        console.error('Error fetching users for discovery:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af brugere' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}