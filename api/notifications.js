const jwt = require('jsonwebtoken');

// Simple in-memory storage for notifications
let notifications = [];

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
      // Get notifications for user
      const userNotifications = notifications.filter(notif => 
        notif.user_id === user.userId
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(userNotifications)
      };
    }

    if (event.httpMethod === 'POST') {
      const notificationData = JSON.parse(event.body);
      
      const newNotification = {
        id: 'notif-' + Date.now(),
        user_id: notificationData.user_id,
        type: notificationData.type,
        title: notificationData.title,
        message: notificationData.message,
        read: false,
        data: notificationData.data,
        created_at: new Date().toISOString()
      };

      notifications.push(newNotification);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newNotification)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Notifications API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};