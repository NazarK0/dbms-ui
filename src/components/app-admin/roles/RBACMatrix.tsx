import { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Tabs } from '../../ui/tabs';
import {
  MatrixHeader,
  MatrixTabs,
  PermissionsTabContent,
  toggleCategory,
} from './rbac-matrix';
import {
  adminPermissions,
  adminRolesWithPermissions,
  userPermissions,
  userRolesWithPermissions,
} from '../../../mockData/admin';

export default function RBACMatrix() {
  const [expandedAdminCategories, setExpandedAdminCategories] = useState<
    Set<string>
  >(new Set());
  const [expandedUserCategories, setExpandedUserCategories] = useState<
    Set<string>
  >(new Set());

  const handleToggleAdminCategory = (category: string) => {
    setExpandedAdminCategories((prev) => toggleCategory(category, prev));
  };

  const handleToggleUserCategory = (category: string) => {
    setExpandedUserCategories((prev) => toggleCategory(category, prev));
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <MatrixHeader />
      <CardContent>
        <Tabs defaultValue="admin">
          <MatrixTabs
            adminCount={adminRolesWithPermissions.length}
            userCount={userRolesWithPermissions.length}
          />

          <PermissionsTabContent
            type="admin"
            permissionGroups={adminPermissions}
            roles={adminRolesWithPermissions}
            expandedCategories={expandedAdminCategories}
            onToggleCategory={handleToggleAdminCategory}
          />

          <PermissionsTabContent
            type="user"
            permissionGroups={userPermissions}
            roles={userRolesWithPermissions}
            expandedCategories={expandedUserCategories}
            onToggleCategory={handleToggleUserCategory}
          />
        </Tabs>
      </CardContent>
    </Card>
  );
}
