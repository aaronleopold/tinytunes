import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { useNavigate } from 'react-router';
import { YouTubeItem } from '../../@types/store';

import useKeyboard from '../../hooks/useKeyboard';
import { useMst } from '../../store/store';
import ContextMenu from '../ContextMenu';
import Text, { SubText } from '../ui/Text';
import EmptyListMessage from './EmptyListMessage';

let items = [
  {
    id: 0,
    name: 'Lofi & Neat Mixes 🎧',
    yt_id: 'PLm5pKYShxnXB1g2LixFdKxjAvl3P2O4Hm',
    is_stream: false
  },
  {
    id: 1,
    name: 'Lofi for Writing 🤔',
    yt_id: 'PLSkGho4yZH-Cz7cGg-mY103vl5g-lZSci',
    is_stream: false
  },
  {
    id: 2,
    name: 'ChilledCow 🐮',
    yt_id: '5qap5aO4i9A',
    is_stream: true
  },
  {
    id: 3,
    name: 'Lofi Christmas Radio 🎄',
    yt_id: 'knTSObLVUao',
    is_stream: true
  }
];

interface ItemProps extends YouTubeItem {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick: React.MouseEventHandler<HTMLDivElement>;

  even: boolean;
  selected: boolean;
}

const Item: React.FC<ItemProps> = ({
  id,
  name,
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
        <Text>{name}</Text>
        <SubText>{is_stream ? 'Video' : 'Playlist'}</SubText>
      </div>
    </ContextMenuTrigger>
  );
};

// TODO: is it worth virtualizing this?
const ItemList = observer(() => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<number | null>(null);

  const selectedRef = useRef(selected);

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
    alert('TODO');

    if (index !== undefined) {
      // navigate(index);
    } else if (selectedRef.current !== null) {
      // navigate(selectedRef.current);
    }
  };

  const handleDeleteItem = (item: YouTubeItem) => {};

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useKeyboard('Escape', () => {
    setSelected(null);
  });
  useKeyboard('Enter', goTo);

  useKeyboard('ArrowUp', traverseUp);
  useKeyboard('ArrowDown', traverseDown);

  // TODO: double click to edit? right click context menu?
  return (
    <div className="w-full flex flex-col space-y-1">
      {items.length === 0 && <EmptyListMessage />}

      {items.map((item, i) => {
        return (
          <>
            <Item
              onClick={() => setSelected(i)}
              onDoubleClick={() => goTo(i)}
              key={item.id}
              selected={selected === i}
              even={i % 2 === 0}
              {...item}
            />

            <ContextMenu
              key={String(item.id + '-menu')}
              id={item.id}
              onShow={() => handleShowContextMenu(i)}
              onDelete={() => handleDeleteItem(item)}
              onEdit={() => alert('TODO')}
            />
          </>
        );
      })}
    </div>
  );
});

export default ItemList;
