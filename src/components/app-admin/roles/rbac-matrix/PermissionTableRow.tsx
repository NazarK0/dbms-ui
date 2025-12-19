import { Checkbox } from '../../../ui/checkbox';
import RoleCell from './RoleCell';
import { getColorClasses } from './utils';
import type { RoleType, Permission, RoleWithPermissions } from './types';

interface PermissionTableRowProps {
  role: RoleWithPermissions;
  permissions: Permission[];
  type: RoleType;
  showLimitsColumn?: boolean;
  categoryName?: string;
}

export default function PermissionTableRow({
  role,
  permissions,
  type,
  showLimitsColumn = false,
  categoryName,
}: PermissionTableRowProps) {
  const colors = getColorClasses(type);
  const hoverBg = type === 'admin' ? 'hover:bg-lime-50/30' : 'hover:bg-violet-50/30';

  return (
    <tr className={`border-b border-slate-100 ${hoverBg}`}>
      <RoleCell roleName={role.name} roleColor={role.color} type={type} />
      {permissions.map((perm) => (
        <td key={perm.id} className="px-3 py-3 text-center">
          <div className="flex justify-center">
            <Checkbox
              checked={role.permissions[perm.id as keyof typeof role.permissions]}
              disabled={role.id === 'superadmin'}
              className={colors.checkboxChecked}
            />
          </div>
        </td>
      ))}
      {showLimitsColumn && categoryName === 'Обмеження' && (
        <td className="px-3 py-3 text-center">
          <div className="text-xs text-slate-600">
            {permissions.map((perm) => {
              if (perm.id === 'storage_limit' && role.limits?.storage)
                return role.limits.storage;
              if (perm.id === 'users_limit' && role.limits?.users)
                return role.limits.users;
              if (perm.id === 'requests_limit' && role.limits?.requests)
                return role.limits.requests;
              return null;
            })}
          </div>
        </td>
      )}
    </tr>
  );
}
