/**
 * RolePermissionMapper Component
 * Maps system roles to preview RBAC permissions
 * Allows selecting multiple system roles and configuring their permissions and RLS rules
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Label } from '../../../ui/label';
import { Switch } from '../../../ui/switch';
import { ChevronDown, ChevronUp, Shield, Eye, Save, CheckSquare, Square } from 'lucide-react';
import { userRoles } from '../../../../mockData/admin/roles';
import type { Role } from '../../../../mockData/admin/roles';
import { permissionConfigs } from './data';
import RLSConfigPanel from './RLSConfigPanel';
import SaveRoleDialog from './SaveRoleDialog';
import type { RoleConfiguration, CustomRole, RLSRule } from './types-extended';

interface RolePermissionMapperProps {
  selectedRoleIds: string[];
  roleConfigurations: Record<string, RoleConfiguration>;
  customRoles: CustomRole[];
  onRoleToggle: (roleId: string) => void;
  onConfigurationChange: (roleId: string, config: RoleConfiguration) => void;
  onCustomRoleSave: (role: CustomRole) => void;
}

export default function RolePermissionMapper({
  selectedRoleIds,
  roleConfigurations,
  customRoles,
  onRoleToggle,
  onConfigurationChange,
  onCustomRoleSave,
}: RolePermissionMapperProps) {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const toggleExpand = (roleId: string) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const getRoleIdFromName = (roleName: string): string => {
    return roleName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handlePermissionToggle = (roleId: string, permissionKey: string) => {
    const currentConfig = roleConfigurations[roleId];
    const updatedPermissions = {
      ...currentConfig.permissions,
      [permissionKey]: !currentConfig.permissions[permissionKey],
    };
    onConfigurationChange(roleId, {
      ...currentConfig,
      permissions: updatedPermissions,
    });
  };

  const handleRLSChange = (roleId: string, rules: RLSRule[]) => {
    const currentConfig = roleConfigurations[roleId];
    onConfigurationChange(roleId, {
      ...currentConfig,
      rlsRules: rules,
    });
  };

  const handleDatabasesChange = (roleId: string, databases: string[]) => {
    const currentConfig = roleConfigurations[roleId];
    onConfigurationChange(roleId, {
      ...currentConfig,
      databases,
    });
  };

  const countPermissions = (roleId: string): { enabled: number; total: number } => {
    const config = roleConfigurations[roleId];
    if (!config) return { enabled: 0, total: permissionConfigs.length };
    const enabled = Object.values(config.permissions).filter(Boolean).length;
    const total = permissionConfigs.length;
    return { enabled, total };
  };

  // Combine system roles with custom roles
  const allRoles = [
    ...userRoles.map((role: Role) => ({
      ...role,
      id: getRoleIdFromName(role.name),
      isCustom: false,
    })),
    ...customRoles.map((role) => ({
      name: role.name,
      description: role.description,
      color: role.color,
      users: 0,
      badge: 'default' as const,
      type: 'user' as const,
      id: role.id,
      isCustom: true,
    })),
  ];

  const activeConfigurations = Object.values(roleConfigurations).filter(c => c.enabled);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-slate-900 mb-1">
            Вибір ролей та налаштування RLS
          </h3>
          <p className="text-sm text-slate-500">
            Оберіть одну або кілька ролей, налаштуйте права та збережіть як нову роль
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => setSaveDialogOpen(true)}
          disabled={selectedRoleIds.length === 0}
          className="bg-violet-600 hover:bg-violet-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Зберегти як роль
        </Button>
      </div>

      {/* Selection Summary */}
      {selectedRoleIds.length > 0 && (
        <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-violet-600">
                {selectedRoleIds.length} вибрано
              </Badge>
              <span className="text-sm text-slate-700">
                Налаштуйте права та RLS для кожної ролі
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Roles List */}
      <div className="space-y-2">
        {allRoles.map((role) => {
          const roleId = role.id;
          const isSelected = selectedRoleIds.includes(roleId);
          const isExpanded = expandedRole === roleId;
          const config = roleConfigurations[roleId];
          const stats = countPermissions(roleId);
          const percentage = stats.total > 0 ? Math.round((stats.enabled / stats.total) * 100) : 0;
          const rlsCount = config?.rlsRules.filter(r => r.enabled).length || 0;

          return (
            <Card
              key={roleId}
              className={`border-2 transition-all ${
                isSelected ? 'border-violet-400 bg-violet-50/50' : 'border-slate-200'
              }`}
            >
              <CardContent className="p-4">
                {/* Role Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => onRoleToggle(roleId)}
                      className="flex-shrink-0"
                    >
                      {isSelected ? (
                        <CheckSquare className="h-5 w-5 text-violet-600" />
                      ) : (
                        <Square className="h-5 w-5 text-slate-400" />
                      )}
                    </button>
                    <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${role.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{role.name}</span>
                        {isSelected && config.enabled && (
                          <Badge className="bg-violet-100 text-violet-700 border-violet-200">
                            <Eye className="h-3 w-3 mr-1" />
                            Активний
                          </Badge>
                        )}
                        {role.isCustom && (
                          <Badge variant="outline" className="text-xs">
                            Custom
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{role.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Shield className="h-3 w-3" />
                          {stats.enabled}/{stats.total} дозволів
                        </div>
                        {rlsCount > 0 && (
                          <>
                            <span className="text-slate-300">•</span>
                            <div className="text-xs text-violet-600">
                              {rlsCount} RLS правил
                            </div>
                          </>
                        )}
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden ml-2">
                          <div
                            className={`h-full bg-gradient-to-r ${role.color} transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(roleId)}
                        className="px-2"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Configuration Panel (Expanded) */}
                {isExpanded && isSelected && (
                  <div className="pt-3 border-t border-slate-200 space-y-4">
                    {/* Permissions Matrix */}
                    <div className="space-y-3">
                      <Label className="text-xs text-slate-600 uppercase">
                        Налаштування дозволів
                      </Label>
                      <div className="grid grid-cols-1 gap-2">
                        {permissionConfigs.map((permission) => {
                          const isEnabled = config?.permissions[permission.key] || false;
                          return (
                            <div
                              key={permission.key}
                              className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                            >
                              <div className="flex-1">
                                <div className="text-sm font-medium text-slate-900">
                                  {permission.label}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {permission.description}
                                </div>
                              </div>
                              <Switch
                                checked={isEnabled}
                                onCheckedChange={() =>
                                  handlePermissionToggle(roleId, permission.key)
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* RLS Configuration */}
                    <RLSConfigPanel
                      roleId={roleId}
                      roleName={role.name}
                      rules={config?.rlsRules || []}
                      databases={config?.databases || []}
                      onRulesChange={handleRLSChange}
                      onDatabasesChange={handleDatabasesChange}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedRoleIds.length === 0 && (
        <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Підказка:</strong> Оберіть одну або кілька ролей зі списку для налаштування
          </p>
        </div>
      )}

      {/* Save Role Dialog */}
      <SaveRoleDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        configurations={activeConfigurations}
        onSave={onCustomRoleSave}
      />
    </div>
  );
}