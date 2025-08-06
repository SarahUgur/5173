const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  // Use fallback for demo
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

      // Create user with demo data if Supabase not available
      const userId = `user_${Date.now()}`;
      const userData = {
        id: userId,
        name,
        email,
        avatar: `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop`,
        userType: userType || 'private',
        verified: false,
        isSubscribed: false,
        location: location || '',
        bio: bio || '',
        phone: phone || '',
        website: website || '',
        rating: 0,
        completedJobs: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      };

      // Save to localStorage for demo
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Check if user already exists
      if (existingUsers.find((u: any) => u.email === email)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'En bruger med denne email eksisterer allerede' })
        };
      }

      existingUsers.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          message: 'Bruger oprettet succesfuldt',
          user: userData,
          token: `token_${userId}`
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

      // Check for admin login
      if (email === 'admin@privaterengoring.dk' && password === 'admin123') {
        const adminUser = {
          id: 'admin_user',
          name: 'Admin',
          email: 'admin@privaterengoring.dk',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
          userType: 'admin',
          verified: true,
          isSubscribed: true,
          location: 'Danmark',
          bio: 'Platform Administrator',
          phone: '+45 12 34 56 78',
          website: 'https://privaterengoring.dk',
          rating: 5.0,
          completedJobs: 0,
          joinedDate: '2024-01-01'
        };

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: 'Admin login succesfuldt',
            user: adminUser,
            token: 'admin_token'
          })
        };
      }

      // Check registered users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = existingUsers.find((u: any) => u.email === email);

      if (!user) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Bruger ikke fundet. Opret venligst en konto først.' })
        };
      }

      // For demo, we don't validate password - just return user
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Login succesfuldt',
          user: user,
          token: `token_${user.id}`
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