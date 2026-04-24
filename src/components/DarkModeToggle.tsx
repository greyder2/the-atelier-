'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Sync with whatever the inline script already applied
    const current = document.documentElement.getAttribute('data-theme');
    setDark(current === 'dark');
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('atelier-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('atelier-theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      className="dark-toggle"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}