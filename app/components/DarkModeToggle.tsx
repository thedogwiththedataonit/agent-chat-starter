"use client";

import { useEffect, useState } from 'react';

// Simple dark mode toggle using a root .dark class with localStorage persistence
export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  // Initialize from OS preference or saved setting
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored === 'dark' : prefersDark;
    setDark(!!initial);
    // Apply on mount
    if (typeof document !== 'undefined') {
      if (initial) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    setMounted(true);
  }, []);

  // Persist changes and toggle root class
  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    }
    if (typeof document !== 'undefined') {
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggle}
      title="Toggle dark mode"
      style={{
        padding: '6px 10px',
        borderRadius: '6px',
        border: '1px solid var(--border)',
        background: 'var(--card)',
        color: 'var(--foreground)',
        cursor: 'pointer',
      }}
    >
      {dark ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

