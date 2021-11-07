import { invoke } from '@tauri-apps/api';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
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

  // // TODO: type this
  const handleChangeSize = async (key: string) => {
    const { height, width } = WINDOW_SIZES[key];

    await invoke('resize_window', {
      width,
      height
    })
      .then(() => userPreferences.setWindowSize(width, height))
      .catch(err => console.log('Could not resize window:', err));
  };

  return (
    <div className="flex flex-col space-y-4">
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
