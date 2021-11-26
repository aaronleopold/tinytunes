import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import useNavigate from '../hooks/useNavigate';

const tabs = [
  { name: 'YouTube', value: 'youtube' },
  { name: 'Local Media', value: 'local' }
];

function isSelected(value: string, pathname: string) {
  return value === pathname.split('/')[1];
}

function PlayerMediaSwitch() {
  const { navigate } = useNavigate();

  const location = useLocation();

  const handleChangeTab = (item: typeof tabs[0]) => {
    navigate(`/${item.value}`);
  };

  return (
    <nav className="flex space-x-3">
      {tabs.map((tab, i) => {
        const selected = isSelected(tab.value, location.pathname);

        return (
          <button
            key={tab.name}
            onClick={() => handleChangeTab(tab)}
            className={clsx(
              selected
                ? 'text-brand-600 dark:text-brand-500'
                : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-300',
              'relative whitespace-nowrap p-1 font-medium text-xs transition-colors duration-200'
            )}
          >
            <span>{tab.name}</span>

            {selected && (
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

export default PlayerMediaSwitch;
