import React, { createContext, useContext, useState } from 'react';
import { darkTheme, lightTheme } from './color';

type ThemeType = 'light' | 'dark';

const ThemeContext = createContext({
  theme: lightTheme,
  mode: 'light' as ThemeType,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
