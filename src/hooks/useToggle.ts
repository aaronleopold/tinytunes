import { useState, useMemo } from 'react';

export default function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  const togglers = useMemo(
    () => ({
      on() {
        setValue(true);
      },
      off() {
        setValue(false);
      },
      toggle() {
        setValue(value => !value);
      }
    }),
    [setValue]
  );

  return [value, togglers] as const;
}
