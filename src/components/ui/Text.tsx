import clsx from 'clsx';
import React from 'react';

export interface TextProps extends React.ComponentProps<'p'> {
  centered?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  italic?: boolean;
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
}

export default function Text({
  centered,
  size = 'sm',
  weight = 'normal',
  italic,
  className,
  ...props
}: TextProps) {
  return (
    <p
      className={clsx(
        'dark:text-gray-200',
        centered && 'text-center',
        { italic },
        `text-${size} font-${weight}`,
        className
      )}
      {...props}
    />
  );
}

// TODO: this is not good lol
export function SubText({ children, ...props }: TextProps) {
  return (
    <Text size="xs" className="text-gray-600 dark:text-gray-400" {...props}>
      {children}
    </Text>
  );
}
