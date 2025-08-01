import type { User, Post } from '../types';

// Empty mock users - no fake profiles
export const mockUsers: User[] = [];

// Load users from API only
export const loadUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    return []; // Return empty array instead of mock data
  } catch (error) {
    console.error('Error loading users:', error);
    return []; // Return empty array instead of mock data
  }
};

// Empty posts - no fake content
export const getLocalizedPosts = (language: string): Post[] => {
  return []; // Return empty array instead of mock posts
};

export const mockPosts = getLocalizedPosts('da');