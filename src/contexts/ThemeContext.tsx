import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeSettings } from '../types';

interface ThemeContextType {
  theme: ThemeSettings;
  toggleDarkMode: () => void;
  setFontSize: (size: ThemeSettings['fontSize']) => void;
  setFontFamily: (family: ThemeSettings['fontFamily']) => void;
}

const defaultThemeSettings: ThemeSettings = {
  darkMode: false,
  fontSize: 'medium',
  fontFamily: 'sans',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const savedTheme = localStorage.getItem('theme-settings');
    return savedTheme ? JSON.parse(savedTheme) : defaultThemeSettings;
  });

  useEffect(() => {
    // Check system preference on initial load if no setting is saved
    if (localStorage.getItem('theme-settings') === null) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme((prev) => ({ ...prev, darkMode: prefersDark }));
    }
  }, []);

  useEffect(() => {
    // Apply dark mode
    if (theme.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply font size
    document.documentElement.style.fontSize = 
      theme.fontSize === 'small' 
        ? '14px' 
        : theme.fontSize === 'large' 
          ? '18px' 
          : '16px';

    // Apply font family
    document.documentElement.style.fontFamily = 
      theme.fontFamily === 'serif' 
        ? 'Georgia, Cambria, "Times New Roman", Times, serif'
        : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

    // Save to localStorage
    localStorage.setItem('theme-settings', JSON.stringify(theme));
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setFontSize = (size: ThemeSettings['fontSize']) => {
    setTheme((prev) => ({ ...prev, fontSize: size }));
  };

  const setFontFamily = (family: ThemeSettings['fontFamily']) => {
    setTheme((prev) => ({ ...prev, fontFamily: family }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode, setFontSize, setFontFamily }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};