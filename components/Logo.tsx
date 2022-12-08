import { motion, Variants } from 'framer-motion';
import classNames from 'classnames';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof motion.button>;

const variants: Variants = {
  menuClosed: {
    rotate: '0deg',
  },
  menuOpen: {
    rotate: '-45deg',
  },
};

export const Logo: React.FC<Props & { menuOpen?: boolean }> = ({
  className,
  menuOpen,
  ...props
}) => (
  <motion.button
    aria-haspopup="menu"
    aria-expanded={menuOpen}
    role="button"
    variants={variants}
    initial={{
      rotate: menuOpen ? '-45deg' : '0deg',
    }}
    animate={menuOpen ? 'menuOpen' : 'menuClosed'}
    whileTap={{
      scale: 0.8,
    }}
    whileHover={{
      rotate: '-45deg',
    }}
    className={classNames(
      'w-12 h-12 cursor-pointer rounded-full block mx-auto mb-4 bg-gradient-conic from-gradient-3 to-gradient-4',
      className
    )}
    {...props}
  />
);
