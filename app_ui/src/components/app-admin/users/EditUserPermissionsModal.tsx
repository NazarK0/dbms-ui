import { Save } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { ScrollArea } from '../../ui/scroll-area';
import {
  ADWarning,
  DialogHeaderUser,
  RoleSelector,
  TimezoneSelector,
  PermissionsCategoriesList,
} from './edit-user-permissions';
import { usePermissionsState, usePermissionHandlers } from './edit-user-permissions';
import { getRolesByUserType, getPermissionCategoriesByUserType } from './edit-user-permissions';
import { getThemeColor, getButtonGradient } from './edit-user-permissions';
import { getCategoryProgress as getCategoryProgressUtil } from './edit-user-permissions';
import type { EditUserPermissionsModalProps } from './edit-user-permissions';

export default function EditUserPermissionsModal({ 
  open, 
  onOpenChange, 
  user, 
  userType 
}: EditUserPermissionsModalProps) {
  // Get roles and categories based on user type
  const roles = getRolesByUserType(userType);
  const permissionCategories = getPermissionCategoriesByUserType(userType);
  const themeColor = getThemeColor(userType);

  // State management
  const {
    selectedRole,
    setSelectedRole,
    selectedTimezone,
    setSelectedTimezone,
    expandedCategories,
    setExpandedCategories,
    permissions,
    setPermissions,
  } = usePermissionsState({ open, permissionCategories });

  // Handlers
  const {
    toggleCategory,
    handlePermissionChange,
    handleCategoryToggle,
    handleSave,
  } = usePermissionHandlers({
    permissions,
    setPermissions,
    expandedCategories,
    setExpandedCategories,
    permissionCategories,
    user,
    onOpenChange,
  });

  // Get category progress function
  const getCategoryProgress = (categoryId: string) => {
    return getCategoryProgressUtil(categoryId, permissionCategories, permissions);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogHeaderUser user={user} />
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Microsoft AD Warning */}
            <ADWarning />

            {/* Role Selection */}
            <RoleSelector
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
              roles={roles}
              userType={userType}
              themeColor={themeColor}
            />

            <Separator />

            {/* Timezone Selection */}
            <TimezoneSelector
              selectedTimezone={selectedTimezone}
              onTimezoneChange={setSelectedTimezone}
              userType={userType}
              themeColor={themeColor}
            />

            <Separator />

            {/* Granular Permissions */}
            <PermissionsCategoriesList
              categories={permissionCategories}
              permissions={permissions}
              expandedCategories={expandedCategories}
              userType={userType}
              onPermissionChange={handlePermissionChange}
              onCategoryToggle={handleCategoryToggle}
              onToggleCategory={toggleCategory}
              getCategoryProgress={getCategoryProgress}
            />
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button 
            onClick={handleSave}
            className={`bg-gradient-to-r ${getButtonGradient(userType)}`}
          >
            <Save className="w-4 h-4 mr-2" />
            Зберегти зміни
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
