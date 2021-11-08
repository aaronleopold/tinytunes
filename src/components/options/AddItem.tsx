import React, { useRef, useState } from 'react';
import useKeyboardHandler from '../../hooks/useKeyboardHandler';
import useToggle from '../../hooks/useToggle';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import urlRegex from 'url-regex';
import { parse } from 'querystring';
import { invoke } from '@tauri-apps/api';
import { useMst } from '../../store/store';

// video: https://www.youtube.com/watch?v=ID
// playlist: https://www.youtube.com/playlist?list=ID

const AddItem: React.FC = () => {
  const store = useMst();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = useToggle(false);
  const [name, setName] = useState('');
  const [ytInput, setYtInput] = useState('');
  const [open, { on, off }] = useToggle(false);

  const parseUrl = (url: string) => {
    //No string provided
    if (url === '' || url === undefined) return null;

    //No query string detected
    if (!url.includes('?')) return null;

    const parts = url.split('?');

    // no params
    if (parts.length <= 1) return null;

    const queryString = parts[1];

    return parse(queryString);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading.on();

    if (!urlRegex({ exact: true }).test(ytInput)) {
      alert('TODO: notify bad stuffs');
      setLoading.off();
      return;
    }

    const parsed = parseUrl(ytInput);

    if (!parsed) {
      alert('TODO: notify bad stuffs');
      setLoading.off();
      return;
    }

    let is_stream = false;
    let yt_id: string;

    if (parsed.v && typeof parsed.v === 'string') {
      is_stream = true;
      yt_id = parsed.v;
    } else if (parsed.list && typeof parsed.list === 'string') {
      yt_id = parsed.list;
    } else {
      alert('TODO: notify bad stuffs');
      setLoading.off();
      return;
    }

    console.log({
      name,
      yt_id,
      is_stream
    });

    let error = await invoke<number>('insert_yt_item', {
      name,
      ytId: yt_id,
      isStream: is_stream
    })
      .then(id => store.addItem(id, name, yt_id, is_stream))
      .catch(err => err);

    setLoading.off();

    if (error) {
      // TODO: notify error
      // KNOWN ERRORS I CAN DISPLAY:
      // 1). UNIQUE constraint failed: yt_items.yt_id - duplicate key value violates unique constraint "yt_items_yt_id_key"
    } else {
      off();
    }
  };

  const openModal = () => {
    // manually doing this to get the focus styles because of the wry bug
    // (i'm not just crazy).
    // see here => https://github.com/tauri-apps/wry/issues/406
    buttonRef.current?.focus();
    on();
  };

  useKeyboardHandler([
    {
      key: 'n',
      modifier: 'metaKey',
      callback: openModal
    }
  ]);

  return (
    <>
      <Modal title="Add YouTube Item" open={open} onClose={off}>
        <Modal.Body>
          <form
            id="add-yt-item-form"
            className="flex flex-col space-y-3"
            onSubmit={handleSubmit}
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
          <Button disabled={loading} onClick={off}>
            Cancel
          </Button>
          <Button
            loading={loading}
            type="submit"
            form="add-yt-item-form"
            variant="primary"
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Button
        ref={buttonRef}
        onClick={openModal}
        variant="tiny"
        className="px-2 py-1 rounded-md"
      >
        Add
      </Button>
    </>
  );
};

export default AddItem;
