/**
 * Style constants - colors, layouts, and visual configurations
 */

// Color classes for different role types
export const colorClasses = {
  admin: {
    border: 'border-lime-500',
    bg: 'bg-lime-50',
    hover: 'hover:border-lime-300',
    icon: 'text-lime-600',
    radio: 'border-lime-500',
    radioFill: 'bg-lime-500',
  },
  user: {
    border: 'border-violet-500',
    bg: 'bg-violet-50',
    hover: 'hover:border-violet-300',
    icon: 'text-violet-600',
    radio: 'border-violet-500',
    radioFill: 'bg-violet-500',
  },
  neutral: {
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    hover: 'hover:border-slate-300',
    icon: 'text-slate-600',
    radio: 'border-slate-300',
  },
};

// Alert styles
export const alertStyles = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-900',
    icon: 'text-amber-600',
  },
  success: {
    bg: 'bg-lime-50',
    border: 'border-lime-200',
    text: 'text-lime-900',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-900',
  },
};

// Button styles
export const buttonStyles = {
  create: 'bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700',
  edit: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
};

// Grid layouts
export const gridLayouts = {
  roleTypes: 'grid-cols-2',
  uiMenu: 'grid-cols-1 md:grid-cols-2',
  displaySettings: 'grid-cols-1 md:grid-cols-2',
  operations: 'grid-cols-2 md:grid-cols-4',
};

// Icon sizes
export const iconSizes = {
  header: 'w-5 h-5',
  small: 'w-4 h-4',
  checkbox: 'w-4 h-4',
  radio: 'w-5 h-5',
  radioFill: 'w-3 h-3',
};
