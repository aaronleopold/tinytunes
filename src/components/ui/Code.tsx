import clsx from 'clsx';
import React from 'react';
import { CODE_SIZES } from './constants';

interface CodeProps extends React.ComponentProps<'code'> {
  size?: keyof typeof CODE_SIZES;
}

const Code = ({ size = 'md', children, ...props }: CodeProps) => {
  const sizeStyles = CODE_SIZES[size] ?? CODE_SIZES.md;

  return (
    <code
      className={clsx(
        sizeStyles,
        'bg-gray-300 dark:bg-theme-500 rounded-md dark:text-dark:200'
      )}
      {...props}
    >
      {children}
    </code>
  );
};

export default Code;
