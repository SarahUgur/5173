const jwt = require('jsonwebtoken');

// Simple in-memory storage for job applications
let jobApplications = [];

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
    if (event.httpMethod === 'GET') {
      const authHeader = event.headers.authorization;
      if (!authHeader) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Authorization required' })
        };
      }

      const token = authHeader.replace('Bearer ', '');
      const user = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');

      // Get job applications for user
      const userApplications = jobApplications.filter(app => 
        app.applicant_id === user.userId
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(userApplications)
      };
    }

    if (event.httpMethod === 'POST') {
      const authHeader = event.headers.authorization;
      if (!authHeader) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Authorization required' })
        };
      }

      const token = authHeader.replace('Bearer ', '');
      const user = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
      
      const applicationData = JSON.parse(event.body);
      
      const newApplication = {
        id: 'app-' + Date.now(),
        post_id: applicationData.post_id || applicationData.postId,
        applicant_id: user.userId,
        message: applicationData.message,
        contact_method: applicationData.contact_method || applicationData.contactMethod,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      jobApplications.push(newApplication);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newApplication)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Job applications API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};