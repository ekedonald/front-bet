import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  className?: string;
};

export const Tooltip = ({ children, className, content }: TooltipProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'computeStyles',
        options: { adaptive: false },
      },
    ],
  });

  if (content) {
    return (
      <div className="group relative">
        <div ref={setReferenceElement}>{children}</div>
        <div
          ref={setPopperElement}
          style={styles.popper}
          className={clsx(
            'bg-blue-100 !rounded shadow-sm leading-none text-xs font-semibold text-blue-600 dark:bg-blue-200 px-1.5 py-1  opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            className
          )}
          {...attributes.popper}
        >
          {content}
        </div>
      </div>
    );
  }
  return <>{children}</>;
};
