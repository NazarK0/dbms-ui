/**
 * RoleManager Component
 * Manages the list of roles available for User UI Preview
 * Allows adding, editing, and removing preview roles
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../ui/dialog';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import type { UserRole } from './types';
import { toast } from 'sonner@2.0.3';

interface RoleManagerProps {
  roles: UserRole[];
  onRolesChange: (roles: UserRole[]) => void;
}

interface RoleFormData {
  id: string;
  name: string;
  color: string;
}

const colorOptions = [
  { value: 'from-violet-500 to-purple-600', label: 'Фіолетовий', preview: 'bg-violet-500' },
  { value: 'from-blue-500 to-cyan-600', label: 'Синій', preview: 'bg-blue-500' },
  { value: 'from-indigo-500 to-violet-600', label: 'Індиго', preview: 'bg-indigo-500' },
  { value: 'from-green-500 to-emerald-600', label: 'Зелений', preview: 'bg-green-500' },
  { value: 'from-yellow-500 to-orange-600', label: 'Жовтий', preview: 'bg-yellow-500' },
  { value: 'from-red-500 to-pink-600', label: 'Червоний', preview: 'bg-red-500' },
  { value: 'from-pink-500 to-rose-600', label: 'Рожевий', preview: 'bg-pink-500' },
  { value: 'from-orange-500 to-amber-600', label: 'Помаранчевий', preview: 'bg-orange-500' },
  { value: 'from-teal-500 to-cyan-600', label: 'Бірюзовий', preview: 'bg-teal-500' },
  { value: 'from-slate-400 to-slate-500', label: 'Сірий', preview: 'bg-slate-400' },
];

export default function RoleManager({ roles, onRolesChange }: RoleManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState<RoleFormData>({
    id: '',
    name: '',
    color: colorOptions[0].value,
  });

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      color: colorOptions[0].value,
    });
    setEditingRole(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (role: UserRole) => {
    setEditingRole(role);
    setFormData({
      id: role.id,
      name: role.name,
      color: role.color,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setTimeout(resetForm, 200);
  };

  const generateRoleId = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error('Помилка', { description: 'Введіть назву ролі' });
      return;
    }

    const roleId = editingRole ? formData.id : generateRoleId(formData.name);

    // Check for duplicate ID (only for new roles or if ID changed)
    if (!editingRole || roleId !== editingRole.id) {
      const isDuplicate = roles.some((r) => r.id === roleId);
      if (isDuplicate) {
        toast.error('Помилка', {
          description: 'Роль з таким ідентифікатором вже існує',
        });
        return;
      }
    }

    const roleData: UserRole = {
      id: roleId,
      name: formData.name.trim(),
      color: formData.color,
    };

    let newRoles: UserRole[];
    if (editingRole) {
      // Update existing role
      newRoles = roles.map((r) => (r.id === editingRole.id ? roleData : r));
      toast.success('Успіх', { description: 'Роль оновлено' });
    } else {
      // Add new role
      newRoles = [...roles, roleData];
      toast.success('Успіх', { description: 'Роль додано' });
    }

    onRolesChange(newRoles);
    closeDialog();
  };

  const handleDelete = (roleId: string) => {
    if (roles.length <= 1) {
      toast.error('Помилка', {
        description: 'Неможливо видалити останню роль',
      });
      return;
    }

    if (!confirm('Ви впевнені, що хочете видалити цю роль?')) {
      return;
    }

    const newRoles = roles.filter((r) => r.id !== roleId);
    onRolesChange(newRoles);
    toast.success('Успіх', { description: 'Роль видалено' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-slate-900">Управління ролями</h3>
          <p className="text-sm text-slate-500">
            Налаштуйте список ролей для попереднього перегляду
          </p>
        </div>
        <Button onClick={openCreateDialog} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Додати роль
        </Button>
      </div>

      <div className="grid gap-2">
        {roles.map((role) => (
          <Card key={role.id} className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-slate-400" />
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${role.color}`}
                  />
                  <div>
                    <div className="font-medium text-slate-900">{role.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{role.id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(role)}
                    className="h-8 px-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(role.id)}
                    className="h-8 px-2 text-destructive hover:text-destructive"
                    disabled={roles.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingRole ? 'Редагувати роль' : 'Створити роль'}
            </DialogTitle>
            <DialogDescription>
              {editingRole
                ? 'Оновіть інформацію про роль'
                : 'Додайте нову роль для попереднього перегляду'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Назва ролі</Label>
              <Input
                id="role-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Наприклад: Developer, Data Analyst..."
                autoFocus
              />
              {formData.name && !editingRole && (
                <p className="text-xs text-slate-500">
                  ID: <span className="font-mono">{generateRoleId(formData.name)}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-color">Колір</Label>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: option.value })}
                    className={`h-10 rounded-lg bg-gradient-to-r ${option.value} transition-all ${
                      formData.color === option.value
                        ? 'ring-2 ring-offset-2 ring-slate-900 scale-110'
                        : 'hover:scale-105'
                    }`}
                    title={option.label}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Попередній перегляд</Label>
              <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                <Badge
                  className={`bg-gradient-to-r ${formData.color} text-white border-0`}
                >
                  {formData.name || 'Назва ролі'}
                </Badge>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Скасувати
            </Button>
            <Button onClick={handleSubmit}>
              {editingRole ? 'Зберегти' : 'Створити'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
