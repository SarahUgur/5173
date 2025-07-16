export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  userType: 'private' | 'small_business' | 'large_business' | 'cleaner';
  isSubscribed: boolean;
  location: string;
  rating?: number;
  verified: boolean;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  images?: string[];
  jobType: 'home_cleaning' | 'office_cleaning' | 'deep_cleaning' | 'regular_cleaning' | 'one_time';
  location: string;
  budget?: string;
  urgency: 'immediate' | 'this_week' | 'flexible';
  likes: number;
  comments: Comment[];
  createdAt: string;
  isJobPost: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}