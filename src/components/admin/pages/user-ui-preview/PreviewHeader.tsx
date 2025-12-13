import { Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import RoleSelector from './RoleSelector';
import DeviceSelector from './DeviceSelector';
import { headerTitle, headerDescription } from './data';
import type { PreviewHeaderProps } from './types';

export default function PreviewHeader({
  selectedRole,
  roles,
  deviceType,
  onRoleChange,
  onDeviceChange,
}: PreviewHeaderProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-lime-600" />
              {headerTitle}
            </CardTitle>
            <CardDescription>{headerDescription}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {/* Role Selector */}
          <RoleSelector
            selectedRole={selectedRole}
            roles={roles}
            onRoleChange={onRoleChange}
          />

          {/* Device Selector */}
          <DeviceSelector
            deviceType={deviceType}
            onDeviceChange={onDeviceChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
