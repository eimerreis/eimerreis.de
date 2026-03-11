import Image from 'next/image';
import classNames from 'classnames';

import clayAvatar from '@/app/eimer-clay.png';

export const ClayAvatar = ({ className }: { className?: string }) => {
  return (
    <Image
      src={clayAvatar}
      alt="Clay portrait of Moritz"
      priority
      className={classNames('pointer-events-none select-none object-contain', className)}
      sizes="(min-width: 768px) 34rem, 78vw"
    />
  );
};
