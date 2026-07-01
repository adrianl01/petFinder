'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, setToken, removeToken } from '@/src/lib/storage/token';
import LoadingOverlay from '../LoadingOverlay';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthToken(getToken());
    setLoading(false);
  }, []);

  const login = (token: string) => {
    setToken(token);
    setAuthToken(token);
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
