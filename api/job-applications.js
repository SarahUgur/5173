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

      // Get job applications for user's posts
      const { data: applications, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          posts (
            id,
            content,
            location,
            job_category,
            budget
          ),
          applicant:users!job_applications_applicant_id_fkey (
            id,
            name,
            avatar_url,
            user_type,
            rating,
            verified
          )
        `)
        .eq('posts.user_id', user.id);

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(applications || [])
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
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Invalid token' })
        };
      }

      const applicationData = JSON.parse(event.body);
      
      const { data: application, error } = await supabase
        .from('job_applications')
        .insert([{
          post_id: applicationData.post_id,
          applicant_id: user.id,
          message: applicationData.message,
          contact_method: applicationData.contact_method
        }])
        .select(`
          *,
          posts (
            id,
            content,
            location,
            job_category,
            budget
          ),
          applicant:users!job_applications_applicant_id_fkey (
            id,
            name,
            avatar_url,
            user_type,
            rating,
            verified
          )
        `)
        .single();

      if (error) throw error;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(application)
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