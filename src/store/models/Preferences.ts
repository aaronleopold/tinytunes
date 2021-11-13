import { types } from 'mobx-state-tree';

type Dimensions = {
  [key: string]: {
    width: number;
    height: number;
  };
};

export const WINDOW_SIZES: Dimensions = {
  sm: {
    width: 400,
    height: 500
  },
  md: {
    width: 500,
    height: 600
  },
  lg: {
    width: 575,
    height: 650
  }
};

function formatDimension(size: { height: number; width: number }) {
  return `Width: ${size.width}px, Height: ${size.height}px`;
}

export const windowSizeSelections = [
  {
    label: 'Small',
    sublabel: formatDimension(WINDOW_SIZES.sm),
    value: 'sm'
  },
  {
    label: 'Medium',
    sublabel: formatDimension(WINDOW_SIZES.md),
    value: 'md'
  },
  {
    label: 'Large',
    sublabel: formatDimension(WINDOW_SIZES.lg),
    value: 'lg'
  }
];

// TODO: make theme configurable
export const Preferences = types
  .model({
    width: types.number,
    height: types.number,
    dark_theme: types.boolean,
    download_directory: types.optional(types.string, '')
  })
  .actions(self => ({
    setWindowSize(width: number, height: number) {
      self.width = width;
      self.height = height;
    }
  }));
