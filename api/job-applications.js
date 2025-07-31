const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

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
  if (req.method === 'POST') {
    // Send job application
    verifyToken(req, res, async () => {
      try {
        const { postId, message, contactMethod, applicantId } = req.body;

        if (!postId || !message || !contactMethod) {
          return res.status(400).json({ error: 'Post ID, besked og kontaktmetode er påkrævet' });
        }

        // Mock successful application
        const application = {
          id: uuidv4(),
          postId,
          applicantId: applicantId || req.userId,
          message,
          contactMethod,
          status: 'pending',
          createdAt: new Date().toISOString()
        };

        res.status(201).json({
          message: 'Ansøgning sendt succesfuldt',
          applicationId: application.id
        });

      } catch (error) {
        console.error('Error sending job application:', error);
        res.status(500).json({ error: 'Server fejl ved afsendelse af ansøgning' });
      }
    });

  } else if (req.method === 'GET') {
    // Get job applications
    verifyToken(req, res, async () => {
      try {
        // Mock applications data
        const mockApplications = [
          {
            id: '1',
            postId: '1',
            applicantId: req.userId,
            message: 'Jeg er interesseret i dette job og har erfaring med hjemmerengøring.',
            contactMethod: 'chat',
            status: 'pending',
            createdAt: new Date().toISOString()
          }
        ];

        res.status(200).json(mockApplications);

      } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af ansøgninger' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}