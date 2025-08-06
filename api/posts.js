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
    if (event.httpMethod === 'GET') {
      // Get posts with user information
      const { data: posts, error } = await supabase
        .from('posts')
        .select(`
          *,
          users (
            id,
            name,
            avatar_url,
            user_type,
            verified
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to fetch posts' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ posts: posts || [] })
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

      const body = JSON.parse(event.body);
      const { content, location, job_type, job_category, urgency, budget, is_job_post, images, user_id } = body;

      const { data: post, error } = await supabase
        .from('posts')
        .insert([{
          user_id,
          content,
          location,
          job_type,
          job_category,
          urgency,
          budget,
          is_job_post: is_job_post || false,
          images: images || []
        }])
        .select(`
          *,
          users (
            id,
            name,
            avatar_url,
            user_type,
            verified
          )
        `)
        .single();

      if (error) {
        console.error('Error creating post:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to create post' })
        };
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ post })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Posts API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};