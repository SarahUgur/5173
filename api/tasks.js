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
        const status = req.query.status || 'active';

        // Mock tasks data based on status
        const mockTasks = {
          active: [
            {
              id: '1',
              title: 'Hjemmerengøring hos Maria',
              description: 'Almindelig rengøring af 3-værelses lejlighed',
              location: 'København NV',
              client: 'Maria Hansen',
              scheduledDate: '2024-01-25',
              status: 'active',
              budget: '400 kr',
              estimatedHours: 3
            },
            {
              id: '2',
              title: 'Kontorrengøring',
              description: 'Ugentlig rengøring af lille kontor',
              location: 'Aarhus C',
              client: 'Lars Nielsen',
              scheduledDate: '2024-01-26',
              status: 'active',
              budget: '600 kr',
              estimatedHours: 2
            }
          ],
          completed: [
            {
              id: '3',
              title: 'Hovedrengøring villa',
              description: 'Dyb rengøring efter renovering',
              location: 'Odense',
              client: 'Sofie Andersen',
              scheduledDate: '2024-01-20',
              status: 'completed',
              budget: '1200 kr',
              estimatedHours: 6,
              completedAt: '2024-01-20'
            }
          ]
        };

        const tasks = mockTasks[status] || [];

        res.status(200).json({ tasks });

      } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Server fejl ved hentning af opgaver' });
      }
    });

  } else if (req.method === 'POST') {
    // Handle task completion or cancellation
    verifyToken(req, res, async () => {
      try {
        const pathParts = req.url.split('/');
        const taskId = pathParts[3]; // /api/tasks/{taskId}/...
        const action = pathParts[4]; // complete, cancel

        if (!taskId || !action) {
          return res.status(400).json({ error: 'Opgave ID og handling er påkrævet' });
        }

        if (!['complete', 'cancel'].includes(action)) {
          return res.status(400).json({ error: 'Ugyldig handling' });
        }

        // Mock successful task update
        const updatedTask = {
          id: taskId,
          status: action === 'complete' ? 'completed' : 'cancelled',
          updatedAt: new Date().toISOString()
        };

        res.status(200).json({
          message: action === 'complete' ? 'Opgave markeret som færdig' : 'Opgave annulleret',
          task: updatedTask
        });

      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Server fejl ved opdatering af opgave' });
      }
    });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}