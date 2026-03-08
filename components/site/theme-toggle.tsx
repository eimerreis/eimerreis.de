'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="surface inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] tracking-[0.16em] uppercase text-muted hover:-translate-y-0.5 hover:text-accent"
      aria-label="Toggle color scheme"
    >
      <span>{isDark ? 'Dark' : 'Light'}</span>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
    </button>
  );
};
