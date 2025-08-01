const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name, userType, acceptedTerms } = req.body;

  try {
    if (req.body.name) {
      // Registration
      if (!name || !email || !password || !userType || !acceptedTerms) {
        return res.status(400).json({ error: 'Alle felter er påkrævet' });
      }

      // Demo registration - create mock user
      const user = {
        id: Date.now().toString(),
        name,
        email,
        user_type: userType,
        verified: false,
        is_subscribed: false,
        location: 'Danmark',
        created_at: new Date().toISOString()
      };

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'demo-secret',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          verified: user.verified,
          isSubscribed: user.is_subscribed,
          location: user.location,
          joinedDate: user.created_at,
          avatar: '',
          rating: 0,
          completedJobs: 0
        }
      });

    } else {
      // Login
      if (!email || !password) {
        return res.status(400).json({ error: 'Email og adgangskode er påkrævet' });
      }

      // Demo login - accept any email/password combination for easy testing
      const user = {
        id: Date.now().toString(),
        name: email.includes('demo') ? 'Demo Bruger' : email.split('@')[0], // Use email prefix as name
        email,
        user_type: email.includes('demo') ? 'cleaner' : 'private',
        verified: true,
        is_subscribed: false,
        location: email.includes('demo') ? 'København' : 'Danmark',
        created_at: new Date().toISOString(),
        avatar_url: email.includes('demo') ? 
          'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' :
          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        rating: email.includes('demo') ? 4.8 : 4.5,
        completed_jobs: 0,
        bio: email.includes('demo') ? 'Demo bruger - Prøv alle funktioner!' : 'Ny bruger',
        phone: '+45 12 34 56 78',
        website: ''
      };

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'demo-secret',
        { expiresIn: '7d' }
      );

      res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          verified: user.verified,
          isSubscribed: user.is_subscribed,
          location: user.location,
          joinedDate: user.created_at,
          avatar: user.avatar_url || '',
          rating: user.rating || 0,
          completedJobs: user.completed_jobs || 0,
          bio: user.bio || '',
          phone: user.phone || '',
          website: user.website || ''
        }
      });
    }

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Server fejl. Prøv igen senere.' });
  }
}