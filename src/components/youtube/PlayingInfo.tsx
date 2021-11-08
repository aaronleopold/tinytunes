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
    <div className="flex flex-col space-y-2 text-center">
      <Heading>{title}</Heading>
    </div>
  );
};

export default PlayingInfo;
