import clsx from 'clsx';
import React, { forwardRef } from 'react';

export interface LabelProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  truncate?: string;
  children: React.ReactNode | React.ReactText;
}

export default forwardRef<HTMLSpanElement, LabelProps>(
  ({ size = 'sm', truncate, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          truncate && `truncate ${truncate}`,
          `block text-${size} font-medium text-gray-700 dark:text-gray-200`
        )}
        {...props}
      />
    );
  }
);
