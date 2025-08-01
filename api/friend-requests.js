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
        // Mock friend requests data
        const mockFriendRequests = [
          {
            id: '1',
            senderId: '2',
            senderName: 'Peter Larsen',
            senderAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            senderLocation: 'Aarhus',
            message: 'Hej! Jeg vil gerne forbinde med dig.',
            timestamp: '2 timer siden',
            status: 'pending'
          }
        ];

        res.status(200).json(mockFriendRequests);

      } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af venneanmodninger' });
      }
    });

  } else if (req.method === 'POST') {
    verifyToken(req, res, async () => {
      try {
        const { receiverId, message } = req.body;

        if (!receiverId) {
          return res.status(400).json({ error: 'Modtager ID er påkrævet' });
        }

        // Mock successful friend request send
        const friendRequest = {
          id: Date.now().toString(),
          senderId: req.userId,
          receiverId,
          message: message || '',
          status: 'pending',
          createdAt: new Date().toISOString()
        };

        res.status(201).json({
          message: 'Venneanmodning sendt',
          requestId: friendRequest.id
        });

      } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ error: 'Server fejl ved afsendelse af venneanmodning' });
      }
    });

  } else if (req.method === 'PUT') {
    verifyToken(req, res, async () => {
      try {
        const { requestId, action } = req.body;

        if (!requestId || !action) {
          return res.status(400).json({ error: 'Anmodning ID og handling er påkrævet' });
        }

        if (!['accept', 'reject'].includes(action)) {
          return res.status(400).json({ error: 'Ugyldig handling' });
        }

        // Mock successful friend request response
        res.status(200).json({
          message: action === 'accept' ? 'Venneanmodning accepteret' : 'Venneanmodning afvist'
        });

      } catch (error) {
        console.error('Error responding to friend request:', error);
        res.status(500).json({ error: 'Server fejl ved svar på venneanmodning' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}