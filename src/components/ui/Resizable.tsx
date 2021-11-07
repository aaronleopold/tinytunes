import React, { forwardRef, HTMLProps, useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import clsx from 'clsx';

const DRAG_HANDLE_WIDTH = 4;

type ResizableProps = {
  defaultWidth?: number;
  leftConstraint?: number;
  rightConstraint?: number;
  dragTo?: 'left' | 'right';
  bg?: string;
} & HTMLProps<HTMLDivElement>;

const Resizable = forwardRef(
  (
    {
      defaultWidth = 300,
      leftConstraint,
      rightConstraint,
      dragTo = 'right',
      bg = 'bg-gray-50 dark:bg-gray-800',
      children,
      ...rest
    }: ResizableProps,
    ref
  ) => {
    const x = useMotionValue(dragTo === 'right' ? defaultWidth : 0);
    const width = useTransform(x, x => {
      if (dragTo === 'right') {
        return `${x + 0.5 * DRAG_HANDLE_WIDTH}px`;
      } else {
        return `${defaultWidth - (x - 0.5)}px`;
      }
    });

    const [startOffset, setStartOffset] = useState(0);

    function onPan(_event: any, info: PanInfo) {
      if (dragTo === 'left') {
        x.set(startOffset + info.offset.x);
      }
    }

    function onPanEnd(_event: any, info: PanInfo) {
      if (dragTo === 'left') {
        setStartOffset(startOffset + info.offset.x);
      }
    }

    function getConstraints() {
      if (dragTo === 'left') {
        return {
          left: defaultWidth + (leftConstraint ?? 200),
          right: defaultWidth - (rightConstraint ?? 50)
        };
      } else {
        return {
          left: defaultWidth - (leftConstraint ?? 50),
          right: defaultWidth + (rightConstraint ?? 200)
        };
      }
    }

    function getStyle() {
      let base = {
        x,
        width: DRAG_HANDLE_WIDTH + 'px',
        transition: 'background 0.2s'
      } as any;

      if (dragTo === 'left') {
        delete base.x;
      }

      return base;
    }

    return (
      <div className={clsx('relative flex h-full w-full', bg)}>
        <motion.div
          className="absolute cursor-col-resize h-full bg-gray-85 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:active:bg-gray-300 active:bg-gray-500"
          title="Drag to resize"
          dragMomentum={false}
          drag={dragTo === 'right' && 'x'}
          dragConstraints={getConstraints()}
          onPan={onPan}
          onPanEnd={onPanEnd}
          style={getStyle()}
        />

        <motion.div
          className="h-full w-full"
          style={{ width }}
          // @ts-ignore
          ref={ref}
          {...rest}
        >
          <div className="h-full">{children}</div>
        </motion.div>
      </div>
    );
  }
);

export default Resizable;
