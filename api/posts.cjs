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
        is_boosted: true,
        boost_expires_at: null, // Never expires - free forever
        created_at: new Date().toISOString()
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          postId: mockPost.id,
          message: 'Opslag oprettet og boostet gratis for altid'
        })
      };

    } else if (event.httpMethod === 'GET') {
      // Get posts
      // Mock posts data with permanent free boost
      const mockPosts = [
        {
          id: '1',
          userId: 'user1',
          user: {
            id: 'user1',
            name: 'Maria Hansen',
            email: 'maria@example.com',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            verified: true,
            location: 'København NV',
            rating: 4.8,
            completedJobs: 23
          },
          content: 'Søger hjælp til hjemmerengøring hver 14. dag. Har 2 børn og en hund, så erfaring med familier er et plus! 🏠✨',
          location: 'København NV',
          budget: '350 kr',
          jobType: 'hjemmerengoring',
          jobCategory: 'hjemmerengoring',
          urgency: 'flexible',
          isJobPost: true,
          isBoosted: true,
          boostExpiresAt: null,
          boostType: 'free',
          likes: 12,
          comments: [],
          images: ['https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'],
          createdAt: '4 timer siden'
        },
        {
          id: '2',
          userId: 'user2',
          user: {
            id: 'user2',
            name: 'Lars Nielsen',
            email: 'lars@example.com',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            verified: true,
            location: 'Aarhus C',
            rating: 4.9,
            completedJobs: 45
          },
          content: 'Professionel kontorrengøring tilbydes. Har 5+ års erfaring og alle nødvendige forsikringer. Miljøvenlige produkter! 🌱',
          location: 'Aarhus C',
          budget: '600 kr',
          jobType: 'kontorrengoring',
          jobCategory: 'kontorrengoring',
          urgency: 'this_week',
          isJobPost: false,
          isBoosted: true,
          boostExpiresAt: null,
          boostType: 'free',
          likes: 8,
          comments: [],
          createdAt: '1 dag siden'
        },
        {
          id: '3',
          userId: 'user3',
          user: {
            id: 'user3',
            name: 'Sofie Andersen',
            email: 'sofie@example.com',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            verified: false,
            location: 'Odense',
            rating: 4.7,
            completedJobs: 12
          },
          content: 'AKUT: Vores kontor har brug for rengøring i morgen tidlig! Vigtigt klientmøde kl. 10. Kan betale ekstra for kort varsel. 🚨',
          location: 'Odense C',
          budget: '800 kr',
          jobType: 'kontorrengoring',
          jobCategory: 'kontorrengoring',
          urgency: 'immediate',
          isJobPost: true,
          isBoosted: true,
          boostExpiresAt: null,
          boostType: 'free',
          likes: 15,
          comments: [],
          createdAt: '30 minutter siden'
        }
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          posts: mockPosts,
          hasMore: false,
          pagination: {
            page: 1,
            limit: 10,
            total: mockPosts.length
          }
        })
      };

    } else if (event.httpMethod === 'PUT') {
      // Handle post sharing
      const urlParts = event.path.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      const postId = urlParts[urlParts.length - 2];
      
      if (lastPart === 'share') {
        const body = JSON.parse(event.body || '{}');
        const { platform } = body;
        
        console.log('Post shared:', { postId, platform });
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Deling registreret' })
        };
      } else if (lastPart === 'boost') {
        const body = JSON.parse(event.body || '{}');
        const { type = 'free', duration = 'forever' } = body;
        
        console.log('Post boosted:', { postId, type, duration });
        
        // Mock successful boost - all posts are permanently boosted for free
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'Opslag boostet GRATIS FOR ALTID!',
            boost: {
              type: 'free',
              expiresAt: null,
              permanent: true
            }
          })
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