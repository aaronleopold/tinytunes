import React from 'react';
import { MemoryRouter } from 'react-router';
import Layout from './components/Layout';
import Theme from './components/Theme';
import Routes from './pages/Routes';
import { Provider } from './store/store';

export default function App() {
  return (
    <Provider>
      <Theme>
        <MemoryRouter initialEntries={['/youtube']}>
          <Layout>
            <Routes />
          </Layout>
        </MemoryRouter>
      </Theme>
    </Provider>
  );
}
