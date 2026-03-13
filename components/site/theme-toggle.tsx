'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const label = isDark ? 'Night mode' : 'Paper mode';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="surface theme-toggle-btn inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-muted hover:text-accent active:scale-95"
      aria-label="Toggle color scheme"
      aria-pressed={isDark}
      title={label}
    >
      <span
        className={`theme-toggle-orb inline-flex h-5 w-5 items-center justify-center rounded-full border transition duration-500 ${
          isDark
            ? 'rotate-180 border-accentAlt/40 bg-accentAlt/[0.15] text-accentAlt'
            : 'rotate-0 border-accent/[0.45] bg-accent/[0.15] text-accent'
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className={`absolute h-3.5 w-3.5 transition duration-500 ${
            isDark ? 'scale-90 opacity-0 -rotate-45' : 'scale-100 opacity-100 rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.9 5.9l1.5 1.5M16.6 16.6l1.5 1.5M18.1 5.9l-1.5 1.5M7.4 16.6l-1.5 1.5" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={`absolute h-3.5 w-3.5 transition duration-500 ${
            isDark ? 'scale-100 opacity-100 rotate-0' : 'scale-90 opacity-0 rotate-45'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M15.5 4.8c-2.9.5-5.1 3-5.1 6.1 0 3.6 2.9 6.5 6.5 6.5 1.1 0 2.2-.3 3.1-.8-1.1 1.9-3.2 3.2-5.5 3.2-3.6 0-6.5-2.9-6.5-6.5 0-3 2-5.5 4.8-6.3.8-.2 1.8-.2 2.7-.2Z" />
        </svg>
      </span>
      <span>{label}</span>
    </button>
  );
};
