import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import PermissionItem from './PermissionItem';
import { permissionConfigs, permissionsPanelTitle } from './data';
import type { PermissionsPanelProps } from './types';

export default function PermissionsPanel({
  permissions,
}: PermissionsPanelProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm text-slate-600">
          {permissionsPanelTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {permissionConfigs.map((config) => (
            <PermissionItem
              key={config.key}
              label={config.label}
              enabled={permissions[config.key]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
