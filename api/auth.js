const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
    if (event.httpMethod === 'POST') {
      const { email, password, name, userType, acceptedTerms } = JSON.parse(event.body);

      // Login
      if (!name) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        const token = jwt.sign(
          { userId: data.user.id, email: data.user.email },
          process.env.JWT_SECRET || 'fallback-secret',
          { expiresIn: '7d' }
        );

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            token,
            user: {
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
            }
          })
        };
      }

      // Register
      if (!acceptedTerms) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Du skal acceptere vilkår og betingelser' })
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            user_type: userType
          }
        }
      });

      if (error) throw error;

      // Create user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          name,
          email,
          user_type: userType
        }])
        .select()
        .single();

      if (profileError) throw profileError;

      const token = jwt.sign(
        { userId: data.user.id, email: data.user.email },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          token,
          user: {
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
          }
        })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
};