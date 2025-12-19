import { AccordionTrigger } from '../../../../ui/accordion';
import { Badge } from '../../../../ui/badge';
import { getCategoryIcon, getCategoryName, getCategoryColor } from '../utils/uiHelpers';
import type { ConfigCategoryTriggerProps } from './types';

export default function ConfigCategoryTrigger({ category, count }: ConfigCategoryTriggerProps) {
  const Icon = getCategoryIcon(category);
  const color = getCategoryColor(category);

  return (
    <AccordionTrigger className="hover:no-underline">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center gap-3">
          <h3 className="text-slate-900">{getCategoryName(category)}</h3>
          <Badge variant="secondary">{count}</Badge>
        </div>
      </div>
    </AccordionTrigger>
  );
}
