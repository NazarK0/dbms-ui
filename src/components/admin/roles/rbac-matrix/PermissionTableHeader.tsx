import { UserCog, Users } from 'lucide-react';
import { getColorClasses, getRoleTypeLabel } from './utils';
import type { RoleType, Permission } from './types';

interface PermissionTableHeaderProps {
  type: RoleType;
  permissions: Permission[];
  showLimitsColumn?: boolean;
}

export default function PermissionTableHeader({
  type,
  permissions,
  showLimitsColumn = false,
}: PermissionTableHeaderProps) {
  const colors = getColorClasses(type);
  const Icon = type === 'admin' ? UserCog : Users;

  return (
    <thead
      className={`bg-gradient-to-r ${colors.bgGradient} border-b ${colors.border}`}
    >
      <tr>
        <th
          className={`px-4 py-2 text-left text-xs text-slate-600 w-48 sticky left-0 bg-gradient-to-r ${colors.bgGradient}`}
        >
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${colors.iconColor}`} />
            <span>{getRoleTypeLabel(type)}</span>
          </div>
        </th>
        {permissions.map((perm) => (
          <th
            key={perm.id}
            className="px-3 py-2 text-center text-xs text-slate-600 min-w-[90px]"
          >
            {perm.name}
          </th>
        ))}
        {showLimitsColumn && (
          <th className="px-3 py-2 text-center text-xs text-slate-600 min-w-[110px]">
            Значення
          </th>
        )}
      </tr>
    </thead>
  );
}
