/**
 * Hook for permission handlers
 */

import type { User } from '../../../../../mockData/admin';
import type { PermissionCategory, PermissionsState } from '../types';
import { togglePermission, toggleCategoryPermissions } from '../utils/permissionUtils';

interface UsePermissionHandlersProps {
  permissions: PermissionsState;
  setPermissions: (permissions: PermissionsState) => void;
  expandedCategories: string[];
  setExpandedCategories: (categories: string[]) => void;
  permissionCategories: PermissionCategory[];
  user: User;
  onOpenChange: (open: boolean) => void;
}

export function usePermissionHandlers({
  permissions,
  setPermissions,
  expandedCategories,
  setExpandedCategories,
  permissionCategories,
  user,
  onOpenChange,
}: UsePermissionHandlersProps) {
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(
      expandedCategories.includes(categoryId) 
        ? expandedCategories.filter(id => id !== categoryId)
        : [...expandedCategories, categoryId]
    );
  };

  const handlePermissionChange = (permId: string) => {
    setPermissions(togglePermission(permId, permissions));
  };

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    setPermissions(toggleCategoryPermissions(categoryId, checked, permissionCategories, permissions));
  };

  const handleSave = () => {
    console.log('Saving user permissions:', { 
      userId: user.id, 
      permissions 
    });
    onOpenChange(false);
  };

  return {
    toggleCategory,
    handlePermissionChange,
    handleCategoryToggle,
    handleSave,
  };
}
