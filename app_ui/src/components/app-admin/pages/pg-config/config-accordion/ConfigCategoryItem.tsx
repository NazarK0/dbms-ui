import { AccordionContent, AccordionItem } from '../../../../ui/accordion';
import ConfigCategoryTrigger from './ConfigCategoryTrigger';
import ConfigParamsTable from './ConfigParamsTable';
import type { ConfigCategoryItemProps } from './types';

export default function ConfigCategoryItem({
  category,
  params,
  onParamChange,
}: ConfigCategoryItemProps) {
  return (
    <AccordionItem
      value={category}
      className="border border-slate-200 rounded-lg px-6 bg-white shadow-sm"
    >
      <ConfigCategoryTrigger category={category} count={params.length} />
      <AccordionContent className="pt-4">
        <ConfigParamsTable params={params} onParamChange={onParamChange} />
      </AccordionContent>
    </AccordionItem>
  );
}
