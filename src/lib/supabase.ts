// Local storage utilities to replace Supabase
export const localDB = {
  users: new Map(),
  posts: new Map(),
  messages: new Map(),
  notifications: new Map(),
  
  // Initialize with admin user
  init() {
    if (!this.users.has('admin-user-id')) {
      this.users.set('admin-user-id', {
        id: 'admin-user-id',
        name: 'Admin',
        email: 'admin@privaterengoring.dk',
        user_type: 'admin',
        location: 'Danmark',
        bio: 'Platform administrator',
        verified: true,
        is_subscribed: true,
        avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        rating: 5.0,
        completed_jobs: 0,
        created_at: new Date().toISOString()
      });
    }
  }
};

// Initialize on import
localDB.init();

// Database types (kept for compatibility)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar_url?: string;
          cover_photo_url?: string;
          user_type: 'private' | 'cleaner' | 'small_business' | 'large_business' | 'admin';
          location?: string;
          bio?: string;
          phone?: string;
          website?: string;
          rating?: number;
          completed_jobs: number;
          verified: boolean;
          is_subscribed: boolean;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}