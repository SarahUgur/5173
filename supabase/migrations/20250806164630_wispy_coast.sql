/*
  # Create admin user

  1. Admin User Setup
    - Creates admin user with email admin@privaterengoring.dk
    - Sets user_type to 'admin'
    - Ensures admin has all necessary permissions

  2. Security
    - Admin user has special privileges
    - Can access admin panel and moderate content
*/

-- Insert admin user if not exists
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  aud,
  confirmation_token,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@privaterengoring.dk',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  'authenticated',
  'authenticated',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Get the admin user ID
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'admin@privaterengoring.dk';

  -- Insert admin profile if not exists
  INSERT INTO public.users (
    id,
    name,
    email,
    user_type,
    verified,
    is_subscribed,
    avatar_url,
    bio,
    location,
    created_at,
    updated_at
  ) VALUES (
    admin_user_id,
    'Admin',
    'admin@privaterengoring.dk',
    'admin',
    true,
    true,
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    'Platform administrator for Private Rengøring',
    'Danmark',
    now(),
    now()
  ) ON CONFLICT (id) DO UPDATE SET
    user_type = 'admin',
    verified = true,
    is_subscribed = true,
    updated_at = now();
END $$;