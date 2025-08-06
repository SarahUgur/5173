const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

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
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid token' })
      };
    }

    if (event.httpMethod === 'GET') {
      // Get notifications for user
      const { data: notifications, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(notifications || [])
      };
    }

    if (event.httpMethod === 'POST') {
      const notificationData = JSON.parse(event.body);
      
      const { data: notification, error } = await supabase
        .from('notifications')
        .insert([{
          user_id: notificationData.user_id,
          type: notificationData.type,
          title: notificationData.title,
          message: notificationData.message,
          data: notificationData.data
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(notification)
      };
    }

    if (event.httpMethod === 'PUT') {
      const { notificationId } = event.queryStringParameters || {};
      
      if (!notificationId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Notification ID required' })
        };
      }

      // Mark notification as read
      const { data: notification, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(notification)
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