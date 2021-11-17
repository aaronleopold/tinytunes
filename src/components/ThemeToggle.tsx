import { invoke } from '@tauri-apps/api';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useMst } from '../store/store';
import Switch from './ui/Switch';

function ThemeToggle() {
  const { userPreferences } = useMst();

  const handleThemeChange = async () => {
    await invoke('set_dark_theme', { darkTheme: !userPreferences.dark_theme })
      .then(() => {
        userPreferences.toggleTheme();
      })
      .catch(err => console.log('Could not set dark theme:', err));
  };

  return (
    <Switch
      label="Application Theme"
      enabled={userPreferences.dark_theme}
      setEnabled={handleThemeChange}
    />
  );
}

export default observer(ThemeToggle);
