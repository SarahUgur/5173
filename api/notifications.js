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
        // Mock notifications for demo
        const mockNotifications = [
          {
            id: '1',
            type: 'job',
            title: 'Nyt job i dit område',
            message: 'Hjemmerengøring i København NV - 350 kr',
            time: '5 min siden',
            read: false,
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          {
            id: '2',
            type: 'message',
            title: 'Ny besked fra Lars Nielsen',
            message: 'Hej! Er du interesseret i rengøringsjobbet?',
            time: '10 min siden',
            read: false,
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          {
            id: '3',
            type: 'connection',
            title: 'Ny venskabsanmodning',
            message: 'Sofie Andersen vil gerne forbinde med dig',
            time: '1 time siden',
            read: true,
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          }
        ];

        res.status(200).json(mockNotifications);

      } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af notifikationer' });
      }
    });

  } else if (req.method === 'PUT') {
    // Mark notification as read
    verifyToken(req, res, async () => {
      try {
        const notificationId = req.url.split('/')[3]; // Extract ID from URL
        
        // Mock successful update
        res.status(200).json({ message: 'Notifikation markeret som læst' });

      } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ error: 'Server fejl ved opdatering af notifikation' });
      }
    });

  } else if (req.method === 'DELETE') {
    // Delete notification
    verifyToken(req, res, async () => {
      try {
        const notificationId = req.url.split('/')[3]; // Extract ID from URL
        
        // Mock successful deletion
        res.status(200).json({ message: 'Notifikation slettet' });

      } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ error: 'Server fejl ved sletning af notifikation' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}