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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const user = verifyToken(event);
    const query = event.queryStringParameters?.q || '';

    // Mock search results
    const mockResults = [
      {
        id: '1',
        type: 'user',
        name: 'Maria Hansen',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        location: 'København',
        userType: 'Privat kunde'
      },
      {
        id: '2',
        type: 'job',
        title: 'Hjemmerengøring søges',
        content: 'Søger pålidelig rengøringshjælp til mit hjem',
        location: 'København NV'
      },
      {
        id: '3',
        type: 'page',
        title: 'Hjælp & Support',
        description: 'Find svar på dine spørgsmål',
        page: 'support'
      }
    ].filter(item => 
      item.name?.toLowerCase().includes(query.toLowerCase()) ||
      item.title?.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ results: mockResults })
    };

  } catch (error) {
    return {
      statusCode: error.message === 'Ingen adgangstoken' || error.message === 'Ugyldig token' ? 401 : 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};