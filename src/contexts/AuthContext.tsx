'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  stytchUserId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'STUDENT' | 'ADMIN' | 'INSTRUCTOR';
  subscriptionStatus: 'FREE' | 'PREMIUM' | 'LIFETIME';
  profileImageUrl?: string;
  timezone?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // For now, simulate a logged-in user for testing
      const mockUser = {
        id: 'mock-user-id',
        stytchUserId: 'mock-stytch-user-id',
        email: 'test@example.com',
        firstName: 'Тест',
        lastName: 'Пользователь',
        role: 'STUDENT' as const,
        subscriptionStatus: 'FREE' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(mockUser);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 'mock-user-id',
        stytchUserId: 'mock-stytch-user-id',
        email,
        firstName: 'Тест',
        lastName: 'Пользователь',
        role: 'STUDENT' as const,
        subscriptionStatus: 'FREE' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setIsLoading(true);
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 'mock-user-id',
        stytchUserId: 'mock-stytch-user-id',
        email,
        firstName,
        lastName,
        role: 'STUDENT' as const,
        subscriptionStatus: 'FREE' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const sendMagicLink = async (email: string) => {
    try {
      // Simulate magic link sending
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Ссылка для входа отправлена на ваш email!');
    } catch (error) {
      console.error('Magic link failed:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Ссылка для сброса пароля отправлена на ваш email!');
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    sendMagicLink,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
