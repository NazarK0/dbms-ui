import { ShieldCheck, AlertTriangle } from 'lucide-react';
import RlsTableCard from './RlsTableCard';
import { sectionTitles, hints, alertStyles } from './data';
import { getRlsDescription } from './utils/textHelpers';
import type { RlsSettingsProps } from './types';

export default function RlsSettings({
  roleType,
  rlsPolicies,
  onPolicyChange,
  onPolicyToggle,
}: RlsSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-lime-600" />
        <div>
          <h4 className="text-slate-900">{sectionTitles.rls}</h4>
          <p className="text-sm text-slate-600">
            {getRlsDescription(roleType)}
          </p>
        </div>
      </div>

      <div className={`${alertStyles.warning.bg} border ${alertStyles.warning.border} rounded-lg p-3 flex items-start gap-2`}>
        <AlertTriangle className={`w-4 h-4 ${alertStyles.warning.icon} mt-0.5`} />
        <p className={`text-sm ${alertStyles.warning.text}`}>
          <strong>Важливо:</strong> {hints.rlsWarning}
        </p>
      </div>

      <div className="space-y-3">
        {Object.entries(rlsPolicies).map(([tableName, policy]) => (
          <RlsTableCard
            key={tableName}
            tableName={tableName}
            policy={policy}
            onPolicyChange={(updates) => onPolicyChange(tableName, updates)}
            onToggle={() => onPolicyToggle(tableName)}
          />
        ))}
      </div>

      <div className={`${alertStyles.info.bg} border ${alertStyles.info.border} rounded-lg p-3`}>
        <p className={`text-sm ${alertStyles.info.text}`}>
          <strong>Приклад:</strong> {hints.rlsExample}
        </p>
      </div>
    </div>
  );
}