import React from 'react';
import AddItem from './AddItem';
import SortConfig from './SortConfig';

const ListOptions: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <AddItem />
      <SortConfig />
    </div>
  );
};

export default ListOptions;
