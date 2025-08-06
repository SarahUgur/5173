const jwt = require('jsonwebtoken');

// Helper function to verify JWT token
const verifyToken = (event) => {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    throw new Error('Ingen adgangstoken');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    return decoded;
  } catch (error) {
    throw new Error('Ugyldig token');
  }
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const user = verifyToken(event);

    if (event.httpMethod === 'GET') {
      const status = event.queryStringParameters?.status || 'active';

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

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ tasks })
      };

    } else if (event.httpMethod === 'POST') {
      const { taskId, action } = JSON.parse(event.body || '{}');

      if (!taskId || !action) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Opgave ID og handling er påkrævet' })
        };
      }

      if (!['complete', 'cancel'].includes(action)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Ugyldig handling' })
        };
      }

      // Mock successful task update
      const updatedTask = {
        id: taskId,
        status: action === 'complete' ? 'completed' : 'cancelled',
        updatedAt: new Date().toISOString()
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: action === 'complete' ? 'Opgave markeret som færdig' : 'Opgave annulleret',
          task: updatedTask
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    return {
      statusCode: error.message === 'Ingen adgangstoken' || error.message === 'Ugyldig token' ? 401 : 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};