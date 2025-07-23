const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Ingen adgangstoken' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Ugyldig token' });
  }
};

export default async function handler(req, res) {
  verifyToken(req, res, async () => {
    if (req.method === 'POST') {
      // Send message
      try {
        const { receiverId, content, type = 'text' } = req.body;

        if (!receiverId || !content) {
          return res.status(400).json({ error: 'Modtager og indhold er påkrævet' });
        }

        // Check if sender is subscribed
        const senderResult = await pool.query(
          'SELECT is_subscribed FROM users WHERE id = $1',
          [req.userId]
        );

        if (!senderResult.rows[0]?.is_subscribed) {
          return res.status(403).json({ error: 'Kun Pro medlemmer kan sende beskeder' });
        }

        // Check if receiver exists
        const receiverResult = await pool.query(
          'SELECT id FROM users WHERE id = $1',
          [receiverId]
        );

        if (receiverResult.rows.length === 0) {
          return res.status(404).json({ error: 'Modtager ikke fundet' });
        }

        // Create message
        const messageResult = await pool.query(
          `INSERT INTO messages (id, sender_id, receiver_id, content, message_type, created_at, read_at)
           VALUES ($1, $2, $3, $4, $5, NOW(), NULL)
           RETURNING *`,
          [uuidv4(), req.userId, receiverId, content, type]
        );

        const message = messageResult.rows[0];

        // Create or update conversation
        await pool.query(
          `INSERT INTO conversations (sender_id, receiver_id, last_message_id, updated_at)
           VALUES ($1, $2, $3, NOW())
           ON CONFLICT (sender_id, receiver_id) 
           DO UPDATE SET last_message_id = $3, updated_at = NOW()`,
          [req.userId, receiverId, message.id]
        );

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
        const result = await pool.query(
          `SELECT DISTINCT ON (LEAST(c.sender_id, c.receiver_id), GREATEST(c.sender_id, c.receiver_id))
                  c.*,
                  u.name as other_user_name,
                  u.avatar_url as other_user_avatar,
                  u.last_seen,
                  m.content as last_message_content,
                  m.created_at as last_message_time,
                  (SELECT COUNT(*) FROM messages 
                   WHERE receiver_id = $1 AND sender_id = u.id AND read_at IS NULL) as unread_count
           FROM conversations c
           JOIN users u ON (u.id = c.sender_id OR u.id = c.receiver_id) AND u.id != $1
           JOIN messages m ON m.id = c.last_message_id
           WHERE c.sender_id = $1 OR c.receiver_id = $1
           ORDER BY LEAST(c.sender_id, c.receiver_id), GREATEST(c.sender_id, c.receiver_id), c.updated_at DESC`,
          [req.userId]
        );

        res.status(200).json(result.rows);

      } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af beskeder' });
      }

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  });
}