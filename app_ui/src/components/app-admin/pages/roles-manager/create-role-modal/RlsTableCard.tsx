import { Table2 } from 'lucide-react';
import { Switch } from '../../../../ui/switch';
import { Label } from '../../../../ui/label';
import RlsOperations from './RlsOperations';
import RlsExpressions from './RlsExpressions';
import { labels, tableDescriptions } from './data';
import type { RlsTableCardProps } from './types';

export default function RlsTableCard({
  tableName,
  policy,
  onPolicyChange,
  onToggle,
}: RlsTableCardProps) {
  return (
    <div className="border border-slate-200 rounded-lg bg-white">
      <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Table2 className="w-4 h-4 text-slate-600" />
          <div>
            <h5 className="text-slate-900">{tableName}</h5>
            <p className="text-xs text-slate-500">
              {tableDescriptions[tableName as keyof typeof tableDescriptions] ||
                'Таблиця бази даних'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Label
            htmlFor={`rls-${tableName}`}
            className="text-sm text-slate-600"
          >
            {policy.enabled ? labels.enabled : labels.disabled}
          </Label>
          <Switch
            id={`rls-${tableName}`}
            checked={policy.enabled}
            onCheckedChange={onToggle}
          />
        </div>
      </div>

      {policy.enabled && (
        <div className="p-4 space-y-4">
          <RlsOperations
            tableName={tableName}
            policy={policy}
            onPolicyChange={onPolicyChange}
          />
          <RlsExpressions
            tableName={tableName}
            policy={policy}
            onPolicyChange={onPolicyChange}
          />
        </div>
      )}
    </div>
  );
}
