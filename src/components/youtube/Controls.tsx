import { Pause, Play, SkipBack, SkipForward } from 'phosphor-react';
import React from 'react';

// playing={playing}
// onPlay={() => {
//   player.playVideo();
//   setPlaying(true);
// }}
// onPause={() => {
//   player.pauseVideo();
//   setPlaying(false);
// }}
// onSkip={() => player.nextVideo()}
// onReplay={() => player.previousVideo()

interface ControlsProps {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSkip?: () => void;
  onReplay?: () => void;
}

interface ControlButtonProps {
  action: () => void;
  icon: React.FC<any>;
}

const ControlButton: React.FC<ControlButtonProps> = ({ action, ...props }) => (
  <button onClick={action}>
    <props.icon className="w-8 h-8 text-white" />
  </button>
);

const Controls: React.FC<ControlsProps> = ({
  playing,
  onPlay,
  onPause,
  onReplay,
  onSkip
}) => {
  return (
    <div className="absolute inset-x-0 bottom-0  py-2">
      <div className="flex space-x-4 justify-center items-center pb-2 text-white text-shadow-lg">
        {onReplay && <ControlButton action={onReplay} icon={SkipBack} />}

        <ControlButton
          action={playing ? onPause : onPlay}
          icon={playing ? Pause : Play}
        />

        {onSkip && <ControlButton action={onSkip} icon={SkipForward} />}
      </div>
    </div>
  );
};

export default Controls;
