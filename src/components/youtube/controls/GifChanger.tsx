import React from 'react';
import { SubText } from '../../ui/Text';

interface GifChangerProps {
  getNewGif: () => void;
}

const GifChanger: React.FC<GifChangerProps> = ({ getNewGif }) => {
  return (
    <div className="flex items-center justify-start col-span-1">
      <button onClick={getNewGif}>
        <SubText>Change gif</SubText>
      </button>
    </div>
  );
};

export default GifChanger;
