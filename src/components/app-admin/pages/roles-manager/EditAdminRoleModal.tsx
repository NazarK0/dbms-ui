import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '../../../ui/dialog';
import { ScrollArea } from '../../../ui/scroll-area';
import { Separator } from '../../../ui/separator';
import type { Role } from './role-card/types';
import { EditableBasicInfo, EditModalHeader, EditModalFooter } from './shared';
import {
  UiVisibilitySettings,
  UiDisplaySettings,
  RlsSettings,
  defaultUiSettings,
  defaultUiDisplaySettings,
  defaultRlsPolicies,
  uiMenuItems,
  updateUiSetting,
  updateUiDisplaySetting,
  toggleRlsPolicy,
  updateRlsPolicy,
} from './create-role-modal';
import type { RlsPolicy } from './create-role-modal';

interface EditAdminRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
}

export default function EditAdminRoleModal({
  open,
  onOpenChange,
  role,
}: EditAdminRoleModalProps) {
  const [roleName, setRoleName] = useState(role.name);
  const [roleDescription, setRoleDescription] = useState(role.description);
  const [uiSettings, setUiSettings] = useState(defaultUiSettings);
  const [uiDisplaySettings, setUiDisplaySettings] = useState(
    defaultUiDisplaySettings
  );
  const [rlsPolicies, setRlsPolicies] = useState(defaultRlsPolicies);

  useEffect(() => {
    if (open) {
      setRoleName(role.name);
      setRoleDescription(role.description);
    }
  }, [open, role]);

  const handleUiSettingChange = (settingId: string) => {
    setUiSettings((prev) => updateUiSetting(prev, settingId));
  };

  const handleUiDisplaySettingChange = (settingId: string) => {
    setUiDisplaySettings((prev) => updateUiDisplaySetting(prev, settingId));
  };

  const handleRlsPolicyToggle = (tableName: string) => {
    setRlsPolicies((prev) => toggleRlsPolicy(prev, tableName));
  };

  const handleRlsPolicyChange = (
    tableName: string,
    updates: Partial<RlsPolicy>
  ) => {
    setRlsPolicies((prev) => updateRlsPolicy(prev, tableName, updates));
  };

  const handleSave = () => {
    console.log('Saving admin role:', {
      roleName,
      roleDescription,
      uiSettings,
      uiDisplaySettings,
      rlsPolicies,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <EditModalHeader roleType="admin" roleName={roleName} />
        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <EditableBasicInfo
              roleType="admin"
              roleName={roleName}
              roleDescription={roleDescription}
              onNameChange={setRoleName}
              onDescriptionChange={setRoleDescription}
            />

            <Separator />

            {/* UI Visibility Settings */}
            <UiVisibilitySettings
              uiSettings={uiSettings}
              onSettingChange={handleUiSettingChange}
              menuItems={uiMenuItems}
            />

            <Separator />

            {/* UI Display Settings */}
            <UiDisplaySettings
              roleType="admin"
              uiDisplaySettings={uiDisplaySettings}
              onSettingChange={handleUiDisplaySettingChange}
            />

            <Separator />

            {/* Row Level Security */}
            <RlsSettings
              roleType="admin"
              rlsPolicies={rlsPolicies}
              onPolicyChange={handleRlsPolicyChange}
              onPolicyToggle={handleRlsPolicyToggle}
            />
          </div>
        </ScrollArea>
        <EditModalFooter
          roleType="admin"
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}