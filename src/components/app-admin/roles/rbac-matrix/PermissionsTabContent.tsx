import { TabsContent } from '../../../ui/tabs';
import PermissionCategoryCard from './PermissionCategoryCard';
import type { RoleType, PermissionGroup, RoleWithPermissions } from './types';

interface PermissionsTabContentProps {
  type: RoleType;
  permissionGroups: PermissionGroup[];
  roles: RoleWithPermissions[];
  expandedCategories: Set<string>;
  onToggleCategory: (category: string) => void;
}

export default function PermissionsTabContent({
  type,
  permissionGroups,
  roles,
  expandedCategories,
  onToggleCategory,
}: PermissionsTabContentProps) {
  const tabValue = type === 'admin' ? 'admin' : 'user';

  return (
    <TabsContent value={tabValue} className="space-y-3">
      {permissionGroups.map((group) => (
        <PermissionCategoryCard
          key={group.category}
          group={group}
          roles={roles}
          type={type}
          isExpanded={expandedCategories.has(group.category)}
          onToggle={() => onToggleCategory(group.category)}
        />
      ))}
    </TabsContent>
  );
}
