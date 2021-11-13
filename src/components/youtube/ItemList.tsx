import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { ContextMenuTrigger } from 'react-contextmenu';
import { useNavigate } from 'react-router';

import { YouTubeItem } from '../../@types/store';
import useKeyboardHandler from '../../hooks/useKeyboardHandler';
import { useMst } from '../../store/store';
import ContextMenu from './ContextMenu';
import Text, { SubText } from '../ui/Text';
import EmptyListMessage from './EmptyListMessage';
import EditItem from '../options/EditItem';

interface ItemProps extends YouTubeItem {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick: React.MouseEventHandler<HTMLDivElement>;

  even: boolean;
  selected: boolean;
}

const Item: React.FC<ItemProps> = ({
  id,
  name,
  yt_id,
  is_stream,
  even,
  selected,
  ...props
}) => {
  return (
    <ContextMenuTrigger id={String(id)}>
      <div
        className={clsx(
          even
            ? 'bg-gray-50 dark:bg-trout-900'
            : 'bg-gray-100 dark:bg-trout-800',
          { 'border-blue-500': selected },
          { 'border-transparent': !selected },
          'p-2 rounded-md border'
        )}
        {...props}
      >
        <Text className="cursor-default">{name}</Text>
        <SubText>
          {is_stream ? 'Video' : 'Playlist'} ∙ {yt_id}
        </SubText>
      </div>
    </ContextMenuTrigger>
  );
};

// TODO: is it worth virtualizing this?
const ItemList = observer(() => {
  const navigate = useNavigate();
  const { items } = useMst();

  const [selected, setSelected] = useState<number | null>(null);
  const selectedRef = useRef(selected);

  const [editing, setEditing] = useState<boolean>(false);

  // confusing name convention but this will traverse up while decrementing
  // the position down
  const traverseUp = () => {
    if (!items || !items.length) return;

    const current = selectedRef.current;

    if (current === null) {
      setSelected(0);
    } else if (current > 0) {
      setSelected(current - 1);
    }
  };

  // confusing name convention but this will traverse down while incrementing
  // the position up
  const traverseDown = () => {
    if (!items || !items.length) return;

    const current = selectedRef.current;

    if (current === null) {
      setSelected(0);
    } else if (current < items.length - 1) {
      setSelected(current + 1);
    }
  };

  const handleShowContextMenu = (index: number) => {
    if (selectedRef.current !== index) {
      setSelected(index);
    }
  };

  const goTo = (index?: number) => {
    if (index !== undefined) {
      navigate(`/play/${index}`);
    } else if (selectedRef.current !== null) {
      navigate(`/play/${selectedRef.current}`);
    }
  };

  const handleDeleteItem = (item: YouTubeItem) => {
    alert('TODO');
  };

  const handleDownloadItem = (item: YouTubeItem) => {
    alert('TODO');
  };

  const handleEditItem = (index?: number) => {
    if (index !== undefined) {
      setSelected(index);
      setEditing(true);
    } else {
      setEditing(true);
    }
  };

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useKeyboardHandler([
    { key: 'Escape', callback: () => setSelected(null) },
    { key: 'Enter', callback: goTo },
    { key: 'e', modifier: 'metaKey', callback: handleEditItem },
    { key: 'ArrowUp', callback: traverseUp },
    { key: 'ArrowDown', callback: traverseDown }
  ]);

  return (
    <>
      <EditItem
        open={editing}
        selected={selected}
        onClose={() => setEditing(false)}
      />

      <div className="w-full flex flex-col space-y-1 pb-3">
        {items.length === 0 && <EmptyListMessage />}

        {items.map((item, i) => {
          return (
            <React.Fragment key={item.id}>
              <Item
                onClick={() => setSelected(i)}
                onDoubleClick={() => goTo(i)}
                selected={selected === i}
                even={i % 2 === 0}
                {...item}
              />

              <ContextMenu
                key={String(item.id + '-menu')}
                id={item.id}
                onShow={() => handleShowContextMenu(i)}
                onDelete={() => handleDeleteItem(item)}
                onDownload={() => handleDownloadItem(item)}
                onEdit={() => handleEditItem(i)}
              />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
});

export default ItemList;
