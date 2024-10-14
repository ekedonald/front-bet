import clsx from 'clsx';
import React, { FC } from 'react';

const variants = {
  text: '',
  rounded: ',',
  circular: '',
  rectangular: '',
};

type SkeletonProps = {
  variant?: keyof typeof variants;
  className?: string;
  maxNumberOfWords?: number;
  numberOfLines?: number;
};

const text = ['w-2/5', 'w-3/5', 'w-4/5', 'w-1/5', 'w-full'];
export const Skeleton: FC<SkeletonProps> = ({ numberOfLines, maxNumberOfWords = 1 }) => {
  return (
    <div role="status" className="animate-pulse">
      {[...Array(numberOfLines).keys()].map((line) => (
        <div key={line} role="status" className="animate-pulse py-1.5">
          <div className="flex items-center w-full gap-x-1 gap-y-2">
            {[...Array(Math.floor(Math.random() * maxNumberOfWords) + 1).keys()].map((x, index) => (
              <div
                key={x + index}
                className={clsx(
                  'h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-2/5',
                  text[Math.floor(Math.random() * text.length)]
                )}
              />
            ))}
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SkeletonCircular: FC<SkeletonProps> = () => {
  return (
    <div role="status" className="animate-pulse inline-block">
      <div className="rounded-full bg-gray-300 w-14 h-14 dark:bg-gray-700" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const SkeletonRounded: FC<SkeletonProps> = () => {
  return (
    <div role="status" className="animate-pulse block">
      <div className="flex items-center w-full justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
