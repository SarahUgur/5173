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

        // Mock search results
        const mockResults = [
          {
            id: '1',
            type: 'user',
            name: 'Maria Hansen',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            location: 'København',
            userType: 'Privat kunde'
          },
          {
            id: '2',
            type: 'job',
            title: 'Hjemmerengøring søges',
            content: 'Søger pålidelig rengøringshjælp til mit hjem',
            location: 'København NV'
          },
          {
            id: '3',
            type: 'page',
            title: 'Hjælp & Support',
            description: 'Find svar på dine spørgsmål',
            page: 'support'
          }
        ].filter(item => 
          item.name?.toLowerCase().includes(query.toLowerCase()) ||
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
        );

        res.status(200).json({ results: mockResults });

      } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ error: 'Server fejl ved søgning' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}