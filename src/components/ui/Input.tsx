import clsx from 'clsx';
import React from 'react';
import { FOCUS_STYLE, INPUT_VARIANTS } from './constants';
import Label from './Label';
import { SubText } from './Text';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  variant?: keyof typeof INPUT_VARIANTS;
}

export default function Input({
  variant = 'default',
  label,
  description,
  ...props
}: InputProps) {
  const inputStyles = INPUT_VARIANTS[variant] ?? INPUT_VARIANTS.default;

  return (
    <div>
      {label && <Label>{label}</Label>}
      {description && (
        <SubText className={clsx({ 'mt-1': label })}>{description}</SubText>
      )}
      <div className={clsx({ 'mt-1': label })}>
        <input
          {...props}
          className={clsx(
            'px-3 py-1 rounded-md border leading-7 outline-none focus:outline-none transition-colors duration-200',
            inputStyles,
            FOCUS_STYLE,
            props.className
          )}
        />
      </div>
    </div>
  );
}
