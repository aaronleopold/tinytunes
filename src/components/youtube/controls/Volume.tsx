import { SpeakerHigh } from 'phosphor-react';
import React, { useMemo } from 'react';

interface VolumeProps {}

interface VolumeSliderProps {}

const VolumeSlider: React.FC<VolumeSliderProps> = () => {
  const [volume, setVolume] = React.useState(0.5);

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
        onChange={e => setVolume(parseFloat(e.target.value))}
      />

      <div
        className="absolute h-full bg-gray-50 rounded-md"
        style={{ width: `${volumePercentage}%` }}
      />
    </div>
  );
};

const Volume: React.FC<VolumeProps> = () => {
  return (
    <div className="flex justify-end col-span-1 relative">
      <div className="flex justify-center items-center space-x-2">
        <SpeakerHigh className="text-white text-shadow-md h-4 w-4" />
        <VolumeSlider />
      </div>
    </div>
  );
};

export default Volume;
