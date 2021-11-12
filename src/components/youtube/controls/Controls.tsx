import { observer } from 'mobx-react-lite';
import { Pause, Play, SkipBack, SkipForward } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import usePrevious from '../../../hooks/usePrevious';
import { useMst } from '../../../store/store';
import GifChanger from './GifChanger';
import ProgressBar from './ProgressBar';
import Volume from './Volume';

interface ControlsProps {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSkip?: () => void;
  onReplay?: () => void;
  setVolume: (volume: number) => void;
  seekTo: (value: number) => void;
  getNewGif: () => void;
}

interface ControlButtonProps {
  action: () => void;
  icon: React.FC<any>;
}

const ControlButton: React.FC<ControlButtonProps> = ({ action, ...props }) => (
  <button onClick={action}>
    <props.icon
      weight="fill"
      className="w-8 h-8 text-white font-medium text-shadow-xl"
    />
  </button>
);

const Controls: React.FC<ControlsProps> = ({
  playing,
  onPlay,
  onPause,
  onReplay,
  onSkip,
  seekTo,
  getNewGif
}) => {
  const [progress, setProgress] = useState(0);

  const { playerInfo } = useMst();

  const prevTitle = usePrevious(playerInfo.title);

  useEffect(() => {
    let interval: any;

    if (prevTitle !== playerInfo.title && progress > 0) {
      setProgress(0);
    } else if (playerInfo.isPlaying) {
      interval = setInterval(() => {
        setProgress(progress + 1);
      }, 1000);
    } else if (!playerInfo.isPlaying && progress > 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [playerInfo.isPlaying, playerInfo.title, progress]);

  const handleReplay = () => {
    if (onReplay) {
      onReplay();

      if (progress > 0) {
        setProgress(0);
      }
    }
  };

  const handleSeek = (value: number) => {
    if (value > playerInfo.duration) {
      seekTo(playerInfo.duration - 1);
      setProgress(playerInfo.duration - 1);
    } else if (value >= 0) {
      seekTo(value);
      setProgress(value);
    } else {
      throw new Error('Invalid value: cannot seek to a negative value');
    }
  };

  return (
    <div className="absolute inset-x-0 bottom-0 py-2 z-50">
      <div className="grid grid-cols-6 justify-center items-center w-[90%] mx-auto">
        <GifChanger getNewGif={getNewGif} />

        <div className="flex col-span-4 space-x-4 justify-center items-center pb-2 text-white text-shadow-lg">
          {onReplay && <ControlButton action={handleReplay} icon={SkipBack} />}

          <ControlButton
            action={playing ? onPause : onPlay}
            icon={playing ? Pause : Play}
          />

          {onSkip && <ControlButton action={onSkip} icon={SkipForward} />}
        </div>

        <Volume />
      </div>

      <ProgressBar progress={progress} seekTo={handleSeek} />
    </div>
  );
};

export default observer(Controls);
