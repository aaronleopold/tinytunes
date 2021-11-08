import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { BUTTON_SIZES, BUTTON_VARIANTS, FOCUS_STYLE } from './constants';
import Loader from './Loader';

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZES;
  circle?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

// TODO: I should refactor this, it is a little messy right now
export default forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      circle,
      fullWidth,
      className,
      loading,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyle = BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.default;
    const size = BUTTON_SIZES[props.size || variant === 'tiny' ? 'xs' : 'md'];

    // TODO: disabled styles
    const classNames = clsx(
      { 'p-2 rounded-full': circle },
      { 'rounded-md': !circle && variant !== 'tiny' },
      fullWidth && 'w-full min-w-0 text-center justify-center',
      { 'opacity-75': loading },
      'shadow-sm relative inline-flex items-center border text-sm leading-5 font-medium transition-colors ease-in-out duration-200 focus:outline-none',
      variantStyle,
      size,
      FOCUS_STYLE,
      className
    );

    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={classNames}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center mx-auto">
            <Loader
              size="xs"
              inline
              active={loading}
              containerClassName="mr-2"
            />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
