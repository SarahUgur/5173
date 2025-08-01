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
        // Mock notifications data
        const mockNotifications = [
          {
            id: '1',
            type: 'like',
            title: 'Nyt like',
            message: 'Maria Hansen likede dit opslag',
            timestamp: '5 min siden',
            read: false,
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          {
            id: '2',
            type: 'job',
            title: 'Nyt job',
            message: 'Nyt rengøringsjob i dit område',
            timestamp: '1 time siden',
            read: false,
            avatar: null
          },
          {
            id: '3',
            type: 'friend',
            title: 'Venneanmodning',
            message: 'Peter Larsen vil være din ven',
            timestamp: '2 timer siden',
            read: true,
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          }
        ];

        res.status(200).json(mockNotifications);

      } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af notifikationer' });
      }
    });

  } else if (req.method === 'PUT') {
    verifyToken(req, res, async () => {
      try {
        const { notificationId, read } = req.body;

        if (!notificationId) {
          return res.status(400).json({ error: 'Notifikation ID er påkrævet' });
        }

        // Mock successful notification update
        res.status(200).json({ message: 'Notifikation opdateret' });

      } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ error: 'Server fejl ved opdatering af notifikation' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}