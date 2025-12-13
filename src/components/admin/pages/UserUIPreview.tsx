import { useState } from 'react';
import {
  PreviewHeader,
  PreviewWindow,
  PermissionsPanel,
  userRoles,
  deviceSizes,
  getPermissionsForRole,
  getRoleName,
  defaultDeviceType,
  defaultRole,
} from './user-ui-preview';
import type { DeviceType } from './user-ui-preview';

export default function UserUIPreview() {
  const [deviceType, setDeviceType] = useState<DeviceType>(defaultDeviceType);
  const [selectedRole, setSelectedRole] = useState(defaultRole);

  const currentPermissions = getPermissionsForRole(selectedRole);
  const roleName = getRoleName(selectedRole);
  const deviceSize = deviceSizes[deviceType];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PreviewHeader
        selectedRole={selectedRole}
        roles={userRoles}
        deviceType={deviceType}
        onRoleChange={setSelectedRole}
        onDeviceChange={setDeviceType}
      />

      {/* Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Window */}
        <div className="lg:col-span-2">
          <PreviewWindow
            deviceType={deviceType}
            deviceSize={deviceSize}
            selectedRole={selectedRole}
            roleName={roleName}
            permissions={currentPermissions}
          />
        </div>

        {/* Permissions Panel */}
        <div>
          <PermissionsPanel permissions={currentPermissions} />
        </div>
      </div>
    </div>
  );
}
