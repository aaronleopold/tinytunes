import React from 'react';
import { ContextMenu as Menu, MenuItem } from 'react-contextmenu';

interface ContextMenuProps {
  id: number;
  onShow: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ id, onShow }) => {
  return (
    <Menu id={String(id)} onShow={onShow} hideOnLeave>
      <div className="p-1 bg-white dark:bg-trout-600 rounded-md">
        <MenuItem>Edit</MenuItem>
        <MenuItem divider />
        <MenuItem>Delete</MenuItem>
      </div>
    </Menu>
  );
};

export default ContextMenu;
