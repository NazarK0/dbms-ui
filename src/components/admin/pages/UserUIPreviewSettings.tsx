/**
 * UserUIPreview Settings Page
 * Contains all configuration options for preview
 */

import { useState } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Label } from '../../ui/label';
import { ArrowLeft, Eye, Save } from 'lucide-react';
import {
  RolePermissionMapper,
  RoleSyncIndicator,
  DeviceSelector,
  UserSelector,
} from './user-ui-preview';
import PreviewModeSelector from './user-ui-preview/PreviewModeSelector';
import UserLookupPanel from './user-ui-preview/UserLookupPanel';
import type { PreviewMode } from './user-ui-preview/PreviewModeSelector';
import type { DeviceType } from './user-ui-preview';
import type { RoleConfiguration, CustomRole } from './user-ui-preview/types-extended';

interface UserUIPreviewSettingsProps {
  // Mode settings
  previewMode: PreviewMode;
  onPreviewModeChange: (mode: PreviewMode) => void;
  
  // User settings
  username: string;
  userId: string;
  onUsernameChange: (username: string) => void;
  onUserIdChange: (userId: string) => void;
  
  // Device settings
  deviceType: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  
  // Role settings (for manual mode)
  selectedRoleIds: string[];
  roleConfigurations: Record<string, RoleConfiguration>;
  customRoles: CustomRole[];
  onRoleToggle: (roleId: string) => void;
  onConfigurationChange: (roleId: string, config: RoleConfiguration) => void;
  onCustomRoleSave: (role: CustomRole) => void;
  
  // Navigation
  onBack: () => void;
}

export default function UserUIPreviewSettings({
  previewMode,
  onPreviewModeChange,
  username,
  userId,
  onUsernameChange,
  onUserIdChange,
  deviceType,
  onDeviceChange,
  selectedRoleIds,
  roleConfigurations,
  customRoles,
  onRoleToggle,
  onConfigurationChange,
  onCustomRoleSave,
  onBack,
}: UserUIPreviewSettingsProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleUserSelect = (selectedUserId: string, selectedUsername: string, userRoles: string[]) => {
    onUserIdChange(selectedUserId);
    onUsernameChange(selectedUsername);
    
    // Auto-select user's roles in manual configuration
    userRoles.forEach((roleId) => {
      if (!selectedRoleIds.includes(roleId)) {
        onRoleToggle(roleId);
      }
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      onBack();
    }, 500);
  };

  const getConfigSummary = () => {
    if (previewMode === 'user') {
      return userId ? `Користувач: ${username || userId}` : 'Користувач не обраний';
    } else {
      const count = selectedRoleIds.length;
      if (count === 0) return 'Ролі не обрані';
      if (count === 1) return '1 роль обрана';
      if (count < 5) return `${count} ролі обрані`;
      return `${count} ролей обрано`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-3 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Повернутись до preview
          </Button>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Eye className="h-6 w-6 text-lime-600" />
            Налаштування User UI Preview
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Налаштуйте параметри попереднього перегляду користувацького інтерфейсу
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            {getConfigSummary()}
          </Badge>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Збереження...' : 'Зберегти та повернутись'}
          </Button>
        </div>
      </div>

      {/* Mode Selector */}
      <PreviewModeSelector
        mode={previewMode}
        onModeChange={onPreviewModeChange}
      />

      {/* Configuration Based on Mode */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {previewMode === 'user' ? (
            /* User Lookup Mode */
            <UserLookupPanel onUserSelect={handleUserSelect} />
          ) : (
            /* Manual Configuration Mode */
            <>
              {/* Sync Indicator */}
              <RoleSyncIndicator rolePermissions={roleConfigurations} />

              {/* Role Configuration */}
              <RolePermissionMapper
                selectedRoleIds={selectedRoleIds}
                roleConfigurations={roleConfigurations}
                customRoles={customRoles}
                onRoleToggle={onRoleToggle}
                onConfigurationChange={onConfigurationChange}
                onCustomRoleSave={onCustomRoleSave}
              />
            </>
          )}
        </div>

        {/* Right Column - Additional Settings */}
        <div className="space-y-6">
          {/* Device Settings */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-900">
                Налаштування пристрою
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-slate-600">Тип пристрою</Label>
                <DeviceSelector
                  deviceType={deviceType}
                  onDeviceChange={onDeviceChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Manual User Info (Optional Override) */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-900">
                Інформація користувача
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UserSelector
                username={username}
                userId={userId}
                onUsernameChange={onUsernameChange}
                onUserIdChange={onUserIdChange}
              />
              <p className="text-xs text-slate-500 mt-2">
                {previewMode === 'user' 
                  ? 'Заповнюється автоматично при виборі користувача'
                  : 'Опціонально: для відображення в preview'
                }
              </p>
            </CardContent>
          </Card>

          {/* Info Panel */}
          <Card className="border-violet-200 bg-violet-50">
            <CardContent className="p-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-violet-900">Підказка</h4>
                <p className="text-xs text-violet-700 leading-relaxed">
                  {previewMode === 'user' ? (
                    <>
                      <strong>Режим користувача:</strong> Оберіть користувача зі списку.
                      Система автоматично завантажить його ролі та дозволи з Active Directory.
                    </>
                  ) : (
                    <>
                      <strong>Ручна конфігурація:</strong> Оберіть одну або декілька ролей,
                      налаштуйте дозволи та RLS правила. Можете зберегти конфігурацію як нову роль.
                    </>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}