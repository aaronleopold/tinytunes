import { observer } from 'mobx-react-lite';
import {
  SpeakerHigh,
  SpeakerLow,
  SpeakerNone,
  SpeakerSlash
} from 'phosphor-react';
import React, { useMemo } from 'react';
import { useMst } from '../../../store/store';

interface VolumeProps {}

interface VolumeSliderProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ volume, setVolume }) => {
  const handleVolumeChange = (value: number) => {
    if (value <= 1 && value >= 0) {
      setVolume(value);
    }
  };

  const volumePercentage = useMemo(() => {
    return volume * 100;
  }, [volume]);

  return (
    <div className="flex items-center bg-gray-400 rounded-md w-16 relative">
      <input
        className="w-full"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={e => handleVolumeChange(parseFloat(e.target.value))}
      />

      <div
        className="absolute h-full bg-gray-50 rounded-md"
        style={{ width: `${volumePercentage}%` }}
      />
    </div>
  );
};

const Volume: React.FC<VolumeProps> = () => {
  const { playerInfo } = useMst();

  const renderSpeaker = () => {
    const className = 'text-white text-shadow-md h-4 w-4';

    if (playerInfo.muted) {
      return <SpeakerSlash className={className} />;
    } else if (playerInfo.volume > 0.75) {
      return <SpeakerHigh className={className} />;
    } else if (playerInfo.volume > 0) {
      return <SpeakerLow className={className} />;
    } else {
      return <SpeakerNone className={className} />;
    }
  };

  return (
    <div className="flex justify-end col-span-1 relative">
      <div className="flex justify-center items-center space-x-2">
        {renderSpeaker()}
        <VolumeSlider
          volume={playerInfo.muted ? 0 : playerInfo.volume}
          setVolume={playerInfo.setVolume}
        />
      </div>
    </div>
  );
};

export default observer(Volume);
