import clsx from 'clsx';
import { GearSix } from 'phosphor-react';
import React from 'react';

import HeaderNavigation from './HeaderNavigation';
import NavigationButton from './NavigationButton';
import Heading from './ui/Heading';

interface HeaderItemProps extends React.ComponentProps<'div'> {}

const HeaderItem: React.FC<HeaderItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('flex items-center', className)} {...props}>
      {children}
    </div>
  );
};

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <nav className="w-full h-12 grid grid-cols-6 items-center  bg-gray-100 border dark:bg-trout-900 dark:border-trout-800 dark:shadow px-2">
      <HeaderItem className="justify-start col-span-1">
        <HeaderNavigation />
      </HeaderItem>
      <HeaderItem className="justify-center col-span-4">
        <Heading>Tray Tunes</Heading>
      </HeaderItem>
      <HeaderItem className="justify-end col-span-1">
        <NavigationButton to="settings" variant="tiny" className="rounded-md">
          <GearSix className="w-4 h-4" />
        </NavigationButton>
      </HeaderItem>
    </nav>
  );
};

export default Header;
