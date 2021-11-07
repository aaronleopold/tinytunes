import React from 'react';
import clsx from 'clsx';

export const LOADER_SIZES = {
  tiny: 'h-3 w-3',
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-24 w-24',
  massive: 'h-48 w-48'
};

interface LoaderProps {
  active?: boolean;
  size?: keyof typeof LOADER_SIZES;
  inline?: boolean;
}

// TODO: color prop

export default function Loader({ inline, active, size = 'md' }: LoaderProps) {
  const SIZE = LOADER_SIZES[size] ?? LOADER_SIZES.md;

  if (!active) return null;

  return (
    <div
      className={clsx(
        inline ? 'mx-auto' : 'absolute bottom-0 inset-0',
        'flex items-center justify-center pointer-events-none'
      )}
    >
      <svg
        className={clsx('animate-spin text-gray-500', SIZE)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}
