const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    const { action } = event.queryStringParameters || {};
    const body = JSON.parse(event.body || '{}');

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

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (existingUser) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'En bruger med denne email eksisterer allerede' })
        };
      }

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: false // Disable email confirmation
      });

      if (authError) {
        console.error('Auth creation error:', authError);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: authError.message || 'Kunne ikke oprette bruger' })
        };
      }

      // Create user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          name,
          email,
          phone: phone || null,
          location: location || null,
          website: website || null,
          bio: bio || null,
          user_type: userType || 'private',
          verified: false,
          is_subscribed: false
        }])
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Clean up auth user if profile creation fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Kunne ikke oprette brugerprofil' })
        };
      }

      // Generate session token
      const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
        type: 'signup',
        email,
        password
      });

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          message: 'Bruger oprettet succesfuldt',
          user: {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            avatar: profile.avatar_url,
            userType: profile.user_type,
            verified: profile.verified,
            isSubscribed: profile.is_subscribed,
            location: profile.location,
            bio: profile.bio,
            phone: profile.phone,
            website: profile.website,
            rating: profile.rating,
            completedJobs: profile.completed_jobs,
            joinedDate: profile.created_at?.split('T')[0]
          },
          token: sessionData?.properties?.access_token || 'demo-token'
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

      // Authenticate user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Forkert email eller adgangskode' })
        };
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
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
          user: {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            avatar: profile.avatar_url,
            userType: profile.user_type,
            verified: profile.verified,
            isSubscribed: profile.is_subscribed,
            location: profile.location,
            bio: profile.bio,
            phone: profile.phone,
            website: profile.website,
            rating: profile.rating,
            completedJobs: profile.completed_jobs,
            joinedDate: profile.created_at?.split('T')[0]
          },
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