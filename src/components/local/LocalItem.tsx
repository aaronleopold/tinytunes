import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import clsx from 'clsx';
import Text, { SubText } from '../ui/Text';
import { GetLocalMediaReturn } from '../../@types';
import { Folder, MusicNoteSimple } from 'phosphor-react';

interface Props extends GetLocalMediaReturn {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick: React.MouseEventHandler<HTMLDivElement>;

  even: boolean;
  selected: boolean;
}

export default function LocalItem({
  name,
  path,
  even,
  is_dir,
  selected,
  ...props
}: Props) {
  const ext = path.split('.').pop();

  const _icon = is_dir ? Folder : MusicNoteSimple;

  // {is_stream ? 'Video' : 'Playlist'} ∙ {yt_id}
  const renderSubtext = () => {
    if (is_dir) {
      return `Directory ∙ ${path}`;
    }

    return `Audio File ∙ ${ext}`;
  };

  return (
    <ContextMenuTrigger id={path}>
      <div
        className={clsx(
          even
            ? 'bg-gray-50 dark:bg-trout-900'
            : 'bg-gray-100 dark:bg-trout-800',
          { 'border-brand-500': selected },
          { 'border-transparent': !selected },
          'p-2 rounded-md border'
        )}
        {...props}
      >
        <div className="flex items-center space-x-2">
          <_icon className="dark:text-gray-200 w-5 h-5" />
          <Text className="cursor-default">{name}</Text>
        </div>
        <SubText className="ml-7">{renderSubtext()}</SubText>
      </div>
    </ContextMenuTrigger>
  );
}

/**
// idk if this looks better????? 
<div className="flex items-center space-x-2">
  <_icon className="dark:text-gray-200 w-5 h-5" />
  <div>
    <Text className="cursor-default">{name}</Text>
    <SubText>{renderSubtext()}</SubText>{' '}
  </div>
</div>
 */
