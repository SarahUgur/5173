const jwt = require('jsonwebtoken');

// Simple user storage
const users = {
  'admin-user-id': {
    id: 'admin-user-id',
    name: 'Admin',
    email: 'admin@privaterengoring.dk',
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
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authorization required' })
      };
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    
    if (event.httpMethod === 'GET') {
      const user = users[decoded.userId];
      
      if (!user) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'User not found' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          verified: user.verified,
          isSubscribed: user.is_subscribed,
          location: user.location,
          avatar: user.avatar_url,
          coverPhoto: user.cover_photo_url,
          rating: user.rating,
          completedJobs: user.completed_jobs,
          bio: user.bio,
          phone: user.phone,
          website: user.website,
          joinedDate: user.created_at.split('T')[0]
        })
      };
    }

    if (event.httpMethod === 'PUT') {
      const updateData = JSON.parse(event.body);
      const user = users[decoded.userId];
      
      if (!user) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'User not found' })
        };
      }

      // Update user data
      Object.assign(user, {
        name: updateData.name || user.name,
        location: updateData.location || user.location,
        bio: updateData.bio || user.bio,
        phone: updateData.phone || user.phone,
        website: updateData.website || user.website,
        avatar_url: updateData.avatar || user.avatar_url,
        cover_photo_url: updateData.coverPhoto || user.cover_photo_url
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          verified: user.verified,
          isSubscribed: user.is_subscribed,
          location: user.location,
          avatar: user.avatar_url,
          coverPhoto: user.cover_photo_url,
          rating: user.rating,
          completedJobs: user.completed_jobs,
          bio: user.bio,
          phone: user.phone,
          website: user.website,
          joinedDate: user.created_at.split('T')[0]
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('User API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};