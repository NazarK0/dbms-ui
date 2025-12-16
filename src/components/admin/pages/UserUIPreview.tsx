import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Settings, Eye } from 'lucide-react';
import {
  PreviewWindow,
  PermissionsPanel,
  deviceSizes,
  getPermissionsForRole,
  getRoleName,
  defaultDeviceType,
} from './user-ui-preview';
import UserUIPreviewSettings from './UserUIPreviewSettings';
import type { DeviceType } from './user-ui-preview';
import type { PreviewMode } from './user-ui-preview/PreviewModeSelector';
import type { RoleConfiguration, CustomRole } from './user-ui-preview/types-extended';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { userRoles } from '../../../mockData/admin/roles';

export default function UserUIPreview() {
  const [showSettings, setShowSettings] = useState(false);
  
  // Preview mode
  const [previewMode, setPreviewMode] = useLocalStorage<PreviewMode>(
    'admin-preview-mode',
    'manual'
  );
  
  const [deviceType, setDeviceType] = useState<DeviceType>(defaultDeviceType);
  const [username, setUsername] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  
  // Multi-role selection state
  const [selectedRoleIds, setSelectedRoleIds] = useLocalStorage<string[]>(
    'admin-preview-selected-roles',
    []
  );
  
  // Role configurations with permissions and RLS
  const [roleConfigurations, setRoleConfigurations] = useLocalStorage<Record<string, RoleConfiguration>>(
    'admin-preview-role-configurations',
    {}
  );

  // Custom saved roles
  const [customRoles, setCustomRoles] = useLocalStorage<CustomRole[]>(
    'admin-preview-custom-roles',
    []
  );

  // Deduplicate selectedRoleIds on mount to fix any corrupted data
  useEffect(() => {
    const uniqueIds = Array.from(new Set(selectedRoleIds));
    if (uniqueIds.length !== selectedRoleIds.length) {
      console.log('Deduplicating selectedRoleIds:', selectedRoleIds, '->', uniqueIds);
      setSelectedRoleIds(uniqueIds);
    }
  }, []);

  const getRoleIdFromName = (roleName: string): string => {
    return roleName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Initialize configurations for all system roles
  useEffect(() => {
    const allRoles = [...userRoles, ...customRoles];
    const newConfigs = { ...roleConfigurations };
    let hasChanges = false;

    allRoles.forEach((role) => {
      const roleId = 'isCustom' in role && role.isCustom 
        ? role.id 
        : getRoleIdFromName(role.name);
      
      if (!newConfigs[roleId]) {
        newConfigs[roleId] = {
          roleId,
          roleName: role.name,
          permissions: getPermissionsForRole(roleId),
          rlsRules: [],
          databases: [],
          enabled: false,
        };
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setRoleConfigurations(newConfigs);
    }
  }, [customRoles]);

  const handleRoleToggle = (roleId: string) => {
    const isSelected = selectedRoleIds.includes(roleId);
    const updatedSelection = isSelected
      ? selectedRoleIds.filter((id) => id !== roleId)
      : [...selectedRoleIds, roleId];
    
    // Deduplicate the array to prevent duplicates
    const uniqueSelection = Array.from(new Set(updatedSelection));
    setSelectedRoleIds(uniqueSelection);

    // Update configuration enabled state
    const updatedConfigs = { ...roleConfigurations };
    if (updatedConfigs[roleId]) {
      updatedConfigs[roleId].enabled = !isSelected;
      setRoleConfigurations(updatedConfigs);
    }
  };

  const handleConfigurationChange = (roleId: string, config: RoleConfiguration) => {
    setRoleConfigurations({
      ...roleConfigurations,
      [roleId]: config,
    });
  };

  const handleCustomRoleSave = (role: CustomRole) => {
    setCustomRoles([...customRoles, role]);
    
    // Add configuration for the new custom role
    const newConfig: RoleConfiguration = {
      roleId: role.id,
      roleName: role.name,
      permissions: role.configurations[0]?.permissions || getPermissionsForRole(role.id),
      rlsRules: role.configurations[0]?.rlsRules || [],
      databases: role.configurations[0]?.databases || [],
      enabled: false,
    };
    
    setRoleConfigurations({
      ...roleConfigurations,
      [role.id]: newConfig,
    });
  };

  // Get the first selected role for preview
  const primaryRoleId = selectedRoleIds.length > 0 ? selectedRoleIds[0] : null;
  const primaryConfig = primaryRoleId ? roleConfigurations[primaryRoleId] : null;
  
  // Merge permissions from all selected roles
  const mergedPermissions = selectedRoleIds.reduce((acc, roleId) => {
    const config = roleConfigurations[roleId];
    if (config && config.enabled) {
      Object.keys(config.permissions).forEach((key) => {
        if (config.permissions[key]) {
          acc[key] = true;
        }
      });
    }
    return acc;
  }, {} as Record<string, boolean>);

  const roleName = primaryConfig?.roleName || 'Роль не обрана';
  const deviceSize = deviceSizes[deviceType];

  // Show settings page
  if (showSettings) {
    return (
      <UserUIPreviewSettings
        previewMode={previewMode}
        onPreviewModeChange={setPreviewMode}
        username={username}
        userId={userId}
        onUsernameChange={setUsername}
        onUserIdChange={setUserId}
        deviceType={deviceType}
        onDeviceChange={setDeviceType}
        selectedRoleIds={selectedRoleIds}
        roleConfigurations={roleConfigurations}
        customRoles={customRoles}
        onRoleToggle={handleRoleToggle}
        onConfigurationChange={handleConfigurationChange}
        onCustomRoleSave={handleCustomRoleSave}
        onBack={() => setShowSettings(false)}
      />
    );
  }

  // Main preview page
  return (
    <div className="space-y-6">
      {/* Header with Settings Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Eye className="h-6 w-6 text-lime-600" />
            User UI Preview
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Попередній перегляд користувацького інтерфейсу
            {username && <span className="text-violet-600 ml-2">• {username}</span>}
            {userId && !username && <span className="text-violet-600 ml-2">• {userId}</span>}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowSettings(true)}
          className="bg-white hover:bg-slate-50"
        >
          <Settings className="h-4 w-4 mr-2" />
          Налаштування
        </Button>
      </div>

      {/* Preview Area */}
      {primaryRoleId ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Window */}
          <div className="lg:col-span-2">
            <PreviewWindow
              deviceType={deviceType}
              deviceSize={deviceSize}
              selectedRole={primaryRoleId}
              roleName={roleName}
              permissions={mergedPermissions}
              username={username}
              userId={userId}
              onDeviceChange={setDeviceType}
            />
          </div>

          {/* Permissions Panel */}
          <div>
            <PermissionsPanel permissions={mergedPermissions} />
          </div>
        </div>
      ) : (
        <div className="p-8 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50">
          <Settings className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Налаштуйте preview
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Відкрийте налаштування та оберіть користувача або налаштуйте ролі вручну
          </p>
          <Button onClick={() => setShowSettings(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Відкрити налаштування
          </Button>
        </div>
      )}
    </div>
  );
}