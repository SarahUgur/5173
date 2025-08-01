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
  if (req.method === 'GET') {
    verifyToken(req, res, async () => {
      try {
        // Return empty array - no fake users
        res.status(200).json([]);

      } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Server fejl ved søgning af brugere' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}