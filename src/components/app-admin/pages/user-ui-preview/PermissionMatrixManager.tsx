/**
 * PermissionMatrixManager Component
 * Manages RBAC permission matrix for roles
 * Allows configuring which permissions each role has
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Switch } from '../../../ui/switch';
import { Label } from '../../../ui/label';
import { Settings, Save, RotateCcw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../ui/dialog';
import type { UserRole, RolePermissions } from './types';
import { permissionConfigs, rolePermissions as defaultRolePermissions } from './data';
import { toast } from 'sonner@2.0.3';

interface PermissionMatrixManagerProps {
  roles: UserRole[];
  rolePermissions: RolePermissions;
  onPermissionsChange: (permissions: RolePermissions) => void;
}

export default function PermissionMatrixManager({
  roles,
  rolePermissions,
  onPermissionsChange,
}: PermissionMatrixManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedPermissions, setEditedPermissions] = useState<RolePermissions>(rolePermissions);

  const openDialog = () => {
    setEditedPermissions(rolePermissions);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handlePermissionToggle = (roleId: string, permissionKey: string) => {
    setEditedPermissions({
      ...editedPermissions,
      [roleId]: {
        ...editedPermissions[roleId],
        [permissionKey]: !editedPermissions[roleId]?.[permissionKey],
      },
    });
  };

  const handleSave = () => {
    onPermissionsChange(editedPermissions);
    toast.success('Успіх', { description: 'Матрицю дозволів оновлено' });
    closeDialog();
  };

  const handleReset = () => {
    if (!confirm('Скинути всі налаштування до стандартних значень?')) {
      return;
    }
    setEditedPermissions(defaultRolePermissions);
    toast.info('Інформація', { description: 'Матрицю скинуто до стандартних значень' });
  };

  const countPermissions = (roleId: string): { enabled: number; total: number } => {
    const permissions = editedPermissions[roleId] || {};
    const enabled = Object.values(permissions).filter(Boolean).length;
    const total = permissionConfigs.length;
    return { enabled, total };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-slate-900">RBAC Матриця дозволів</h3>
          <p className="text-sm text-slate-500">
            Налаштуйте права доступу для кожної ролі
          </p>
        </div>
        <Button onClick={openDialog} size="sm" className="gap-2" variant="outline">
          <Settings className="h-4 w-4" />
          Налаштувати
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {roles.map((role) => {
          const stats = countPermissions(role.id);
          return (
            <Card key={role.id} className="border-slate-200">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className={`w-full h-2 rounded-full bg-gradient-to-r ${role.color}`} />
                  <div className="text-sm font-medium text-slate-900">{role.name}</div>
                  <div className="text-xs text-slate-500">
                    {stats.enabled} з {stats.total} дозволів
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Permission Matrix Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Налаштування матриці дозволів</DialogTitle>
            <DialogDescription>
              Увімкніть або вимкніть дозволи для кожної ролі
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Permission Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-slate-700">Дозвіл</th>
                    {roles.map((role) => (
                      <th key={role.id} className="text-center p-4 font-medium text-slate-700">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${role.color}`} />
                          <span className="text-xs">{role.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissionConfigs.map((permission, idx) => (
                    <tr
                      key={permission.key}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    >
                      <td className="p-4 border-b border-slate-100">
                        <div>
                          <div className="font-medium text-slate-900 text-sm">
                            {permission.label}
                          </div>
                          <div className="text-xs text-slate-500">
                            {permission.description}
                          </div>
                        </div>
                      </td>
                      {roles.map((role) => (
                        <td
                          key={role.id}
                          className="p-4 text-center border-b border-slate-100"
                        >
                          <div className="flex justify-center">
                            <Switch
                              checked={editedPermissions[role.id]?.[permission.key] || false}
                              onCheckedChange={() =>
                                handlePermissionToggle(role.id, permission.key)
                              }
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {roles.map((role) => {
                const stats = countPermissions(role.id);
                const percentage = Math.round((stats.enabled / stats.total) * 100);
                return (
                  <Card key={role.id} className="border-slate-200">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-700">
                            {role.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {percentage}%
                          </Badge>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${role.color} transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-500">
                          {stats.enabled} / {stats.total} дозволів
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleReset} className="gap-2 mr-auto">
              <RotateCcw className="h-4 w-4" />
              Скинути
            </Button>
            <Button variant="outline" onClick={closeDialog}>
              Скасувати
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Зберегти
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
