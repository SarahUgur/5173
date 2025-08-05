const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (event, callback) => {
  const token = event.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return callback(null, {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Ingen adgangstoken' })
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    return callback(null, { userId: decoded.userId });
  } catch (error) {
    return callback(null, {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Ugyldig token' })
    });
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

  if (event.httpMethod === 'POST') {
    return new Promise((resolve) => {
      verifyToken(event, (err, result) => {
        if (result.statusCode) {
          return resolve(result);
        }

        try {
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

          resolve({
            statusCode: 201,
            headers,
            body: JSON.stringify({
              postId: mockPost.id,
              message: 'Opslag oprettet succesfuldt'
            })
          });

        } catch (error) {
          console.error('Error creating post:', error);
          resolve({
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Server fejl ved oprettelse af opslag' })
          });
        }
      });
    });

  } else if (event.httpMethod === 'GET') {
    // Get posts
    try {
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

    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server fejl ved hentning af opslag' })
      };
    }

  } else if (event.httpMethod === 'PUT') {
    // Handle post sharing
    const urlParts = event.path.split('/');
    if (urlParts[urlParts.length - 1] === 'share') {
      try {
        const body = JSON.parse(event.body || '{}');
        const { platform } = body;
        const postId = urlParts[urlParts.length - 2];
        
        console.log('Post shared:', { postId, platform });
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Deling registreret' })
        };
      } catch (error) {
        console.error('Error tracking share:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Server fejl ved registrering af deling' })
        };
      }
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
};