"use client";

import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  // attribute="class" tells next-themes to toggle the class on the <html> tag
  return <ThemeProvider attribute="class" defaultTheme='system' enableSystem>{children}</ThemeProvider>;
}