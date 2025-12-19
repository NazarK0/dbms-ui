/**
 * RoleSyncIndicator Component
 * Shows visual indicator of role synchronization status
 * Displays count of system roles and configured preview roles
 */

import { Badge } from '../../../ui/badge';
import { Shield, Check } from 'lucide-react';
import { userRoles } from '../../../../mockData/admin/roles';
import type { RoleConfiguration } from './types-extended';

interface RoleSyncIndicatorProps {
  rolePermissions: Record<string, RoleConfiguration>;
}

export default function RoleSyncIndicator({ rolePermissions }: RoleSyncIndicatorProps) {
  const totalSystemRoles = userRoles.length;
  const configuredRoles = Object.keys(rolePermissions).length;
  const hasPermissions = (config: RoleConfiguration) => {
    return config && Object.values(config.permissions).some(Boolean);
  };
  const rolesWithPermissions = Object.values(rolePermissions).filter(hasPermissions).length;

  return (
    <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
      <Shield className="h-5 w-5 text-violet-600" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-900">Статус синхронізації ролей</span>
          {totalSystemRoles === configuredRoles && (
            <Check className="h-4 w-4 text-green-600" />
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-slate-600">
            {totalSystemRoles} системних ролей
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-600">
            {configuredRoles} налаштовано
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-600">
            {rolesWithPermissions} з дозволами
          </span>
        </div>
      </div>
      <Badge 
        variant={totalSystemRoles === configuredRoles ? 'default' : 'outline'}
        className={totalSystemRoles === configuredRoles ? 'bg-green-100 text-green-700' : ''}
      >
        {Math.round((configuredRoles / totalSystemRoles) * 100)}%
      </Badge>
    </div>
  );
}