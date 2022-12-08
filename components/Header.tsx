import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

export default function Header({ name }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="pt-20 pb-12">
      <Logo onClick={() => setOpen(true)} />
      <p className="text-2xl dark:text-white text-center">
        <Link href="/">
          <a>eimerreis.de</a>
        </Link>
      </p>
      <Navigation onClose={() => setOpen(false)} open={open} />
    </header>
  );
}
