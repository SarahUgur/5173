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
      // Get messages for user
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:users!messages_sender_id_fkey (
            id,
            name,
            avatar_url
          ),
          receiver:users!messages_receiver_id_fkey (
            id,
            name,
            avatar_url
          )
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(messages || [])
      };
    }

    if (event.httpMethod === 'POST') {
      const messageData = JSON.parse(event.body);
      
      const { data: message, error } = await supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          receiver_id: messageData.receiver_id,
          content: messageData.content
        }])
        .select(`
          *,
          sender:users!messages_sender_id_fkey (
            id,
            name,
            avatar_url
          ),
          receiver:users!messages_receiver_id_fkey (
            id,
            name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(message)
      };
    }

    if (event.httpMethod === 'PUT') {
      const { messageId } = event.queryStringParameters || {};
      
      if (!messageId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Message ID required' })
        };
      }

      // Mark message as read
      const { data: message, error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .eq('receiver_id', user.id)
        .select()
        .single();

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(message)
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