const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Auth API - Environment check:', {
  hasUrl: !!supabaseUrl,
  hasServiceKey: !!supabaseServiceKey,
  url: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'missing'
});

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey
  });
}

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

  console.log('Auth API called:', {
    method: event.httpMethod,
    query: event.queryStringParameters,
    hasBody: !!event.body
  });

  // Check if Supabase is properly configured
  if (!supabase) {
    console.error('Supabase not configured properly');
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

    console.log('Processing action:', action, 'with body keys:', Object.keys(body));

    if (action === 'register') {
      const { email, password, name, phone, location, website, bio, userType, acceptedTerms } = body;

      console.log('Registration attempt for:', email);

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
        console.error('Supabase auth error:', authError);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: authError.message })
        };
      }

      console.log('User created in auth, creating profile...');

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
        console.error('User profile creation error:', userError);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: userError.message })
        };
      }

      console.log('Registration successful for:', email);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          message: 'Bruger oprettet succesfuldt',
          user: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            userType: userData.user_type,
            location: userData.location,
            bio: userData.bio,
            phone: userData.phone,
            website: userData.website,
            verified: userData.verified,
            isSubscribed: userData.is_subscribed,
            avatar: userData.avatar_url,
            coverPhoto: userData.cover_photo_url,
            rating: userData.rating,
            completedJobs: userData.completed_jobs,
            joinedDate: userData.created_at?.split('T')[0]
          },
          token: 'demo-token-' + userData.id
        })
      };
    }

    if (action === 'login') {
      const { email, password } = body;

      console.log('Login attempt for:', email);

      if (!email || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email og adgangskode er påkrævet' })
        };
      }

      // Special handling for admin user
      if (email === 'admin@privaterengoring.dk' && password === 'admin123') {
        console.log('Admin login successful');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: 'Admin login succesfuldt',
            user: {
              id: 'admin-user-id',
              name: 'Admin',
              email: 'admin@privaterengoring.dk',
              userType: 'admin',
              location: 'Danmark',
              bio: 'Platform administrator',
              phone: '',
              website: '',
              verified: true,
              isSubscribed: true,
              avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
              coverPhoto: '',
              rating: 5.0,
              completedJobs: 0,
              joinedDate: '2024-01-01'
            },
            token: 'admin-token-123'
          })
        };
      }

      // Try to get user from database first
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.error('Database error:', userError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Database fejl' })
        };
      }

      if (!existingUser) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Bruger ikke fundet. Opret venligst en konto først.' })
        };
      }

      // For demo purposes, accept any password for existing users
      // In production, you would verify the password with Supabase Auth
      console.log('Login successful for:', email);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Login succesfuldt',
          user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            userType: existingUser.user_type,
            location: existingUser.location,
            bio: existingUser.bio,
            phone: existingUser.phone,
            website: existingUser.website,
            verified: existingUser.verified,
            isSubscribed: existingUser.is_subscribed,
            avatar: existingUser.avatar_url,
            coverPhoto: existingUser.cover_photo_url,
            rating: existingUser.rating,
            completedJobs: existingUser.completed_jobs,
            joinedDate: existingUser.created_at?.split('T')[0]
          },
          token: 'demo-token-' + existingUser.id
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
      body: JSON.stringify({ error: 'Server fejl ved authentication: ' + error.message })
    };
  }
};