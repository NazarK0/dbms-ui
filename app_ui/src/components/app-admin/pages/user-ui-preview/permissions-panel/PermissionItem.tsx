import { Badge } from '../../../../ui/badge';
import { getPermissionBadgeVariant, getPermissionBadgeText } from './utils';


interface PermissionItemProps {
  label: string;
  enabled: boolean;
}

export default function PermissionItem({ label, enabled }: PermissionItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
      <span className="text-sm text-slate-900">{label}</span>
      <Badge variant={getPermissionBadgeVariant(enabled)}>
        {getPermissionBadgeText(enabled)}
      </Badge>
    </div>
  );
}
