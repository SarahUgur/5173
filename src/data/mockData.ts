import type { User, Post } from '../types';

// Mock users for development
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Maria Hansen',
    email: 'maria@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    verified: true,
    userType: 'private',
    location: 'København',
    rating: 4.8,
    completedJobs: 15
  },
  {
    id: '2',
    name: 'Lars Nielsen',
    email: 'lars@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    verified: true,
    userType: 'cleaner',
    location: 'Aarhus',
    rating: 4.9,
    completedJobs: 45
  }
];

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
    
    return mockUsers;
  } catch (error) {
    console.error('Error loading users:', error);
    return mockUsers;
  }
};

// Multilingual post content
export const getLocalizedPosts = (language: string): Post[] => {
  // Return mock posts for development
  return [
    {
      id: '1',
      userId: '1',
      user: mockUsers[0],
      content: 'Søger pålidelig rengøringshjælp til mit hjem i København.',
      createdAt: '2 timer siden',
      location: 'København NV',
      likes: 12,
      comments: [],
      isJobPost: true,
      jobType: 'home_cleaning',
      urgency: 'flexible',
      budget: '300-400 kr'
    }
  ];
};

export const mockPosts = getLocalizedPosts('da');