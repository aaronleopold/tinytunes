import React from 'react';
import { Route, Routes } from 'react-router';
import { ListViewLayout } from '../../components/Layout';

const YouTube = React.lazy(() => import('./YouTube'));
const LocalMedia = React.lazy(() => import('./LocalMedia'));

export default function Home() {
  return (
    <ListViewLayout>
      <Routes>
        <Route path="youtube" element={<YouTube />} />
        <Route path="local" element={<LocalMedia />} />
      </Routes>
    </ListViewLayout>
  );
}
