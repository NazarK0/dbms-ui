import CategoryHeader from './CategoryHeader';
import PermissionTable from './PermissionTable';
import type { RoleType, PermissionGroup, RoleWithPermissions } from './types';

interface PermissionCategoryCardProps {
  group: PermissionGroup;
  roles: RoleWithPermissions[];
  type: RoleType;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function PermissionCategoryCard({
  group,
  roles,
  type,
  isExpanded,
  onToggle,
}: PermissionCategoryCardProps) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <CategoryHeader
        group={group}
        type={type}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      {isExpanded && <PermissionTable group={group} roles={roles} type={type} />}
    </div>
  );
}
