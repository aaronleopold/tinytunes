import React from 'react';
import Heading from '../ui/Heading';
import Kbd from '../ui/Kbd';
import Text from '../ui/Text';

const EmptyListMessage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2 text-center mt-8">
      <Heading>You don't have any items configured.</Heading>
      <Text>
        Press the 'Add' button, or <Kbd>⌘</Kbd> <Kbd>n</Kbd>
      </Text>
    </div>
  );
};

export default EmptyListMessage;
