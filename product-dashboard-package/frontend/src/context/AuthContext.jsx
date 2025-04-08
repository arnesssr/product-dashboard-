/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {string|null} avatar
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {boolean} isAuthenticated
 * @property {(email: string, password: string) => boolean} login
 * @property {() => void} logout
 * @property {(userData: Partial<User>) => void} updateProfile
 */

import { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    avatar: null
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Login function (mock implementation)
  const login = (email, password) => {
    // In a real app, this would make an API call
    console.log('Login attempt with:', email, password);
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      role: 'Admin',
      avatar: null
    });
    return true;
  };
  
  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  
  // Update user profile
  const updateProfile = (userData) => {
    setUser({
      ...user,
      ...userData
    });
  };
  
  // Context value
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    updateProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
