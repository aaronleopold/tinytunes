import React from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import Label from './Label';

export interface RadioGroupItem {
  label: string;
  sublabel?: string;
  value: any;
}

export interface RadioGroupProps {
  groupLabel?: string;
  items: RadioGroupItem[];
  selected: any;
  setSelected(newValue: any): void;
}

export default function ({
  items,
  selected,
  setSelected,
  groupLabel
}: RadioGroupProps) {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      {groupLabel && <Label>{groupLabel}</Label>}
      <div
        className={clsx(
          groupLabel && 'mt-1',
          'dark:text-gray-50 rounded-md space-y-2'
        )}
      >
        {items.map(({ label, sublabel, value }, idx) => (
          <RadioGroup.Option
            key={String(label + '-' + idx)}
            value={value}
            className={({ checked }) =>
              clsx(
                checked
                  ? 'border-transparent ring-2 dark:ring-blue-700 ring-blue-500 z-10'
                  : 'border-gray-200 dark:border-trout-700',
                'bg-white dark:bg-trout-800 rounded-md relative border p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={clsx(
                    checked
                      ? 'bg-blue-500 border-transparent'
                      : 'bg-white border-gray-300 dark:bg-trout-800 dark:border-trout-400',
                    active
                      ? 'ring-2 ring-offset-2 dark:ring-offset-blue-300 ring-blue-400 '
                      : '',
                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                  )}
                  aria-hidden="true"
                >
                  <span
                    className={clsx(
                      checked
                        ? 'bg-blue-100 dark:bg-blue-300'
                        : 'bg-white dark:bg-trout-800',
                      'rounded-full w-1.5 h-1.5'
                    )}
                  />
                </span>
                <div className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={clsx(
                      checked
                        ? 'text-blue-800 dark:text-blue-50'
                        : 'text-gray-900 dark:text-gray-50',
                      'block text-sm font-medium'
                    )}
                  >
                    {label}
                  </RadioGroup.Label>

                  {sublabel && (
                    <RadioGroup.Description
                      as="span"
                      className={clsx(
                        checked
                          ? 'text-blue-600 dark:text-blue-200'
                          : 'text-gray-500 dark:text-gray-400',
                        'block text-sm'
                      )}
                    >
                      {sublabel}
                    </RadioGroup.Description>
                  )}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
