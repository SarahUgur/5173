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

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    // Create new post
    verifyToken(req, res, async () => {
      try {
        const {
          type,
          content,
          location,
          jobType,
          jobCategory,
          targetAudience,
          urgency,
          budget
        } = req.body;

        // Validate required fields
        if (!content || !location) {
          return res.status(400).json({ error: 'Indhold og lokation er påkrævet' });
        }

        // Mock post creation for demo
        const mockPost = {
          id: uuidv4(),
          user_id: req.userId,
          content,
          location,
          post_type: type,
          job_type: jobType || null,
          job_category: jobCategory || null,
          target_audience: targetAudience || null,
          urgency: urgency || null,
          budget: budget || null,
          created_at: new Date().toISOString()
        };

        res.status(201).json({
          message: 'Opslag oprettet succesfuldt',
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
      // Mock posts data for demo
      const mockPosts = [
        {
          id: '1',
          user: {
            id: '1',
            name: 'Maria Hansen',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            verified: true,
            userType: 'private'
          },
          content: 'Søger pålidelig rengøringshjælp til mit hjem i København. Har brug for hjælp hver 14. dag, ca. 3 timer ad gangen.',
          location: 'København NV',
          budget: '300-400 kr',
          createdAt: '2 timer siden',
          likes: 12,
          comments: [],
          isJobPost: true,
          jobType: 'home_cleaning',
          urgency: 'flexible'
        },
        {
          id: '2',
          user: {
            id: '2',
            name: 'Lars Nielsen',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            verified: true,
            userType: 'cleaner'
          },
          content: 'Tilbyder professionel kontorrengøring i Aarhus området. 10+ års erfaring og miljøvenlige produkter.',
          location: 'Aarhus C',
          budget: '500-600 kr',
          createdAt: '4 timer siden',
          likes: 8,
          comments: [],
          isJobPost: false,
          jobType: 'office_cleaning',
          urgency: 'flexible'
        }
      ];

      res.status(200).json({
        posts: mockPosts,
        hasMore: false,
        pagination: {
          page: 1,
          limit: 10,
          total: mockPosts.length
        }
      });

    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Server fejl ved hentning af opslag' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}