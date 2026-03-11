'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="surface inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-muted hover:text-accent active:scale-95"
      aria-label="Toggle color scheme"
    >
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full border transition duration-500 ${
          isDark
            ? 'rotate-180 border-accentAlt/40 bg-accentAlt/[0.15] text-accentAlt'
            : 'rotate-0 border-accent/[0.45] bg-accent/[0.15] text-accent'
        }`}
        aria-hidden="true"
      >
        <span
          className={`block h-2.5 w-2.5 rounded-full border ${
            isDark ? 'border-current bg-transparent' : 'border-current bg-current'
          }`}
        />
      </span>
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
};
