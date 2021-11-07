import React from 'react';

export default function AnimatedIconButton({
  children,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className="relative flex items-center justify-center p-2 my-2 mx-auto bg-gray-100 dark:bg-theme-500 dark:text-gray-200 text-gray-800 hover:bg-primary-200 hover:text-white dark:hover:text-primary-25  hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow"
    >
      {children}
    </button>
  );
}
