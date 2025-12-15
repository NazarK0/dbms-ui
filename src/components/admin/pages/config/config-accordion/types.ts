import type { ConfigParam } from '../types';

/**
 * Props for ConfigAccordionHeader component
 */
export interface ConfigAccordionHeaderProps {
  hasChanges: boolean;
  onSave?: () => void;
  onReset?: () => void;
}

/**
 * Props for ConfigCategoryItem component
 */
export interface ConfigCategoryItemProps {
  category: string;
  params: ConfigParam[];
  onParamChange?: (paramName: string, value: string) => void;
}

/**
 * Props for ConfigCategoryTrigger component
 */
export interface ConfigCategoryTriggerProps {
  category: string;
  count: number;
}

/**
 * Props for ConfigParamsTable component
 */
export interface ConfigParamsTableProps {
  params: ConfigParam[];
  onParamChange?: (paramName: string, value: string) => void;
}

/**
 * Props for ConfigParamRow component
 */
export interface ConfigParamRowProps {
  param: ConfigParam;
  onParamChange?: (paramName: string, value: string) => void;
}

/**
 * Props for individual cell components
 */
export interface ParamCellProps {
  param: ConfigParam;
}

export interface ParamValueCellProps {
  param: ConfigParam;
  onParamChange?: (paramName: string, value: string) => void;
}
