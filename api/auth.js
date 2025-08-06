import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

      if (isLogin) {
        // Login existing user
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (error || !user) {
          return res.status(401).json({ 
            error: 'Ugyldig email eller adgangskode' 
          });
        }

        // In production, verify password hash here
        // const isValidPassword = await bcrypt.compare(password, user.password_hash);
        // For now, accept any password for registered users

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || 'demo-secret',
          { expiresIn: '7d' }
        );

        return res.status(200).json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.user_type,
            verified: user.verified,
            isSubscribed: user.is_subscribed,
            location: user.location,
            avatar: user.avatar_url,
            rating: user.rating,
            completedJobs: user.completed_jobs,
            bio: user.bio,
            phone: user.phone,
            website: user.website,
            joinedDate: user.created_at.split('T')[0]
          },
          token
        });
      } else {
        // Register new user
        if (!name || !acceptedTerms) {
          return res.status(400).json({ 
            error: 'Navn og accept af vilkår er påkrævet' 
          });
        }

        // Check if user already exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('email', email)
          .single();

        if (existingUser) {
          return res.status(400).json({ 
            error: 'En bruger med denne email eksisterer allerede' 
          });
        }

        // Create new user
        const { data: newUser, error } = await supabase
          .from('users')
          .insert({
            name,
            email,
            user_type: userType || 'private',
            verified: false,
            is_subscribed: false,
            completed_jobs: 0
          })
          .select()
          .single();

        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ 
            error: 'Kunne ikke oprette bruger' 
          });
        }

        const token = jwt.sign(
          { userId: newUser.id, email: newUser.email },
          process.env.JWT_SECRET || 'demo-secret',
          { expiresIn: '7d' }
        );

        return res.status(201).json({
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            userType: newUser.user_type,
            verified: newUser.verified,
            isSubscribed: newUser.is_subscribed,
            location: newUser.location,
            avatar: newUser.avatar_url,
            rating: newUser.rating,
            completedJobs: newUser.completed_jobs,
            bio: newUser.bio,
            phone: newUser.phone,
            website: newUser.website,
            joinedDate: newUser.created_at.split('T')[0]
          },
          token
        });
      }
      const { email, password, name, userType, acceptedTerms, isLogin } = req.body;
    server: {
      host: '0.0.0.0',
      port: 5175,
      ...(!isNetlifyDev && {
        proxy: {
          '/api': {
            target: 'http://localhost:8888',
            changeOrigin: true,
            secure: false
          }
        }
      })
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});