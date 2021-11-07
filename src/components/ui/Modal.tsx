import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useKeyboard from '../../hooks/useKeyboard';
import clsx from 'clsx';

export const MODAL_SIZES = {
  xs: 'max-w-md',
  sm: 'max-w-lg',
  md: 'max-w-xl',
  lg: 'max-w-2xl'
};

export interface ModalProps {
  title: string;
  size?: keyof typeof MODAL_SIZES;
  open: boolean;
  onClose(): void;
  initialFocus?: React.MutableRefObject<any>;
  children: React.ReactNode;
}

export default function Modal({
  title,
  size = 'sm',
  open,
  onClose,
  initialFocus,
  children
}: ModalProps) {
  const modalSize = MODAL_SIZES[size] ?? MODAL_SIZES.sm;

  useKeyboard('Escape', onClose);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={initialFocus}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0-safe bg-gray-500 bg-opacity-75 transition-opacity rounded-b-xl overflow-hidden" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={clsx(
                modalSize,
                'inline-block align-bottom bg-white dark:bg-theme-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full sm:p-6'
              )}
            >
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50"
                >
                  {title}
                </Dialog.Title>
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

interface ModalContentProps {
  children: React.ReactNode;
  flex?: 'col' | 'row';
}

function ModalContent({ children, flex }: ModalContentProps) {
  return (
    <div
      className={clsx(
        flex === 'col' && 'flex flex-col space-y-4',
        flex === 'row' && 'flex flex-row space-x-4',
        'py-2 text-center sm:mt-0 sm:ml-4 sm:text-left leading-relaxed'
      )}
    >
      {children}
    </div>
  );
}

interface ModalFooterProps {
  children: React.ReactNode;
}

function ModalFooter({ children }: ModalFooterProps) {
  return <div className="mt-4 flex flex-row-reverse">{children}</div>;
}

Modal.Body = ModalContent;
Modal.Footer = ModalFooter;
