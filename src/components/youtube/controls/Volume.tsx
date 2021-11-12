import { SpeakerHigh } from 'phosphor-react';
import React from 'react';

interface VolumeProps {}

const Volume: React.FC<VolumeProps> = () => {
  return (
    <div className="flex justify-end col-span-1">
      <SpeakerHigh className="text-white text-shadow-md h-6 w-6" />
    </div>
  );
};

export default Volume;
