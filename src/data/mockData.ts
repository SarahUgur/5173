import type { User, Post } from '../types';

// Empty arrays for production - real data will come from API
export const mockUsers: User[] = [];

// Load users from API
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
    
    return [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

// Multilingual post content - empty for production
export const getLocalizedPosts = (language: string): Post[] => {
  // Return empty array - real posts will be loaded from API
  return [];
};

export const mockPosts = getLocalizedPosts('da');