import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from './Home';

const Settings = React.lazy(() => import('./Settings'));
const YouTubePlay = React.lazy(() => import('./YouTubePlay'));
const LocalMediaPlay = React.lazy(() => import('./LocalMediaPlay'));

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/settings" element={<Settings />} />
      <Route path="/youtube/play/:index" element={<YouTubePlay />} />
      <Route path="/local/play/:name" element={<LocalMediaPlay />} />
      <Route path="/*" element={<Home />} />
    </RouterRoutes>
  );
}
