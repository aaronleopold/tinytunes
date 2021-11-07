/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { CaretDown, Check } from 'phosphor-react';
import { FOCUS_STYLE, INPUT_VARIANTS } from './constants';

export interface SelectOption {
  key?: string | number;
  label: string;
  value: any;
  icon?: React.FC<React.ComponentProps<'svg'>>;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  selected: any;
  onSelect(value: any): void;
  fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  selected,
  onSelect,
  fullWidth
}) => {
  const selectedOption = options.find(opt => opt.value === selected);

  function handleSelect(value: any) {
    if (value === selected) {
      onSelect(undefined);
    } else {
      onSelect(value);
    }
  }

  return (
    <Listbox value={selected} onChange={handleSelect}>
      <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </Listbox.Label>
      <div className="mt-1 relative">
        <Listbox.Button
          className={clsx(
            INPUT_VARIANTS['default'],
            fullWidth && 'w-full min-w-0',
            'relative rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none text-sm border',
            FOCUS_STYLE
          )}
        >
          <span className="flex items-center">
            {selectedOption?.icon && (
              <selectedOption.icon className="flex-shrink-0 h-6 w-6 rounded-full mr-3" />
            )}
            <span className="block truncate">
              {selectedOption?.label ?? 'Select an option'}
            </span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <CaretDown className="h-4 w-4 text-gray-400" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-trout-700 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.map((opt, i) => {
              const isSelected = selectedOption?.value === opt.value;
              return (
                <Listbox.Option
                  key={opt.key ?? i}
                  className={({ active }) =>
                    clsx(
                      active &&
                        'text-white dark:text-gray-50 bg-blue-500 dark:bg-blue-600',
                      !active && 'text-gray-900 dark:text-gray-100 ',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={opt.value}
                >
                  <div className="flex items-center">
                    {opt.icon && (
                      <opt.icon className="flex-shrink-0 h-6 w-6 rounded-full mr-3" />
                    )}

                    <span
                      className={clsx(
                        isSelected ? 'font-semibold' : 'font-normal',
                        'block truncate'
                      )}
                    >
                      {opt.label}
                    </span>
                  </div>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
