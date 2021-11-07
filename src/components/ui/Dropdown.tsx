/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Button from './Button';
import { BUTTON_VARIANTS } from './constants';
import { CaretDown } from 'phosphor-react';

interface DropdownItemProps {
  label: string;
  icon?: React.FC<React.ComponentProps<'svg'>>;
  onClick(): void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  onClick,
  ...props
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={clsx(
            'w-full group flex items-center px-4 py-2 text-sm',
            {
              'bg-gray-100 dark:bg-trout-600 text-gray-900 dark:text-gray-50':
                active
            },
            { 'text-gray-700 dark:text-gray-50': !active }
          )}
        >
          {props.icon && (
            <props.icon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-300 dark:group-hover:text-gray-50 group-hover:text-gray-500" />
          )}
          {label}
        </button>
      )}
    </Menu.Item>
  );
};

export interface IDropdownItem {
  label: string;
  icon?: any;
}

export type DropdownItemGroup = IDropdownItem[];

export interface DropdownProps {
  items: DropdownItemGroup[];
  onItemClick(group: number, item: number): void;
  origin?: 'left' | 'right';
  variant?: keyof typeof BUTTON_VARIANTS;
}

export default function Dropdown({
  items,
  onItemClick,
  origin = 'right',
  variant
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as={Button} variant={variant}>
          {origin === 'left' && (
            <CaretDown className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          )}
          Options
          {origin === 'right' && (
            <CaretDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            origin === 'right'
              ? 'origin-top-right right-0'
              : 'origin-top-left left-0',
            'absolute mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-trout-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-50 dark:divide-trout-500 focus:outline-none z-50'
          )}
        >
          {items.map((group, i) => (
            <div className="py-1" key={i}>
              {group.map((item, j) => (
                <DropdownItem {...item} onClick={() => onItemClick(i, j)} />
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
