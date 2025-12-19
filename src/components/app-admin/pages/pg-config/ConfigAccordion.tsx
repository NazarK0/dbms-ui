import { Accordion } from '../../../ui/accordion';
import { Card, CardContent } from '../../../ui/card';
import type { ConfigParam } from './types';
import { getCategories, getParamsByCategory } from './utils/filters';
import { ConfigAccordionHeader, ConfigCategoryItem } from './config-accordion';

interface ConfigAccordionProps {
  params: ConfigParam[];
  hasChanges: boolean;
  onParamChange?: (paramName: string, value: string) => void;
  onSave?: () => void;
  onReset?: () => void;
}

export default function ConfigAccordion({
  params,
  hasChanges,
  onParamChange,
  onSave,
  onReset,
}: ConfigAccordionProps) {
  const categories = getCategories(params);

  return (
    <Card className="border-slate-200 shadow-sm">
      <ConfigAccordionHeader
        hasChanges={hasChanges}
        onSave={onSave}
        onReset={onReset}
      />
      <CardContent>
        <Accordion type="multiple" defaultValue={[]} className="space-y-3">
          {categories.map((category) => {
            const categoryParams = getParamsByCategory(params, category);
            return (
              <ConfigCategoryItem
                key={category}
                category={category}
                params={categoryParams}
                onParamChange={onParamChange}
              />
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
