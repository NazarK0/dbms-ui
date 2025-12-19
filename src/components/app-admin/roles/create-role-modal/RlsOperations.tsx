import { Checkbox } from '../../../ui/checkbox';
import { Label } from '../../../ui/label';
import { labels, operationLabels, gridLayouts } from './data';
import type { RlsOperationsProps } from './types';

export default function RlsOperations({
  tableName,
  policy,
  onPolicyChange,
}: RlsOperationsProps) {
  const operations: Array<{
    key: 'select' | 'insert' | 'update' | 'delete';
    label: string;
  }> = [
    { key: 'select', label: operationLabels.select },
    { key: 'insert', label: operationLabels.insert },
    { key: 'update', label: operationLabels.update },
    { key: 'delete', label: operationLabels.delete },
  ];

  return (
    <div>
      <Label className="text-sm text-slate-700 mb-2 block">
        {labels.allowedOperations}
      </Label>
      <div className={`grid ${gridLayouts.operations} gap-3`}>
        {operations.map((operation) => (
          <div key={operation.key} className="flex items-center gap-2">
            <Checkbox
              id={`${tableName}-${operation.key}`}
              checked={policy[operation.key]}
              onCheckedChange={() =>
                onPolicyChange({ [operation.key]: !policy[operation.key] })
              }
            />
            <Label
              htmlFor={`${tableName}-${operation.key}`}
              className="text-sm cursor-pointer"
            >
              {operation.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
