const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name, userType, acceptedTerms } = req.body;

  try {
    if (req.body.name) {
      // Registration
      if (!name || !email || !password || !userType || !acceptedTerms) {
        return res.status(400).json({ error: 'Alle felter er påkrævet' });
      }

      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Email er allerede registreret' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const result = await pool.query(
        `INSERT INTO users (name, email, password, user_type, verified, is_subscribed, location, created_at, accepted_terms)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), $8)
         RETURNING id, name, email, user_type, verified, is_subscribed, location, created_at`,
        [name, email, hashedPassword, userType, false, false, 'Danmark', true]
      );

      const user = result.rows[0];

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          verified: user.verified,
          isSubscribed: user.is_subscribed,
          location: user.location,
          joinedDate: user.created_at,
          avatar: '',
          rating: 0,
          completedJobs: 0
        }
      });

    } else {
      // Login
      if (!email || !password) {
        return res.status(400).json({ error: 'Email og adgangskode er påkrævet' });
      }

      // Find user
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Ugyldig email eller adgangskode' });
      }

      const user = result.rows[0];

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Ugyldig email eller adgangskode' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Update last login
      await pool.query(
        'UPDATE users SET last_login = NOW() WHERE id = $1',
        [user.id]
      );

      res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          verified: user.verified,
          isSubscribed: user.is_subscribed,
          location: user.location,
          joinedDate: user.created_at,
          avatar: user.avatar_url || '',
          rating: user.rating || 0,
          completedJobs: user.completed_jobs || 0,
          bio: user.bio || '',
          phone: user.phone || '',
          website: user.website || ''
        }
      });
    }

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Server fejl. Prøv igen senere.' });
  }
}