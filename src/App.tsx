import React from 'react';
import { MemoryRouter } from 'react-router';
import Layout from './components/Layout';
import Routes from './pages/Routes';
import { Provider } from './store/store';

export default function App() {
  return (
    <Provider>
      <MemoryRouter>
        <Layout>
          <Routes />
        </Layout>
      </MemoryRouter>
    </Provider>
  );
}
