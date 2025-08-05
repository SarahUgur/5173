const jwt = require('jsonwebtoken');

// Refactored verifyToken function to use async/await instead of callbacks
const verifyToken = async (event) => {
  const token = event.headers.authorization?.split(' ')[1];
  
  if (!token) {
    throw new Error('Ingen adgangstoken');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    return decoded.userId;
  } catch (error) {
    throw new Error('Ugyldig token');
  }
};

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod === 'POST') {
      // Verify token for POST requests
      try {
        const userId = await verifyToken(event);
      } catch (error) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: error.message })
        };
      }

      const body = JSON.parse(event.body || '{}');
      const { type, content, location, jobType, jobCategory, targetAudience, urgency, budget } = body;

      // Create mock post response
      const mockPost = {
        id: Date.now().toString(),
        type: type || 'regular',
        content: content || '',
        location: location || '',
        job_type: jobType || null,
        job_category: jobCategory || null,
        target_audience: targetAudience || null,
        urgency: urgency || null,
        budget: budget || null,
        created_at: new Date().toISOString()
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          postId: mockPost.id,
          message: 'Opslag oprettet succesfuldt'
        })
      };

    } else if (event.httpMethod === 'GET') {
      // Get posts
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          posts: [],
          hasMore: false,
          pagination: {
            page: 1,
            limit: 10,
            total: 0
          }
        })
      };

    } else if (event.httpMethod === 'PUT') {
      // Handle post sharing
      const urlParts = event.path.split('/');
      if (urlParts[urlParts.length - 1] === 'share') {
        const body = JSON.parse(event.body || '{}');
        const { platform } = body;
        const postId = urlParts[urlParts.length - 2];
        
        console.log('Post shared:', { postId, platform });
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Deling registreret' })
        };
      } else {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Endpoint ikke fundet' })
        };
      }

    } else {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server fejl' })
    };
  }
};