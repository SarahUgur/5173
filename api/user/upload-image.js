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
  if (req.method === 'POST') {
    verifyToken(req, res, async () => {
      try {
        // In a real implementation, you would:
        // 1. Process the uploaded file
        // 2. Validate file type and size
        // 3. Upload to cloud storage (AWS S3, Cloudinary, etc.)
        // 4. Save the URL to the database
        // 5. Return the new image URL

        // For now, we'll just acknowledge the upload
        const { type } = req.body;
        
        // Mock successful upload response
        const mockImageUrl = type === 'avatar' 
          ? `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&t=${Date.now()}`
          : `https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop&t=${Date.now()}`;

        res.status(200).json({
          success: true,
          imageUrl: mockImageUrl,
          message: `${type === 'avatar' ? 'Profilbillede' : 'Cover billede'} uploadet succesfuldt`
        });

      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Server fejl ved upload af billede' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}