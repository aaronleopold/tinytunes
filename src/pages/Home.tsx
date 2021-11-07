import React from 'react';
import ListOptions from '../components/options/ListOptions';
import ItemList from '../components/youtube/ItemList';

const Home: React.FC = () => {
  return (
    <div className="h-full">
      <ListOptions />

      <ItemList />
    </div>
  );
};

export default Home;
