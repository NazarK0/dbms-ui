import UIHeader from './UIHeader';
import UINavigation from './UINavigation';
import UIContent from './UIContent';
import type { MockUserInterfaceProps } from './types';

export default function MockUserInterface({
  deviceType,
  selectedRole,
  roleName,
  permissions,
}: MockUserInterfaceProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <UIHeader deviceType={deviceType} roleName={roleName} />

      {/* Navigation */}
      <UINavigation deviceType={deviceType} permissions={permissions} />

      {/* Content */}
      <UIContent
        deviceType={deviceType}
        roleName={roleName}
        permissions={permissions}
      />
    </div>
  );
}
