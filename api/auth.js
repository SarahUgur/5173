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

exports.handler = async (event, context) => {
  // Debug JWT_SECRET availability
  console.log('JWT_SECRET status:', process.env.JWT_SECRET ? 'Defined' : 'Undefined');
  console.log('Environment variables available:', Object.keys(process.env).filter(key => key.includes('JWT')));
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { action } = event.queryStringParameters || {};
    const body = event.body ? JSON.parse(event.body) : {};

    console.log('Auth request:', { action, body: JSON.stringify(body) });

    if (action === 'register') {
      const { email, password, name, phone, location, website, bio, userType, acceptedTerms } = body;

      // Validate required fields
      if (!email || !password || !name) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email, adgangskode og navn er påkrævet' })
        };
      }

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Bruger med denne email eksisterer allerede' })
        };
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

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
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
        })
      };
    }

    if (action === 'login') {
      const { email, password } = body;

      console.log('Login attempt:', { email, password: password ? '***' : 'missing' });

      if (!email || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email og adgangskode er påkrævet' })
        };
      }

      // Find user
      const user = users.find(u => u.email === email && u.password === password);
      
      console.log('User found:', user ? 'Yes' : 'No');
      
      if (!user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Ugyldig email eller adgangskode' })
        };
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'demo-secret',
        { expiresIn: '7d' }
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
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
        })
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Ugyldig handling' })
    };

  } catch (error) {
    console.error('Auth API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server fejl: ' + error.message })
    };
  }
};