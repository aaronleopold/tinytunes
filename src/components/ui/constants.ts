export const FOCUS_STYLE = `
focus:outline-none

focus:ring-2 
focus:ring-offset-2
focus:ring-blue-500

dark:focus:ring-blue-500
dark:ring-offset-trout-900
`;

export const BUTTON_VARIANTS = {
  default: `
    bg-whtie
    border-gray-300
    text-gray-700

    hover:text-gray-900
    hover:bg-gray-100
    hover:border-gray-300
    
    active:bg-gray-200
    active:border-gray-200
    active:text-gray-600

    dark:bg-trout-700
    dark:border-trout-600
    dark:text-gray-200

    dark:hover:text-white
    dark:hover:bg-trout-700
    dark:hover:border-trout-400

    dark:active:bg-trout-600
    dark:active:border-trout-500
    dark:active:text-white
  `,
  primary: `
    bg-blue-500
    border-blue-400
    text-gray-50
   
    hover:bg-blue-600
    hover:border-blue-500
    
    dark:bg-blue-700
    dark:border-blue-600

    dark:hover:bg-blue-600
    dark:hover:border-blue-400
  `,
  // FIXME?
  secondary: `
    bg-blue-100
    border-blue-50
    text-blue-700

    hover:bg-blue-200
    hover:border-blue-100
  `,

  tiny: `
    relative 
    inline-flex items-center
    p-0.5 

    border border-gray-300
    bg-white 
    hover:bg-gray-100
    shadow-sm

    dark:border-trout-700
    dark:bg-trout-800
    dark:hover:bg-trout-700
    
    text-sm font-medium 
    text-gray-500 
    dark:text-gray-50 
    
    focus:z-10 focus:outline-none

    transition-colors duration-200
  `
};

export const BUTTON_SIZES = {
  xs: 'p-0.5',
  md: 'px-4 py-2 '
};

export const BUTTONGROUP_GAPS = {
  sm: 'space-y-2 sm:space-y-0 sm:space-x-2',
  md: 'space-y-3 sm:space-y-0 sm:space-x-3',
  lg: 'space-y-6 sm:space-y-0 sm:space-x-6'
};

export const CODE_SIZES = {
  sm: 'text-xs p-1',
  md: 'text-sm p-2',
  lg: 'text-lg p-2'
};

// focus:ring-2 focus:ring-offset-1
export const INPUT_VARIANTS = {
  default: `
    shadow-sm    
    bg-white
    border-gray-200
    dark:border-transparent

    placeholder-gray-400

    dark:bg-trout-800
    dark:border-trout-700

    dark:hover:bg-trout-700

    dark:placeholder-gray-300
    dark:text-white
  `
};
