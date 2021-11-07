import React, { useRef, useState } from 'react';
import useKeyboardHandler from '../../hooks/useKeyboardHandler';
import useToggle from '../../hooks/useToggle';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import urlRegex from 'url-regex';
import { parse } from 'querystring';

const AddItem: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [input, setInput] = useState('');
  const [open, { on, off }] = useToggle(false);

  const parseUrl = (url: string) => {
    //No string provided
    if (url === '' || url === undefined) return null;

    //No query string detected
    if (!url.includes('?')) return null;

    const parts = url.split('?');

    // no params
    if (parts.length <= 1) return null;

    // I am assuming the first...
    // TODO: refactor to a regex maybe? Or should I let it be naive?
    const queryString = parts[1];

    return parse(queryString);
  };

  const handleSubmit = async () => {
    let id;

    if (urlRegex({ exact: true }).test(input)) {
      id = parseUrl(input);
    } else {
      id = input;
    }

    // TODO: invoke tauri api
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
          <form onSubmit={handleSubmit}>
            <Input
              fullWidth
              label="YouTube Link or ID"
              description="You can enter the entire URL or just the ID"
              onChange={e => setInput(e.target.value)}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={off}>Cancel</Button>
          <Button variant="primary" onClick={off}>
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
