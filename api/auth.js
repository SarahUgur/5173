const jwt = require('jsonwebtoken');

// Simple in-memory user storage for demo
let users = [
  {
    id: 'admin-user-id',
    name: 'Admin',
    email: 'admin@privaterengoring.dk',
    password: 'admin123',
    user_type: 'admin',
    location: 'Danmark',
    bio: 'Platform administrator',
    phone: '',
    website: '',
    verified: true,
    is_subscribed: true,
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    cover_photo_url: '',
    rating: 5.0,
    completed_jobs: 0,
    created_at: '2024-01-01T00:00:00Z'
  }
];

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { action } = req.query;
    const body = req.body || {};

    console.log('Auth request:', { action, body: JSON.stringify(body) });

    if (action === 'register') {
      const { email, password, name, phone, location, website, bio, userType, acceptedTerms } = body;

      // Validate required fields
      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, adgangskode og navn er påkrævet' });
      }

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ error: 'Bruger med denne email eksisterer allerede' });
      }

      // Create new user
      const newUser = {
        id: 'user-' + Date.now(),
        name,
        email,
        password,
        user_type: userType || 'private',
        location: location || '',
        bio: bio || '',
        phone: phone || '',
        website: website || '',
        verified: false,
        is_subscribed: false,
        avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        cover_photo_url: '',
        rating: 0,
        completed_jobs: 0,
        created_at: new Date().toISOString()
      };

      users.push(newUser);

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET || 'demo-secret',
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        message: 'Bruger oprettet succesfuldt',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          userType: newUser.user_type,
          location: newUser.location,
          bio: newUser.bio,
          phone: newUser.phone,
          website: newUser.website,
          verified: newUser.verified,
          isSubscribed: newUser.is_subscribed,
          avatar: newUser.avatar_url,
          coverPhoto: newUser.cover_photo_url,
          rating: newUser.rating,
          completedJobs: newUser.completed_jobs,
          joinedDate: newUser.created_at.split('T')[0]
        },
        token
      });
    }

    if (action === 'login') {
      const { email, password } = body;

      console.log('Login attempt:', { email, password: password ? '***' : 'missing' });

      if (!email || !password) {
        return res.status(400).json({ error: 'Email og adgangskode er påkrævet' });
      }

      // Find user
      const user = users.find(u => u.email === email && u.password === password);
      
      console.log('User found:', user ? 'Yes' : 'No');
      
      if (!user) {
        return res.status(401).json({ error: 'Ugyldig email eller adgangskode' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'demo-secret',
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        message: 'Login succesfuldt',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          location: user.location,
          bio: user.bio,
          phone: user.phone,
          website: user.website,
          verified: user.verified,
          isSubscribed: user.is_subscribed,
          avatar: user.avatar_url,
          coverPhoto: user.cover_photo_url,
          rating: user.rating,
          completedJobs: user.completed_jobs,
          joinedDate: user.created_at.split('T')[0]
        },
        token
      });
    }

    return res.status(400).json({ error: 'Ugyldig handling' });

  } catch (error) {
    console.error('Auth API error:', error);
    return res.status(500).json({ error: 'Server fejl: ' + error.message });
  }
};