import clsx from 'clsx';
import React from 'react';
import { HEADER_VARIANTS } from './constants';

interface HeadingProps extends React.ComponentProps<'h3'> {
  variant?: keyof typeof HEADER_VARIANTS;
}

const Heading: React.FC<HeadingProps> = ({
  variant = 'default',
  className,
  ...props
}) => {
  const styles = HEADER_VARIANTS[variant] ?? HEADER_VARIANTS.default;

  return (
    <h3 className={clsx('dark:text-gray-200', styles, className)} {...props} />
  );
};

export default Heading;
