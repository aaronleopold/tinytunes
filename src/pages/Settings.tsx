import { invoke } from '@tauri-apps/api';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import FilePicker from '../components/ui/FIlePicker';
import RadioGroup from '../components/ui/RadioGroup';
import {
  windowSizeSelections,
  WINDOW_SIZES
} from '../store/models/Preferences';
import { useMst } from '../store/store';

const Settings = observer(() => {
  const { userPreferences } = useMst();

  // I REALLY don't like this
  const currentSize = useMemo(() => {
    return Object.keys(WINDOW_SIZES).find(key => {
      const value = WINDOW_SIZES[key];
      const { width, height } = value;

      return (
        userPreferences.height === height && userPreferences.width === width
      );
    });
  }, [userPreferences.width, userPreferences.height]);

  const handleChangeSize = async (key: string) => {
    const { height, width } = WINDOW_SIZES[key];

    await invoke('resize_window', {
      width,
      height
    })
      .then(() => userPreferences.setWindowSize(width, height))
      .catch(err => console.log('Could not resize window:', err));
  };

  const handleChangeDownloadDir = async (buffer: string) => {
    if (!buffer) return;

    await invoke('set_download_directory', { dir: buffer })
      .then(() => userPreferences.setDownloadDirectory(buffer))
      .catch(err => console.log('Could not set download dir:', err));
  };

  return (
    <div className="flex flex-col space-y-4 p-3">
      <ThemeToggle />

      <FilePicker
        dir
        label="Download Folder"
        description="This is where the playlists/videos you download go"
        value={userPreferences.download_directory}
        onChange={handleChangeDownloadDir}
      />
      <RadioGroup
        groupLabel="Window Size"
        items={windowSizeSelections}
        selected={currentSize}
        setSelected={handleChangeSize}
      />
    </div>
  );
});

export default Settings;
