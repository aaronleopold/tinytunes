import { NotePencil, TrashSimple } from 'phosphor-react';
import React from 'react';
import { ContextMenu as Menu, MenuItem } from 'react-contextmenu';
import Text from './ui/Text';

interface ContextMenuProps {
  id: number;
  onShow: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  id,
  onShow,
  onDelete,
  onEdit
}) => {
  return (
    <Menu id={String(id)} onShow={onShow} hideOnLeave>
      <div className="bg-white dark:bg-trout-700 w-28 rounded-md shadow overflow-hidden">
        <MenuItem>
          <span
            onClick={onEdit}
            className="p-2 cursor-pointer flex items-center dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-trout-600"
          >
            <NotePencil className="h-4 w-4 mr-2" />
            <Text>Edit</Text>
          </span>
        </MenuItem>
        <MenuItem divider />
        <span
          onClick={onDelete}
          className="p-2 cursor-pointer flex items-center dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-trout-600"
        >
          <TrashSimple className="h-4 w-4 mr-2" />
          <Text>Delete</Text>
        </span>
      </div>
    </Menu>
  );
};

export default ContextMenu;
