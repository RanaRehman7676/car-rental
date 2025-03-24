import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/api';
import type { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await auth.getProfile();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      await auth.login({ email, password });
      const userData = await auth.getProfile();
      setUser(userData);
      toast.success('Successfully logged in!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      await auth.register({ email, password, name });
      const userData = await auth.getProfile();
      setUser(userData);
      toast.success('Successfully registered!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  }

  function logout() {
    auth.logout();
    setUser(null);
    toast.success('Successfully logged out!');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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