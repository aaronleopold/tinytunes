import React from 'react';
import ListOptions from './options/ListOptions';
import PlayerMediaSwitch from './PlayerMediaSwitch';

export default function Toolbar() {
  return (
    <div className="sticky top-0 bg-gray-50 dark:bg-trout-900 py-2 flex items-center justify-between shadow-sm px-3">
      <PlayerMediaSwitch />
      <ListOptions />
    </div>
  );
}
