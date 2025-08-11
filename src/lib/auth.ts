// Local authentication system without API dependencies
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  userType: 'private' | 'cleaner' | 'small_business' | 'large_business' | 'admin';
  location?: string;
  bio?: string;
  phone?: string;
  website?: string;
  verified: boolean;
  isSubscribed: boolean;
  rating: number;
  completedJobs: number;
  joinedDate: string;
  token?: string;
}

// Local user storage
const USERS_KEY = 'private_rengoring_users';
const CURRENT_USER_KEY = 'currentUser';
const AUTH_TOKEN_KEY = 'authToken';

// Initialize with admin user
const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    const adminUser: User = {
      id: 'admin-user-id',
      name: 'Admin',
      email: 'admin@privaterengoring.dk',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      userType: 'admin',
      location: 'Danmark',
      bio: 'Platform administrator',
      phone: '',
      website: '',
      verified: true,
      isSubscribed: true,
      rating: 5.0,
      completedJobs: 0,
      joinedDate: '2024-01-01'
    };
    
    const users = [adminUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return users;
  }
  return JSON.parse(existingUsers);
};

// Get all users
export const getUsers = (): User[] => {
  return initializeUsers();
};

// Find user by email
export const findUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
};

// Create new user
export const createUser = (userData: Omit<User, 'id' | 'verified' | 'isSubscribed' | 'rating' | 'completedJobs' | 'joinedDate'>): User => {
  const users = getUsers();
  
  // Check if user already exists
  if (findUserByEmail(userData.email)) {
    throw new Error('Bruger med denne email eksisterer allerede');
  }
  
  const newUser: User = {
    ...userData,
    id: 'user-' + Date.now(),
    verified: false,
    isSubscribed: false,
    rating: 0,
    completedJobs: 0,
    joinedDate: new Date().toISOString().split('T')[0]
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return newUser;
};

// Update user
export const updateUser = (userId: string, updates: Partial<User>): User | null => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex] = { ...users[userIndex], ...updates };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return users[userIndex];
};

// Login function
export const login = (email: string, password: string): User => {
  console.log('Attempting login for:', email);
  
  // Admin login
  if (email === 'admin@privaterengoring.dk' && password === 'admin123') {
    const users = getUsers();
    let adminUser = users.find(user => user.email === email);
    
    if (!adminUser) {
      // Create admin user if not exists
      adminUser = {
        id: 'admin-user-id',
        name: 'Admin',
        email: 'admin@privaterengoring.dk',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        userType: 'admin',
        location: 'Danmark',
        bio: 'Platform administrator',
        phone: '',
        website: '',
        verified: true,
        isSubscribed: true,
        rating: 5.0,
        completedJobs: 0,
        joinedDate: '2024-01-01'
      };
      
      users.push(adminUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    
    const token = 'admin-token-' + Date.now();
    adminUser.token = token;
    
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
    
    console.log('Admin login successful');
    return adminUser;
  }
  
  // Regular user login (for future registered users)
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Bruger ikke fundet. Opret venligst en konto først.');
  }
  
  // In a real system, you would verify password hash here
  // For demo, we'll accept any password for existing users
  const token = 'user-token-' + Date.now();
  user.token = token;
  
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  
  console.log('User login successful');
  return user;
};

// Register function
export const register = (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  userType: 'private' | 'cleaner' | 'small_business' | 'large_business';
}): User => {
  console.log('Attempting registration for:', userData.email);
  
  const newUser = createUser({
    name: userData.name,
    email: userData.email,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    userType: userData.userType,
    location: userData.location || '',
    bio: userData.bio || '',
    phone: userData.phone || '',
    website: userData.website || ''
  });
  
  const token = 'user-token-' + Date.now();
  newUser.token = token;
  
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  
  console.log('Registration successful');
  return newUser;
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  console.log('Logout successful');
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing current user:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const user = getCurrentUser();
  return !!(token && user);
};