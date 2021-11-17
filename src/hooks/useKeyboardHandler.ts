import { useEffect } from 'react';

export interface HandlerKey {
  key: string;
  modifier?: string;
  callback?: () => void;
  // if kill returns true, the callback will not be called, and the event will
  // not be preventDefault'ed
  kill?: () => boolean;
}

// I should really just merge these two insanely similar hooks lol
export default function useKeyboardHandler(watch: HandlerKey[]) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = watch.find(opt => opt.key === event.key);

      if (!key || !key.callback) {
        return;
      }

      if (key.kill && key.kill()) {
        return;
      }

      if (
        !key.modifier ||
        (key.modifier && event[key.modifier as keyof typeof event])
      ) {
        event.preventDefault();
        key.callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
}
