import React from 'react';
import { DefaultProps } from '../@types';
import Header from './Header';
import Loader from './ui/Loader';

interface LayoutProps extends DefaultProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="select-none h-screen w-screen transition-width ease-linear duration-100 rounded-xl overflow-hidden bg-gray-50 dark:bg-trout-900">
      <Header />
      <main className="h-header-offset overflow-y-scroll scroll-hidden">
        <React.Suspense fallback={<Loader active />}>{children}</React.Suspense>
      </main>
    </div>
  );
};

export default Layout;
