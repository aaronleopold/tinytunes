import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Play = React.lazy(() => import('../pages/Play'));

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/play/:index" element={<Play />} />
    </RouterRoutes>
  );
};

export default Routes;
