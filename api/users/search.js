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
        const query = req.query.q || '';

        // Mock user search results
        const mockUsers = [
          {
            id: '1',
            name: 'Maria Hansen',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            location: 'København',
            userType: 'Privat kunde',
            rating: 4.8
          },
          {
            id: '2',
            name: 'Peter Larsen',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            location: 'Aarhus',
            userType: 'Rengøringsassistent',
            rating: 4.9
          }
        ].filter(user => 
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.location.toLowerCase().includes(query.toLowerCase())
        );

        res.status(200).json(mockUsers);

      } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Server fejl ved søgning af brugere' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}