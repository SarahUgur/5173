const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Check if Supabase is properly configured
  if (!supabase) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Server konfigurationsfejl - Supabase ikke tilgængelig' 
      })
    };
  }

  try {
    const { action } = event.queryStringParameters || {};
    const body = event.body ? JSON.parse(event.body) : {};

    if (action === 'register') {
      const { email, password, name, phone, location, website, bio, userType, acceptedTerms } = body;

      // Validate required fields
      if (!email || !password || !name) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email, adgangskode og navn er påkrævet' })
        };
      }

      // Validate terms acceptance
      if (!acceptedTerms) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Du skal acceptere vilkår og betingelser for at oprette en konto' })
        };
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (authError) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: authError.message })
        };
      }

      // Create user profile in public.users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          name,
          email,
          user_type: userType || 'private',
          location: location || '',
          bio: bio || '',
          phone: phone || '',
          website: website || '',
          verified: false,
          is_subscribed: false
        })
        .select()
        .single();

      if (userError) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: userError.message })
        };
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          message: 'Bruger oprettet succesfuldt',
          user: userData
        })
      };
    }

    if (action === 'login') {
      const { email, password } = body;

      if (!email || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email og adgangskode er påkrævet' })
        };
      }

      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Ugyldig email eller adgangskode' })
        };
      }

      // Get user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Brugerprofil ikke fundet' })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Login succesfuldt',
          user: userData,
          token: authData.session.access_token
        })
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Ugyldig handling' })
    };

  } catch (error) {
    console.error('Auth API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server fejl ved authentication' })
    };
  }
};