import React from 'react';
import AddItem from './AddItem';
import SortConfig from './SortConfig';

const ListOptions: React.FC = () => {
  return (
    <div className="flex space-x-2 mb-3 justify-end">
      <AddItem />
      <SortConfig />
    </div>
  );
};

export default ListOptions;
