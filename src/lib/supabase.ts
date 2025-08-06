import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
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
        Insert: {
          id?: string;
          name: string;
          email: string;
          avatar_url?: string;
          cover_photo_url?: string;
          user_type?: 'private' | 'cleaner' | 'small_business' | 'large_business' | 'admin';
          location?: string;
          bio?: string;
          phone?: string;
          website?: string;
          rating?: number;
          completed_jobs?: number;
          verified?: boolean;
          is_subscribed?: boolean;
        };
        Update: {
          name?: string;
          avatar_url?: string;
          cover_photo_url?: string;
          location?: string;
          bio?: string;
          phone?: string;
          website?: string;
          rating?: number;
          completed_jobs?: number;
          verified?: boolean;
          is_subscribed?: boolean;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          location?: string;
          job_type?: string;
          job_category?: string;
          urgency?: string;
          budget?: string;
          is_job_post: boolean;
          is_boosted: boolean;
          boost_expires_at?: string;
          images?: string[];
          likes_count: number;
          comments_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          location?: string;
          job_type?: string;
          job_category?: string;
          urgency?: string;
          budget?: string;
          is_job_post?: boolean;
          is_boosted?: boolean;
          boost_expires_at?: string;
          images?: string[];
          likes_count?: number;
          comments_count?: number;
        };
        Update: {
          content?: string;
          location?: string;
          is_boosted?: boolean;
          boost_expires_at?: string;
          likes_count?: number;
          comments_count?: number;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          read?: boolean;
        };
        Update: {
          read?: boolean;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          read: boolean;
          data?: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          read?: boolean;
          data?: any;
        };
        Update: {
          read?: boolean;
        };
      };
      friend_requests: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          message?: string;
          status: 'pending' | 'accepted' | 'rejected';
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          message?: string;
          status?: 'pending' | 'accepted' | 'rejected';
        };
        Update: {
          status?: 'pending' | 'accepted' | 'rejected';
        };
      };
      job_applications: {
        Row: {
          id: string;
          post_id: string;
          applicant_id: string;
          message: string;
          contact_method: string;
          status: 'pending' | 'accepted' | 'rejected';
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          applicant_id: string;
          message: string;
          contact_method: string;
          status?: 'pending' | 'accepted' | 'rejected';
        };
        Update: {
          status?: 'pending' | 'accepted' | 'rejected';
        };
      };
    };
  };
}