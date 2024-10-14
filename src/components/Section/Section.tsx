import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { useIntersectionObserver } from '@/hooks';

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export const Section = ({ children, className }: SectionProps) => {
  const [domRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section
      ref={domRef}
      className={clsx(
        'opacity-0 translate-y-[10vh] transition-[opacity, transform] duration-300 ease-out will-change-[opacity, visibility]',
        isVisible ? 'opacity-100 transform-none visible block' : 'opacity-0',
        className
      )}
    >
      {children}
    </section>
  );
};
