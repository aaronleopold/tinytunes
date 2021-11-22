import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { DefaultProps } from '../@types';
import LocalItemList from '../components/local/LocalItemList';
import ListOptions from '../components/options/ListOptions';
import PlayerMediaSwitch from '../components/PlayerMediaSwitch';
import ItemList from '../components/youtube/ItemList';
import { MediaType } from '../store/models/Root';
import { useMst } from '../store/store';

const Layout = observer<DefaultProps>(({ children }) => {
  const store = useMst();

  return (
    <div className="h-full p-3">
      {children}

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={store.mediaType.toString()}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.15 }}
        >
          {store.mediaType === MediaType.YOUTUBE ? (
            <ItemList />
          ) : (
            <LocalItemList />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <PlayerMediaSwitch />
        <ListOptions />
      </div>
    </Layout>
  );
}
