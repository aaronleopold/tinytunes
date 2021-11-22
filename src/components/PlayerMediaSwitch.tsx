import clsx from 'clsx';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { MediaType } from '../store/models/Root';
import { useMst } from '../store/store';

const tabs = [
  { name: 'YouTube', value: MediaType.YOUTUBE },
  { name: 'Local Media', value: MediaType.LOCAL }
];

function PlayerMediaSwitch() {
  const store = useMst();

  const handleChangeTab = (item: typeof tabs[0]) => {
    store.setMediaType(item.value);
  };

  const selected = useMemo(() => {
    return tabs.find(item => item.value === store.mediaType);
  }, [store.mediaType]);

  return (
    <nav className="flex space-x-3">
      {tabs.map((tab, i) => {
        const isSelected = selected?.name === tab.name;

        return (
          <button
            key={tab.name}
            onClick={() => handleChangeTab(tab)}
            className={clsx(
              isSelected
                ? 'text-brand-600 dark:text-brand-500'
                : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-300',
              'relative whitespace-nowrap p-1 font-medium text-xs transition-colors duration-200'
            )}
          >
            <span>{tab.name}</span>

            {isSelected && (
              <motion.div
                className="bg-blue-500 absolute bottom-[-1px] left-0 right-0 h-[2px]"
                layoutId="underline"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default observer(PlayerMediaSwitch);
