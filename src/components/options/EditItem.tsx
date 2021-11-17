import { invoke } from '@tauri-apps/api';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react';
import { YouTubeItem } from '../../@types/store';
import useToggle from '../../hooks/useToggle';
import { useMst } from '../../store/store';
import parseYoutubeUrl from '../../utils/url';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

interface EditItemProps {
  open: boolean;
  selected: number | null;
  onClose: () => void;
}

const formatUrl = (item?: YouTubeItem) => {
  if (!item) {
    return '';
  }

  const { yt_id, is_stream } = item;

  if (is_stream) {
    return `https://www.youtube.com/watch?v=${yt_id}`;
  } else {
    return `https://www.youtube.com/playlist?list=${yt_id}`;
  }
};

const EditItem: React.FC<EditItemProps> = ({ open, selected, onClose }) => {
  const { items } = useMst();

  const item = useMemo(() => {
    if (selected !== null) {
      return items[selected];
    }
  }, [selected]);

  const [loading, { on, off }] = useToggle(false);
  const [name, setName] = React.useState(item?.name);
  const [ytInput, setYtInput] = React.useState(formatUrl(item));

  useEffect(() => {
    if (item) {
      setName(item.name);
      setYtInput(formatUrl(item));
    }
  }, [item]);

  const persistEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!item) return;

    if (!name || !ytInput) return;

    on();

    const parsed = parseYoutubeUrl(ytInput);

    if (parsed) {
      const { is_stream, yt_id } = parsed;

      // no edits were made
      if (name === item.name && yt_id === item.yt_id) {
        off();
        return;
      }

      // I really hate how tauri assumes camelcase. I originally matched snake case
      // but now I have to convert it to camel case.
      await invoke('update_yt_item', {
        id: item.id,
        name,
        ytId: yt_id,
        isStream: is_stream
      })
        .then(() => {
          // edit in store
          item.setName(name);

          onClose();
        })
        .catch(err => console.log(err));
    } else {
      alert('TODO: did not work');
    }

    off();
  };

  return (
    <Modal title="Edit YouTube Item" open={open} onClose={onClose}>
      <Modal.Body>
        <form
          id="add-yt-item-form"
          className="flex flex-col space-y-3"
          onSubmit={persistEdit}
        >
          <Input
            fullWidth
            label="Name"
            description="Enter a label for this item"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <Input
            fullWidth
            label="YouTube Link"
            description="Enter the entire URL, we'll handle the rest"
            value={ytInput}
            onChange={e => setYtInput(e.target.value)}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button
          loading={loading}
          type="submit"
          form="add-yt-item-form"
          variant="primary"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default observer(EditItem);
