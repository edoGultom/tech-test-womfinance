import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getAuthToken, saveAuthToken } from '../utils/auth';
import { darkTheme, lightTheme } from '../theme/color';

type ThemeType = 'light' | 'dark';
interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  theme: any;
  mode: ThemeType;
  toggleTheme: () => void;
  login: (token: string, email: string) => void;
  logout: () => void;
}

export const AuthThemeContext = createContext<AuthContextType>({
  token: null,
  isLoading: false,
  theme: lightTheme,
  mode: 'light' as ThemeType,
  toggleTheme: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthThemeProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

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
    <AuthThemeContext.Provider
      value={{ token, isLoading, login, logout, theme, mode, toggleTheme }}
    >
      {children}
    </AuthThemeContext.Provider>
  );
};
