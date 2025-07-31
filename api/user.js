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

export default async function handler(req, res) {
  if (req.method === 'GET') {
    verifyToken(req, res, async () => {
      try {
        const pathParts = req.url.split('/');
        const userId = pathParts[3]; // /api/user/{userId}/...
        const endpoint = pathParts[4]; // stats, posts, friends, activity
        
        // Mock user data for demo
        const mockUserStats = {
          posts: 12,
          friends: 45,
          rating: 4.8,
          completedJobs: 23,
          joinDate: '2023-08-15',
          profileViews: 156,
          totalLikes: 89,
          totalComments: 34
        };

        const mockUserPosts = [
          {
            id: '1',
            content: 'Lige afsluttet en fantastisk rengøring i Østerbro! Kunden var super tilfreds 😊',
            images: ['https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'],
            likes: 24,
            comments: 8,
            createdAt: '2 dage siden'
          },
          {
            id: '2',
            content: 'Søger nye kunder i København området. Specialiseret i miljøvenlig rengøring 🌱',
            likes: 18,
            comments: 12,
            createdAt: '1 uge siden'
          }
        ];

        const mockUserFriends = [
          {
            id: '1',
            name: 'Peter Larsen',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            location: 'København'
          },
          {
            id: '2',
            name: 'Sofie Andersen',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            location: 'Aarhus'
          }
        ];

        const mockUserActivity = [
          {
            type: 'like',
            action: 'Likede',
            target: 'Marias opslag om hjemmerengøring',
            time: '2 timer siden'
          },
          {
            type: 'comment',
            action: 'Kommenterede på',
            target: 'Lars\' kontorrengøring opslag',
            time: '5 timer siden'
          },
          {
            type: 'friend',
            action: 'Blev venner med',
            target: 'Sofie Andersen',
            time: '1 dag siden'
          },
          {
            type: 'post',
            action: 'Oprettede',
            target: 'nyt rengøringsjob opslag',
            time: '2 dage siden'
          }
        ];

        // Return appropriate data based on endpoint
        switch (endpoint) {
          case 'stats':
            res.status(200).json(mockUserStats);
            break;
          case 'posts':
            res.status(200).json(mockUserPosts);
            break;
          case 'friends':
            res.status(200).json(mockUserFriends);
            break;
          case 'activity':
            res.status(200).json(mockUserActivity);
            break;
          default:
            res.status(404).json({ error: 'Endpoint ikke fundet' });
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af brugerdata' });
      }
    });

  } else if (req.method === 'PUT') {
    // Update user profile
    verifyToken(req, res, async () => {
      try {
        const { name, bio, location, phone, website } = req.body;

        // Mock successful update
        const updatedUser = {
          id: req.userId,
          name,
          bio,
          location,
          phone,
          website,
          updatedAt: new Date().toISOString()
        };

        res.status(200).json(updatedUser);

      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server fejl ved opdatering af profil' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}