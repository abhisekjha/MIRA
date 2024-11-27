import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as auth from '../services/auth/api';
import { generateCSRFToken } from '../services/auth/security';
import type { User, Session } from '../services/auth/types';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
    // Generate new CSRF token on mount
    localStorage.setItem('csrfToken', generateCSRFToken());
  }, []);

  async function checkAuth() {
    try {
      const session = await auth.refreshSession();
      setUser(session.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const session = await auth.login({ email, password });
      setUser(session.user);
      localStorage.setItem('token', session.accessToken);
      
      const redirect = new URLSearchParams(location.search).get('redirect');
      navigate(redirect || '/');
      
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const session = await auth.register({ email, password, name });
      setUser(session.user);
      localStorage.setItem('token', session.accessToken);
      
      navigate('/');
      toast.success('Welcome to MiRA!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to register');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      setUser(null);
      navigate('/login');
      toast.success('You have been logged out');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  const refreshSession = async () => {
    try {
      const session = await auth.refreshSession();
      setUser(session.user);
      localStorage.setItem('token', session.accessToken);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        logout,
        refreshSession,
      }}
    >
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