import { invoke } from '@tauri-apps/api';
import React, { useEffect, useState } from 'react';
import { GetLocalMediaReturn } from '../../@types';
import LocalItem from './LocalItem';

interface Props {
  baseDir: string;
  onDirChange: (dir: string) => void;
}

export default function LocalItemList({ baseDir, onDirChange }: Props) {
  const [items, setItems] = useState<GetLocalMediaReturn[]>([]);

  const [selected, setSelected] = useState<number | null>(null);

  const getLocalItems = async () => {
    const entries = await invoke<GetLocalMediaReturn[]>('get_local_media', {
      baseDir
    }).catch(err => {
      console.log(err);
      return [];
    });

    setItems(entries);
  };

  const goTo = (index: number) => {
    const item = items[index];
    if (item.is_dir) {
      onDirChange(item.name);
    } else {
      alert('Not implemented');
    }
  };

  useEffect(() => {
    getLocalItems();
  }, [baseDir]);

  // TODO: I am not sure how I want to handle directories here. I don't love how it looks inline with
  // the actual file list

  console.log(baseDir);

  return (
    <div className="w-full flex flex-col space-y-1 pb-3">
      {items.map((item, i) => {
        return (
          <LocalItem
            key={i}
            onClick={() => setSelected(i)}
            onDoubleClick={() => goTo(i)}
            selected={selected === i}
            even={i % 2 === 0}
            {...item}
          />
        );
      })}
    </div>
  );
}
