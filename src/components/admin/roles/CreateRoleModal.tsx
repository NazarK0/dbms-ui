import { useState } from 'react';
import { Dialog, DialogContent } from '../../ui/dialog';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import {
  RoleTypeSelector,
  BasicInfo,
  UiVisibilitySettings,
  UiDisplaySettings,
  RlsSettings,
  ModalHeader,
  ModalFooter,
  defaultUiSettings,
  defaultUiDisplaySettings,
  defaultRlsPolicies,
  uiMenuItems,
  updateUiSetting,
  updateUiDisplaySetting,
  toggleRlsPolicy,
  updateRlsPolicy,
} from './create-role-modal';
import type { CreateRoleModalProps, RlsPolicy } from './create-role-modal';

export default function CreateRoleModal({
  open,
  onOpenChange,
  roleType,
  onRoleTypeChange,
  editingRole,
}: CreateRoleModalProps) {
  const isEditMode = !!editingRole;

  const [uiSettings, setUiSettings] = useState(defaultUiSettings);
  const [uiDisplaySettings, setUiDisplaySettings] = useState(
    defaultUiDisplaySettings
  );
  const [rlsPolicies, setRlsPolicies] = useState(defaultRlsPolicies);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <ModalHeader isEditMode={isEditMode} />
        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Role Type Selection */}
            <RoleTypeSelector
              roleType={roleType}
              onRoleTypeChange={onRoleTypeChange}
            />

            <Separator />

            {/* Basic Info */}
            <BasicInfo roleType={roleType} />

            {roleType === 'admin' && (
              <>
                <Separator />

                {/* UI Visibility Settings */}
                <UiVisibilitySettings
                  uiSettings={uiSettings}
                  onSettingChange={handleUiSettingChange}
                  menuItems={uiMenuItems}
                />

                <Separator />
              </>
            )}

            {/* UI Display Settings - для всіх типів ролей */}
            <UiDisplaySettings
              roleType={roleType}
              uiDisplaySettings={uiDisplaySettings}
              onSettingChange={handleUiDisplaySettingChange}
            />

            {roleType === 'admin' && (
              <>
                <Separator />

                {/* Duplicate UI Visibility (from original) */}
                <UiVisibilitySettings
                  uiSettings={uiSettings}
                  onSettingChange={handleUiSettingChange}
                  menuItems={uiMenuItems}
                />

                <Separator />
              </>
            )}

            {/* Row Level Security - для всіх типів ролей */}
            <Separator />

            <RlsSettings
              roleType={roleType}
              rlsPolicies={rlsPolicies}
              onPolicyChange={handleRlsPolicyChange}
              onPolicyToggle={handleRlsPolicyToggle}
            />
          </div>
        </ScrollArea>
        <ModalFooter
          isEditMode={isEditMode}
          onCancel={() => onOpenChange(false)}
          onSave={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
