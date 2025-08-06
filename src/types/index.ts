export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  verified?: boolean;
  isSubscribed?: boolean;
  userType?: 'private' | 'cleaner' | 'small_business' | 'large_business';
  location?: string;
  rating?: number;
  completedJobs?: number;
  joinedDate?: string;
  bio?: string;
  phone?: string;
  website?: string;
  skills?: string[];
  hourlyRate?: number;
  availability?: string[];
  languages?: string[];
  certifications?: string[];
  insurance?: boolean;
  backgroundCheck?: boolean;
  reviewCount?: number;
  isVerified?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
  location: string;
  likes: number;
  comments: Comment[];
  images?: string[];
  isJobPost?: boolean;
  jobType?: 'one_time' | 'recurring' | 'deep_clean' | 'move_in_out' | 'office' | 'window' | 'carpet' | 'other';
  urgency?: 'immediate' | 'this_week' | 'flexible';
  budget?: string;
  requirements?: string[];
  preferredDate?: string;
  estimatedHours?: number;
  contactInfo?: {
    phone?: string;
    email?: string;
    preferredContact?: 'phone' | 'email' | 'app';
  };
  isBoosted?: boolean;
  boostExpiresAt?: string | null; // null = never expires (free forever)
  boostType?: 'free' | 'standard' | 'premium';
}