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

  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-[10px] font-bold uppercase tracking-widest text-muted">Theme</span>
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="group relative flex h-8 w-16 items-center rounded-full border border-line bg-paperSoft px-1 transition-colors hover:border-accent"
        aria-label="Toggle color scheme"
        aria-pressed={isDark}
      >
        <span
          className={`absolute flex h-6 w-6 items-center justify-center rounded-full bg-ink text-paper transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.3,1)] ${
            isDark ? 'translate-x-8' : 'translate-x-0'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`absolute h-3 w-3 transition duration-500 ${
              isDark ? 'scale-90 opacity-0 -rotate-45' : 'scale-100 opacity-100 rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="12" cy="12" r="3.2" />
            <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.9 5.9l1.5 1.5M16.6 16.6l1.5 1.5M18.1 5.9l-1.5 1.5M7.4 16.6l-1.5 1.5" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className={`absolute h-3 w-3 transition duration-500 ${
              isDark ? 'scale-100 opacity-100 rotate-0' : 'scale-90 opacity-0 rotate-45'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M15.5 4.8c-2.9.5-5.1 3-5.1 6.1 0 3.6 2.9 6.5 6.5 6.5 1.1 0 2.2-.3 3.1-.8-1.1 1.9-3.2 3.2-5.5 3.2-3.6 0-6.5-2.9-6.5-6.5 0-3 2-5.5 4.8-6.3.8-.2 1.8-.2 2.7-.2Z" />
          </svg>
        </span>
      </button>
    </div>
  );
};
