const jwt = require('jsonwebtoken');

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
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    verifyToken(req, res, async () => {
      try {
        const { title, description, location, jobCategory, targetAudience, urgency } = req.body;

        // Create mock post response
        const mockPost = {
          id: Date.now().toString(),
          title: title || '',
          description: description || '',
          location: location || '',
          job_category: jobCategory || null,
          target_audience: targetAudience || null,
          urgency: urgency || null,
          created_at: new Date().toISOString()
        };

        res.status(201).json({
          postId: mockPost.id
        });

      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Server fejl ved oprettelse af opslag' });
      }
    });

  } else if (req.method === 'GET') {
    // Get posts
    try {
      res.status(200).json({
        posts: [],
        hasMore: false,
        pagination: {
          page: 1,
          limit: 10,
          total: 0
        }
      });

    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Server fejl ved hentning af opslag' });
    }

  } else if (req.method === 'PUT') {
    // Handle post sharing
    const urlParts = req.url.split('/');
    if (urlParts[urlParts.length - 1] === 'share') {
      try {
        const { platform } = req.body;
        const postId = urlParts[urlParts.length - 2];
        
        console.log('Post shared:', { postId, platform });
        
        res.status(200).json({ message: 'Deling registreret' });
      } catch (error) {
        console.error('Error tracking share:', error);
        res.status(500).json({ error: 'Server fejl ved registrering af deling' });
      }
    } else {
      res.status(404).json({ error: 'Endpoint ikke fundet' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}