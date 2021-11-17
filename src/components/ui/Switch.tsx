import React from 'react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import Label from './Label';
import { Moon, Sun } from 'phosphor-react';

export interface SwitchProps {
  label?: string;
  labelPos?: 'left' | 'right';
  enabled: boolean;
  setEnabled(): void;
}

export default function ({
  enabled,
  setEnabled,
  label,
  labelPos = 'right'
}: SwitchProps) {
  return (
    <div className="flex space-x-2 items-center">
      {label && labelPos === 'left' && <Label>{label}</Label>}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={clsx(
          enabled ? 'bg-blue-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-orange-400'
        )}
      >
        <span
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        >
          <span
            className={clsx(
              enabled
                ? 'opacity-0 ease-out duration-100'
                : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <Sun className="h-3 w-3 text-gray-400" />
          </span>
          <span
            className={clsx(
              enabled
                ? 'opacity-100 ease-in duration-200'
                : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <Moon className="h-3 w-3" />
          </span>
        </span>
      </Switch>
      {label && labelPos === 'right' && <Label>{label}</Label>}
    </div>
  );
}
