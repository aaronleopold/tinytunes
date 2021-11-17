import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useMst } from '../store/store';

const Theme: React.FC = ({ children }) => {
  const { userPreferences } = useMst();
  const { dark_theme } = userPreferences;

  useEffect(() => {
    const html = document.querySelector('html');
    if (dark_theme) {
      html?.classList.add('dark');
    } else {
      html?.classList.remove('dark');
    }
  }, [dark_theme]);

  return <>{children}</>;
};

export default observer(Theme);
