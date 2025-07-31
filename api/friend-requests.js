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
        // Mock friend requests data
        const mockData = {
          received: [
            {
              id: '1',
              user: {
                id: '2',
                name: 'Peter Larsen',
                avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
                location: 'København',
                userType: 'cleaner',
                mutualFriends: 2
              },
              message: 'Hej! Jeg så dit opslag og vil gerne forbinde.',
              createdAt: new Date().toISOString()
            }
          ],
          sent: [],
          suggestions: [
            {
              id: '3',
              name: 'Sofie Andersen',
              avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
              userType: 'small_business',
              location: 'Aarhus',
              rating: 4.9,
              mutualFriends: 1,
              reason: 'Arbejder i samme branche'
            }
          ]
        };

        res.status(200).json(mockData);

      } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af venskabsanmodninger' });
      }
    });

  } else if (req.method === 'POST') {
    // Send friend request
    verifyToken(req, res, async () => {
      try {
        const { userId } = req.body;

        if (!userId) {
          return res.status(400).json({ error: 'Bruger ID er påkrævet' });
        }

        // Mock successful friend request
        res.status(201).json({ message: 'Venskabsanmodning sendt succesfuldt' });

      } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ error: 'Server fejl ved afsendelse af venskabsanmodning' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}