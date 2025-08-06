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
      // Get user profile
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          userType: profile.user_type,
          verified: profile.verified,
          isSubscribed: profile.is_subscribed,
          location: profile.location,
          avatar: profile.avatar_url,
          coverPhoto: profile.cover_photo_url,
          rating: profile.rating,
          completedJobs: profile.completed_jobs,
          bio: profile.bio,
          phone: profile.phone,
          website: profile.website,
          joinedDate: profile.created_at?.split('T')[0]
        })
      };
    }

    if (event.httpMethod === 'PUT') {
      const updateData = JSON.parse(event.body);
      
      const { data: profile, error } = await supabase
        .from('users')
        .update({
          name: updateData.name,
          location: updateData.location,
          bio: updateData.bio,
          phone: updateData.phone,
          website: updateData.website,
          avatar_url: updateData.avatar,
          cover_photo_url: updateData.coverPhoto
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          userType: profile.user_type,
          verified: profile.verified,
          isSubscribed: profile.is_subscribed,
          location: profile.location,
          avatar: profile.avatar_url,
          coverPhoto: profile.cover_photo_url,
          rating: profile.rating,
          completedJobs: profile.completed_jobs,
          bio: profile.bio,
          phone: profile.phone,
          website: profile.website,
          joinedDate: profile.created_at?.split('T')[0]
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('User API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};