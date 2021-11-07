import clsx from 'clsx';
import React from 'react';

interface HeadingProps extends React.ComponentProps<'h3'> {}

const Heading: React.FC<HeadingProps> = ({ className, ...props }) => {
  return <h3 className={clsx('dark:text-gray-200', className)} {...props} />;
};

export default Heading;
