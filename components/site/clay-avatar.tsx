import classNames from 'classnames';
import Image from 'next/image';
import type { ReactNode } from 'react';

import clayAvatar from '@/app/eimer-clay.png';

type ClayAvatarProps = {
  className?: string;
  children?: ReactNode;
};

export const ClayAvatar = ({ className, children }: ClayAvatarProps) => {
  return (
    <div className={classNames('avatar-shell relative', className)}>
      <Image
        src={clayAvatar}
        alt="Clay portrait of Moritz"
        priority
        className="pointer-events-none select-none object-contain"
        sizes="(min-width: 768px) 34rem, 78vw"
      />
      {children}
    </div>
  );
};
