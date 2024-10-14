import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';

// import { ReactComponent as ClockIcon } from '@/assets/icons/clock.svg';
// import { ReactComponent as CheckIcon } from '@/assets/icons/rounded-check.svg';
// import { ReactComponent as MinusIcon } from '@/assets/icons/rounded-minus.svg';
// import { ReactComponent as QuestionIcon } from '@/assets/icons/rounded-question.svg';
// import { ReactComponent as SyncIcon } from '@/assets/icons/sync.svg';

const colorScheme: Record<colorType, Record<variants, string>> = {
  success: {
    filled: 'border-status-success/20 bg-status-success/20 text-status-success',
    outlined: 'border border-status-success text-status-success',
    text: 'text-status-success p-0',
  },

  error: {
    filled: 'border-status-error/20 bg-status-error/20 text-status-error',
    outlined: 'border border-status-error text-status-error',
    text: 'text-status-error p-0',
  },

  warning: {
    filled: 'border-warning-500/20 bg-warning-500/20 text-warning-500',
    outlined: 'border border-warning-500 text-warning-500',
    text: 'text-warning-500 p-0',
  },

  info: {
    filled: 'border-blue-400/20 bg-blue-400/20 text-blue-400',
    outlined: 'border border-blue-400 text-blue-400',
    text: 'text-blue-400 p-0',
  },

  default: {
    filled: 'border-gray-700/20 bg-gray-700/20 text-gray-700',
    outlined: 'border border-gray-700 text-gray-700',
    text: 'text-gray-700 p-0',
  },
};

type colorType = 'error' | 'success' | 'warning' | 'info' | 'default';
type variants = 'filled' | 'outlined' | 'text';

const sizes = {
  xs: 'py-0.5 px-1 text-xs rounded-md',
  sm: 'py-1 px-2 text-sm rounded-lg',
  md: 'py-2 px-4 text-base rounded-lg',
  lg: 'py-2 px-6 text-lg rounded-lg',
};

type IconProps =
  | { startIcon: React.ReactNode; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

const icons = {
  // error: <MinusIcon className="w-4 h-4" />,
  // success: <CheckIcon className="w-4 h-4" />,
  // warning: <QuestionIcon className="w-4 h-4" />,
  // info: <QuestionIcon className="w-4 h-4" />,
  error: "",
  success: "",
  warning: "",
  info: "",
  default: null,
};

export type TagProps = {
  variant?: variants;
  size?: keyof typeof sizes;
  color?: colorType;
  className?: string;
  hideStartIcon?: boolean;
  hideEndIcon?: boolean;
  label: ReactNode;
} & IconProps;

export const Tag: FC<TagProps> = (props) => {
  const {
    label,
    color = 'success',
    variant = 'filled',
    size = 'sm',
    startIcon,
    hideStartIcon = false,
    endIcon,
    hideEndIcon = false,
    className,
    ...restProps
  } = props;
  return (
    <div
      className={clsx(
        className,
        'capitalize cursor-default inline-flex justify-center items-center transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-semibold focus:outline-none',
        colorScheme[color][variant],
        sizes[size]
      )}
      {...restProps}
    >
      {!hideStartIcon && <span className="mr-1">{startIcon ?? icons[color]}</span>}
      <span className="">{label}</span>
      {!hideEndIcon && endIcon && <span className="ml-1">{endIcon}</span>}
    </div>
  );
};
