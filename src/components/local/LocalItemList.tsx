import { invoke } from '@tauri-apps/api';
import React from 'react';
import Button from '../ui/Button';
import Text from '../ui/Text';

export default function LocalItemList() {
  const getLocalItems = async () => {
    await invoke('get_local_media');
  };

  return (
    <div>
      <Button
        onClick={getLocalItems}
        variant="tiny"
        className="px-2 py-1 rounded-md"
      >
        Test read dir
      </Button>
      <Text>TODO: gotta make me</Text>
    </div>
  );
}
