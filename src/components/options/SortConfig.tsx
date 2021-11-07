import React, { Fragment, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import {
  Clock,
  MonitorPlay,
  Playlist,
  SortAscending,
  TextAa
} from 'phosphor-react';
import Button from '../ui/Button';
import useKeyboardHandler from '../../hooks/useKeyboardHandler';

interface DropdownItemProps {
  label: string;
  icon?: React.FC<React.ComponentProps<'svg'>>;
  onClick(): void;
}
export interface IDropdownItem {
  label: string;
  value?: any;
  icon?: any;
}

export type DropdownItemGroup = IDropdownItem[];

const items: DropdownItemGroup[] = [
  [
    { label: 'Playlist', value: 'playlist', icon: Playlist },
    { label: 'Video', value: 'video', icon: MonitorPlay }
  ],
  [
    { label: 'Name', value: 'name', icon: TextAa },
    // default order in DB so no sorting required
    { label: 'Date added', value: 'none', icon: Clock }
  ]
];

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
            'w-full group flex items-center px-2 py-1 text-sm',
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

// TODO: this config should be persisted so the user doesn't have to re-select
// each application launch
const SortConfig: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onItemClick = (item: IDropdownItem) => {
    console.log(item);
  };

  const openMenu = () => {
    buttonRef.current?.click();
  };

  useKeyboardHandler([
    {
      key: 's',
      modifier: 'metaKey',
      callback: openMenu
    }
  ]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          ref={buttonRef}
          as={Button}
          variant="tiny"
          className="px-2 py-1 rounded-md"
        >
          Sort
          <SortAscending className="-mr-1 ml-2 h-4 w-4" />
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
        <Menu.Items className="origin-top-right right-0 absolute mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-trout-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-50 dark:divide-trout-500 focus:outline-none z-50">
          {items.map((group, i) => (
            <div className="py-1" key={`item-group-${i}`}>
              {group.map((item, j) => (
                <DropdownItem
                  key={`item-group-${i}-dropdown-item-${j}`}
                  {...item}
                  onClick={() => onItemClick(item)}
                />
              ))}
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortConfig;
