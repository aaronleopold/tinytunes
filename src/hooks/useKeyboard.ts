import { useEffect } from 'react';

export default function useKeyboard(key: string, callback: () => void) {
  useEffect(() => {
    const handler = function (event: KeyboardEvent) {
      if (event.key === key) {
        event.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
}
