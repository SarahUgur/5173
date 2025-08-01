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
        // Mock conversations data
        const mockConversations = [
          {
            id: '1',
            name: 'Maria Hansen',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            lastMessage: 'Tak for den gode rengøring!',
            timestamp: '2 min siden',
            unread: 2,
            online: true
          },
          {
            id: '2',
            name: 'Peter Larsen',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            lastMessage: 'Hvornår kan du komme?',
            timestamp: '1 time siden',
            unread: 0,
            online: false
          }
        ];

        res.status(200).json(mockConversations);

      } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af beskeder' });
      }
    });

  } else if (req.method === 'POST') {
    verifyToken(req, res, async () => {
      try {
        const { conversationId, message } = req.body;

        if (!conversationId || !message) {
          return res.status(400).json({ error: 'Samtale ID og besked er påkrævet' });
        }

        // Mock successful message send
        const newMessage = {
          id: Date.now().toString(),
          conversationId,
          senderId: req.userId,
          message,
          timestamp: new Date().toISOString()
        };

        res.status(201).json(newMessage);

      } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Server fejl ved afsendelse af besked' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}