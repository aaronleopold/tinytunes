import React from 'react';
import Text from '../../ui/Text';

interface GifChangerProps {
  getNewGif: () => void;
}

const GifChanger: React.FC<GifChangerProps> = ({ getNewGif }) => {
  return (
    <div className="flex items-center justify-start col-span-1">
      <button onClick={getNewGif}>
        <Text size="xs">Change gif</Text>
      </button>
    </div>
  );
};

export default GifChanger;
