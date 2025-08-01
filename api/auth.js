const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password, name, userType, acceptedTerms } = req.body;

      // Admin login only
      if (email === 'admin@privaterengoring.dk' && password === 'admin123') {
        const adminUser = {
          id: 'admin',
          name: 'Administrator',
          email: 'admin@privaterengoring.dk',
          userType: 'admin',
          verified: true,
          isSubscribed: true,
          location: 'Danmark',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          rating: 5.0,
          completedJobs: 0,
          bio: 'Platform Administrator',
          phone: '+45 12 34 56 78',
          website: 'https://privaterengoring.dk',
          joinedDate: '2024-01-01'
        };
        
        const token = jwt.sign(
          { userId: adminUser.id, email: adminUser.email },
          process.env.JWT_SECRET || 'demo-secret',
          { expiresIn: '7d' }
        );

        return res.status(200).json({
          user: adminUser,
          token
        });
      }

      // For all other users - require real authentication
      // In production, this would connect to your database
      return res.status(401).json({ 
        error: 'Kun registrerede brugere kan logge ind. Opret en konto eller kontakt admin@privaterengoring.dk' 
      });

    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ error: 'Server fejl ved login' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}