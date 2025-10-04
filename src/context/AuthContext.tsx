import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getAuthToken, saveAuthToken } from '../utils/auth';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await getAuthToken();
      setToken(savedToken);
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (valToken: string, valEmail: string) => {
    setIsLoading(true);
    await saveAuthToken(valToken, valEmail);
    setToken(valToken);
    setIsLoading(false);
  };

  const logout = async () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token,isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
