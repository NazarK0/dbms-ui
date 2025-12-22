import { Dialog, DialogContent } from '../../../ui/dialog';
import { ScrollArea } from '../../../ui/scroll-area';
import { Separator } from '../../../ui/separator';
import type { Role } from './role-card/types';
import { EditableBasicInfo, EditModalHeader, EditModalFooter } from './shared';
import {
  UiDisplaySettings,
  RlsSettings,
  defaultUiDisplaySettings,
  defaultRlsPolicies,
  updateUiDisplaySetting,
  toggleRlsPolicy,
  updateRlsPolicy,
} from './create-role-modal';
import type { RlsPolicy } from './create-role-modal';
import { useEffect, useState } from 'react';

interface EditUserRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
}

export default function EditUserRoleModal({
  open,
  onOpenChange,
  role,
}: EditUserRoleModalProps) {
  const [roleName, setRoleName] = useState(role.name);
  const [roleDescription, setRoleDescription] = useState(role.description);
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
    console.log('Saving user role:', {
      roleName,
      roleDescription,
      uiDisplaySettings,
      rlsPolicies,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <EditModalHeader roleType="user" roleName={roleName} />
        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <EditableBasicInfo
              roleType="user"
              roleName={roleName}
              roleDescription={roleDescription}
              onNameChange={setRoleName}
              onDescriptionChange={setRoleDescription}
            />

            <Separator />

            {/* UI Display Settings - only 2 options for user roles */}
            <UiDisplaySettings
              roleType="user"
              uiDisplaySettings={uiDisplaySettings}
              onSettingChange={handleUiDisplaySettingChange}
            />

            <Separator />

            {/* Row Level Security */}
            <RlsSettings
              roleType="user"
              rlsPolicies={rlsPolicies}
              onPolicyChange={handleRlsPolicyChange}
              onPolicyToggle={handleRlsPolicyToggle}
            />
          </div>
        </ScrollArea>
        <EditModalFooter
          roleType="user"
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}