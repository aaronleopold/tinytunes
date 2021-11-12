import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { useMst } from '../../../store/store';
import Text from '../../ui/Text';
import moment from 'moment';

// I had to move progress tracking to the parent component
// so that when a user replays a video, the progress
// gets reset to 0.
interface ProgressBarProps {
  progress: number;
  seekTo: (progress: number) => void;
}

// TODO: fix this for streams
const ProgressBar: React.FC<ProgressBarProps> = ({ progress, seekTo }) => {
  const { playerInfo } = useMst();

  const progressPercentage = useMemo(() => {
    const seconds = progress;
    const totalSeconds = playerInfo.duration;

    if (!totalSeconds) {
      return 0;
    }

    return (seconds / totalSeconds) * 100;
  }, [progress, playerInfo.duration]);

  const formattedTime = (seconds: number) => {
    let val = moment.utc(seconds * 1000);

    // TODO: do I need to change the format at all?
    // if not, just inline return val instead of storing it

    return val.format('m:ss');
  };

  // this function will determine where in the div the user clicked
  // and set seek to the relative timestamp in the video
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const clickedPos = e.clientX - rect.left;
    const endPos = rect.width;
    const ratio = clickedPos / endPos;

    const totalSeconds = playerInfo.duration;
    const tentativeProgress = totalSeconds * ratio;

    seekTo(tentativeProgress);
  };

  return (
    <div className="flex items-center w-[90%] space-x-2 mx-auto">
      <Text>{formattedTime(progress)}</Text>
      <div
        className="h-1 w-full bg-gray-400 mx-auto rounded-md cursor-pointer"
        onClick={handleClick}
      >
        {/* TODO: make this look smoother! transition durations just don't look quite right */}
        <div
          className="h-full bg-gray-50 rounded-md transition-width ease-linear duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <Text>{formattedTime(parseInt(playerInfo.duration.toFixed(0), 10))}</Text>
    </div>
  );
};

export default observer(ProgressBar);
