const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Kun billeder og videoer er tilladt'));
    }
  }
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

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Create new post
    upload.array('images', 10)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

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
            budget,
            videoText,
            videoFilter
          } = req.body;

          // Validate required fields
          if (!content || !location) {
            return res.status(400).json({ error: 'Indhold og lokation er påkrævet' });
          }

          // Check if user is subscribed for job posts
          if (type === 'job') {
            const userResult = await pool.query(
              'SELECT is_subscribed FROM users WHERE id = $1',
              [req.userId]
            );

            if (!userResult.rows[0]?.is_subscribed) {
              return res.status(403).json({ error: 'Kun Pro medlemmer kan oprette job opslag' });
            }
          }

          // Create post
          const postResult = await pool.query(
            `INSERT INTO posts (id, user_id, content, location, post_type, job_type, job_category, 
             target_audience, urgency, budget, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
             RETURNING *`,
            [
              uuidv4(),
              req.userId,
              content,
              location,
              type,
              jobType || null,
              jobCategory || null,
              targetAudience || null,
              urgency || null,
              budget || null
            ]
          );

          const post = postResult.rows[0];

          // Handle file uploads (implement cloud storage like AWS S3, Cloudinary etc.)
          const imageUrls = [];
          if (req.files) {
            for (const file of req.files) {
              // Upload to cloud storage and get URL
              // const imageUrl = await uploadToCloudStorage(file);
              // imageUrls.push(imageUrl);
            }
          }

          // Save image URLs to database
          if (imageUrls.length > 0) {
            await pool.query(
              'UPDATE posts SET images = $1 WHERE id = $2',
              [JSON.stringify(imageUrls), post.id]
            );
          }

          res.status(201).json({
            message: 'Opslag oprettet succesfuldt',
            postId: post.id
          });

        } catch (error) {
          console.error('Error creating post:', error);
          res.status(500).json({ error: 'Server fejl ved oprettelse af opslag' });
        }
      });
    });

  } else if (req.method === 'GET') {
    // Get posts
    verifyToken(req, res, async () => {
      try {
        const { page = 1, limit = 10, type, location } = req.query;
        const offset = (page - 1) * limit;

        let query = `
          SELECT p.*, u.name as user_name, u.avatar_url, u.verified, u.user_type,
                 (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as likes_count,
                 (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comments_count
          FROM posts p
          JOIN users u ON p.user_id = u.id
          WHERE 1=1
        `;
        
        const params = [];
        let paramCount = 0;

        if (type) {
          paramCount++;
          query += ` AND p.post_type = $${paramCount}`;
          params.push(type);
        }

        if (location) {
          paramCount++;
          query += ` AND p.location ILIKE $${paramCount}`;
          params.push(`%${location}%`);
        }

        query += ` ORDER BY p.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
        params.push(limit, offset);

        const result = await pool.query(query, params);

        res.status(200).json({
          posts: result.rows,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: result.rowCount
          }
        });

      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af opslag' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}