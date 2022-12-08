import classNames from 'classnames';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { ComponentProps, PropsWithChildren } from 'react';
import { Logo } from './Logo';

type NavItemProps = ComponentProps<typeof Link>;
const NavItem: React.FC<NavItemProps> = ({ children, ...props }) => (
  <Link {...props}>
    <motion.a
      initial={{ opacity: 0, translateX: '-20%' }}
      animate={{ opacity: 1, translateX: 0 }}
      className="text-4xl py-4 text-white opacity-90 cursor-pointer hover:opacity-100 font-medium tracking-wide"
    >
      {children}
    </motion.a>
  </Link>
);

type Props = { open: boolean; onClose: () => void };
export const Navigation: React.FC<Props> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          className="fixed w-full min-h-screen top-0 left-0 z-10 bg-opacity-90 bg-black flex flex-col justify-center items-center"
        >
          <Logo
            whileHover={{
              rotate: '0deg',
            }}
            onClick={onClose}
            menuOpen={true}
            className={classNames('absolute top-24')}
          />
          <p className="absolute top-40 text-2xl text-white text-center">
            <Link href="/">
              <a>eimerreis.de</a>
            </Link>
          </p>
          <motion.nav
            animate={{
              transition: {
                staggerChildren: 1,
              },
            }}
            className="flex flex-col justify-center items-center"
          >
            <NavItem href="/">Posts</NavItem>
            <NavItem href="/eimer-tunes">EimerTunes</NavItem>
            {/* <NavItem href="/link-in-bio">Link in Bio</NavItem> */}
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
