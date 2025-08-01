const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

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
  verifyToken(req, res, async () => {
    if (req.method === 'POST') {
      // Send message
      try {
        const { receiverId, content, type = 'text' } = req.body;

        if (!receiverId || !content) {
          return res.status(400).json({ error: 'Modtager og indhold er påkrævet' });
        }

        // Mock message creation for demo
        const message = {
          id: uuidv4(),
          sender_id: req.userId,
          receiver_id: receiverId,
          content,
          message_type: type,
          created_at: new Date().toISOString(),
          read_at: null
        };

        res.status(201).json({
          id: message.id,
          senderId: message.sender_id,
          receiverId: message.receiver_id,
          content: message.content,
          type: message.message_type,
          timestamp: message.created_at,
          read: false
        });

      } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Server fejl ved afsendelse af besked' });
      }

    } else if (req.method === 'GET') {
      // Get conversations
      try {
        // Mock conversations for demo
        const mockConversations = [
        ];

        res.status(200).json(mockConversations);

      } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af beskeder' });
      }

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  });
}