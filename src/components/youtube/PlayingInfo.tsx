import React from 'react';
import Heading from '../ui/Heading';

interface PlayingInfoProps {
  title: string;
  videoUrl: string;
  videoId: string;
}

const PlayingInfo: React.FC<PlayingInfoProps> = ({
  title,
  videoUrl,
  videoId
}) => {
  return (
    <div className="absolute inset-0 mt-6 flex flex-col space-y-2 text-center z-50">
      <Heading className="select-text px-2" variant="player">
        {title}
      </Heading>
    </div>
  );
};

export default PlayingInfo;
