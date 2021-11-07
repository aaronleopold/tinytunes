import React from 'react';
import clsx from 'clsx';
import { FilePlus, FileText, Folder, FolderOpen } from 'phosphor-react';

import pickFile from '../../utils/file';
import { BUTTON_VARIANTS, INPUT_VARIANTS } from './constants';
import Label from './Label';

type FilePickerProps = {
  dir?: boolean;
  label: string;
  placeholder?: string;
  extensions?: string[];
  onChange(buffer: any): void;
  value: string | undefined;
  fullWidth?: boolean;
};

export default function FilePicker({
  dir,
  label,
  placeholder,
  onChange,
  value,
  extensions = [],
  fullWidth
}: FilePickerProps) {
  async function openDialog() {
    const result = await pickFile({ name: '', extensions, dir });

    if (result) {
      onChange(result);
    }
  }

  return (
    <div className={clsx(fullWidth && 'flex-1')}>
      <Label>{label}</Label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {dir ? (
              <Folder
                className="h-5 w-5 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
              />
            ) : (
              <FileText
                className="h-5 w-5 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
              />
            )}
          </div>
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            className={clsx(
              INPUT_VARIANTS['default'],
              'block w-full rounded-none rounded-l-md pl-10 text-sm'
            )}
            placeholder={placeholder ?? `Path to ${dir ? 'Folder' : 'File'}`}
          />
        </div>
        <button
          type="button"
          onClick={openDialog}
          className={clsx(
            BUTTON_VARIANTS['default'],
            '-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border rounded-r-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1'
          )}
        >
          {dir ? (
            <FolderOpen
              className="h-5 w-5 text-gray-400 dark:text-gray-200"
              aria-hidden="true"
            />
          ) : (
            <FilePlus
              className="h-5 w-5 text-gray-400 dark:text-gray-200"
              aria-hidden="true"
            />
          )}
          <span>Open</span>
        </button>
      </div>
    </div>
  );
}
