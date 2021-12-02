import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import LocalItemList from '../../components/local/LocalItemList';
import useNavigate from '../../hooks/useNavigate';
import { useMst } from '../../store/store';

function LocalMedia() {
  const store = useMst();
  const { navigate } = useNavigate();
  const { state } = useLocation();

  const navToDir = (dirName: string) => {
    navigate('.', { state: { baseDir: dirName } });
  };

  const join = (...args: string[]) => {
    return args
      .map((part, i) => {
        if (i === 0) {
          return part.trim().replace(/[\/]*$/g, '');
        } else {
          return part.trim().replace(/(^[\/]*|[\/]*$)/g, '');
        }
      })
      .filter(x => x.length)
      .join('/');
  };

  const baseDir = useMemo(() => {
    const preferred = store.userPreferences.download_directory;
    if (state?.baseDir) {
      return join(preferred, state.baseDir);
    } else {
      return preferred;
    }
  }, [state, store.userPreferences.download_directory]);

  return (
    <>
      <LocalItemList baseDir={baseDir} onDirChange={navToDir} />
    </>
  );
}

export default observer(LocalMedia);
