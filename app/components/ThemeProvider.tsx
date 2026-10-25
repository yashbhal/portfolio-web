"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from 'react';

type Theme = 'portfolioLight' | 'portfolioDark';

const defaultTheme: Theme = 'portfolioLight';
const themeChangeEvent = 'theme-change';

const getTheme = (): Theme => {
  // Check for saved theme preference, default to light mode
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'portfolioLight' || savedTheme === 'portfolioDark') {
    return savedTheme;
  }

  // Default to light mode regardless of system preference
  return defaultTheme;
};

const subscribeToTheme = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener(themeChangeEvent, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(themeChangeEvent, callback);
  };
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => defaultTheme);

  useEffect(() => {
    // Apply theme to document and save to localStorage
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'portfolioLight' ? 'portfolioDark' : 'portfolioLight';
    localStorage.setItem('theme', nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
