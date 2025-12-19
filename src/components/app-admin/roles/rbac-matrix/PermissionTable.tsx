import PermissionTableHeader from './PermissionTableHeader';
import PermissionTableRow from './PermissionTableRow';
import type { RoleType, PermissionGroup, RoleWithPermissions } from './types';

interface PermissionTableProps {
  group: PermissionGroup;
  roles: RoleWithPermissions[];
  type: RoleType;
}

export default function PermissionTable({
  group,
  roles,
  type,
}: PermissionTableProps) {
  const showLimitsColumn = type === 'user' && group.category === 'Обмеження';

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <PermissionTableHeader
          type={type}
          permissions={group.permissions}
          showLimitsColumn={showLimitsColumn}
        />
        <tbody>
          {roles.map((role) => (
            <PermissionTableRow
              key={role.id}
              role={role}
              permissions={group.permissions}
              type={type}
              showLimitsColumn={showLimitsColumn}
              categoryName={group.category}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
