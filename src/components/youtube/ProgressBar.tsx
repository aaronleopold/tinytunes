import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import usePrevious from '../../hooks/usePrevious';
import { useMst } from '../../store/store';
import Text from '../ui/Text';
import moment from 'moment';

interface ProgressBarProps {}

// TODO: make interactable (i.e. can be clicked to seek forward and backward)
// TODO: fix this for streams
const ProgressBar: React.FC<ProgressBarProps> = () => {
  const [progress, setProgress] = React.useState(0);

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

  return (
    <div className="flex items-center w-[85%] space-x-2 mx-auto">
      <Text>{formattedTime(progress)}</Text>
      <div className="h-1 w-full bg-gray-400 mx-auto rounded-md cursor-pointer">
        {/* TODO: make this look smoother! */}
        <div
          className="h-full bg-gray-50 rounded-md transition-width ease-linear duration-1000"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <Text>{formattedTime(parseInt(playerInfo.duration.toFixed(0), 10))}</Text>
    </div>
  );
};

export default observer(ProgressBar);
