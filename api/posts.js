const jwt = require('jsonwebtoken');

// Simple in-memory storage for posts
let posts = [];

// Helper function to verify JWT token
const verifyToken = (authHeader) => {
  if (!authHeader) {
    throw new Error('Authorization required');
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
  } catch (error) {
    throw new Error('Invalid token');
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
    if (event.httpMethod === 'GET') {
      // Return all posts with mock user data
      const postsWithUsers = posts.map(post => ({
        ...post,
        users: {
          id: post.user_id,
          name: post.user_id === 'admin-user-id' ? 'Admin' : 'Demo User',
          avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          user_type: post.user_id === 'admin-user-id' ? 'admin' : 'private',
          verified: true
        }
      }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ posts: postsWithUsers })
      };
    }

    if (event.httpMethod === 'POST') {
      const user = verifyToken(event.headers.authorization);
      const body = JSON.parse(event.body);
      
      const { content, location, job_type, job_category, urgency, budget, is_job_post, images } = body;

      const newPost = {
        id: 'post-' + Date.now(),
        user_id: user.userId,
        content,
        location,
        job_type,
        job_category,
        urgency,
        budget,
        is_job_post: is_job_post || false,
        is_boosted: true,
        boost_expires_at: null,
        images: images || [],
        likes_count: 0,
        comments_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      posts.unshift(newPost);

      const postWithUser = {
        ...newPost,
        users: {
          id: user.userId,
          name: user.userId === 'admin-user-id' ? 'Admin' : 'Demo User',
          avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          user_type: user.userId === 'admin-user-id' ? 'admin' : 'private',
          verified: true
        }
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ post: postWithUser })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Posts API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};