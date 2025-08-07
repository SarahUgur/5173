const jwt = require('jsonwebtoken');

// Simple in-memory storage for messages
let messages = [];

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
    
    if (event.httpMethod === 'GET') {
      // Get messages for user
      const userMessages = messages.filter(msg => 
        msg.sender_id === user.userId || msg.receiver_id === user.userId
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(userMessages)
      };
    }

    if (event.httpMethod === 'POST') {
      const messageData = JSON.parse(event.body);
      
      const newMessage = {
        id: 'msg-' + Date.now(),
        sender_id: user.userId,
        receiver_id: messageData.receiver_id,
        content: messageData.content,
        read: false,
        created_at: new Date().toISOString()
      };

      messages.push(newMessage);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newMessage)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Messages API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};