import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { DownloadSimple } from 'phosphor-react';
import useToggle from '../../../hooks/useToggle';
import OutsideClickHandler from 'react-outside-click-handler';
import Button from '../../ui/Button';
import useKeyboard from '../../../hooks/useKeyboard';
import { useMst } from '../../../store/store';
import Text, { SubText } from '../../ui/Text';
import { listen } from '@tauri-apps/api/event';
import DownloadProgress from './DownloadProgress';

let unlisten_ytdl_output: () => void;
let unlisten_ytdl_terminated: () => void;

// FIXME: a little messy
function DownloadInfo() {
  const { downloadInfo } = useMst();

  const [open, { on, off, toggle }] = useToggle(false);

  useKeyboard('Escape', off);

  const getProgress = (payload: string) => {
    let regex = /Downloading video (?<current>\d+) of (?<total>\d+)/;
    let groups = payload.match(regex)?.groups;

    console.log(groups);

    if (groups) {
      let current = parseInt(groups.current, 10);
      let total = parseInt(groups.total, 10);
      return { current, total };
    } else return null;
  };

  const handleYtdlOutput = (event: any) => {
    // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
    // event.payload is the payload object
    console.log('ytdl_output event:', event);

    const progress = getProgress(event.payload);

    if (progress) {
      downloadInfo.setCurrentPosition(progress.current);

      if (downloadInfo.current.total === 0) {
        downloadInfo.setCurrentTotal(progress.total);
      }
    }
  };

  const handleYtdlTerminated = (event: any) => {
    console.log('ytdl_terminated event:', event);
    downloadInfo.reset();

    // payload is the exit code
    if (event.payload !== 0) {
      alert('download stopped, is this bad?????');
    }
  };

  useEffect(() => {
    async function init_listeners() {
      unlisten_ytdl_output = await listen<any>('ytdl_output', handleYtdlOutput);

      unlisten_ytdl_terminated = await listen<any>(
        'ytdl_terminated',
        handleYtdlTerminated
      );
    }

    init_listeners();

    return () => {
      if (unlisten_ytdl_output) {
        unlisten_ytdl_output();
      }

      if (unlisten_ytdl_terminated) {
        unlisten_ytdl_terminated();
      }
    };
  }, []);

  if (!downloadInfo.isDownloading) {
    return null;
  }

  return (
    <OutsideClickHandler onOutsideClick={off}>
      <div className="relative">
        <div className="flex items-center">
          <Button
            onClick={toggle}
            onMouseEnter={() => setTimeout(on, 500)}
            variant="tiny"
            className="rounded-md"
          >
            <DownloadSimple className="w-4 h-4" />
          </Button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute origin-top-right right-0 mt-2 w-52 bg-white dark:bg-trout-700 rounded-md z-100"
            >
              <div className="flex flex-col items-center justify-center p-2">
                <Text>{downloadInfo.current.name}</Text>
                <SubText>
                  Downloading {downloadInfo.current.position} of{' '}
                  {downloadInfo.current.total}
                </SubText>
                <span className="h-0.5" />
                <DownloadProgress
                  position={downloadInfo.current.position}
                  total={downloadInfo.current.total}
                />
                <SubText>TODO: Kill button?</SubText>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OutsideClickHandler>
  );
}

export default observer(DownloadInfo);
