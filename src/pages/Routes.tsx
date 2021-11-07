import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'));
const Settings = React.lazy(() => import('../pages/Settings'));

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
    </RouterRoutes>
  );
};

export default Routes;
