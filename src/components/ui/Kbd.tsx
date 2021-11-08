import clsx from 'clsx';
import React, { forwardRef } from 'react';

interface KbdProps extends React.ComponentProps<'kbd'> {}

const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, ...props }, ref) => {
    return (
      <kbd
        className={clsx(
          'min-w-[1.25rem] inline-flex justify-center items-center capitalize text-xs p-1 rounded h-5 whitespace-nowrap font-sans bg-white dark:bg-trout-700 dark:text-gray-100 shadow',
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);

export default Kbd;
