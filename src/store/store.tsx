import React, { createContext, useContext, useEffect, useState } from 'react';
import { Instance, onSnapshot, applySnapshot } from 'mobx-state-tree';
import { RootModel } from './models/Root';
import { DefaultProps } from '../@types';
import { invoke } from '@tauri-apps/api';
import { HydrateReturn } from '../@types/store';

const rootStore = RootModel.create({});

onSnapshot(rootStore, snapshot => console.log('Snapshot:', snapshot));

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<RootInstance | null>(null);

export const Provider: React.FC<DefaultProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      let hydration = await invoke('hydrate')
        .then(data => data)
        .catch(err => console.log(err));

      if (hydration) {
        applySnapshot(rootStore, hydration as HydrateReturn);
      }

      setLoaded(true);
    };

    hydrate();
  }, []);

  if (!loaded) return null;

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export function useMst() {
  const store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }

  return store;
}
