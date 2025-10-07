import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/lib/utils';

type User = { id: string; email: string } | null;

interface AuthContextValue {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('token');
    if (saved) {
      setToken(saved);
      // lightweight decode not necessary; treat as logged-in session
      const savedEmail = localStorage.getItem('email');
      const savedUserId = localStorage.getItem('userId');
      if (savedEmail && savedUserId) setUser({ id: savedUserId, email: savedEmail });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiRequest<{ token: string; user: { id: string; email: string } }>(
      '/api/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    );
    localStorage.setItem('token', res.token);
    localStorage.setItem('email', res.user.email);
    localStorage.setItem('userId', res.user.id);
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (email: string, password: string) => {
    const res = await apiRequest<{ token: string; user: { id: string; email: string } }>(
      '/api/auth/register',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    );
    localStorage.setItem('token', res.token);
    localStorage.setItem('email', res.user.email);
    localStorage.setItem('userId', res.user.id);
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};


