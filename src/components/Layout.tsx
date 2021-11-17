import React from 'react';
import Header from './Header';
import Loader from './ui/Loader';

const Layout: React.FC = ({ children }) => {
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
