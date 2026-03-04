/**
 * Save Role Configuration Dialog
 * Allows saving current role configuration as a new custom role
 */

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../../../ui/dialog';
import { Button } from '../../../../../ui/button';
import { Input } from '../../../../../ui/input';
import { Label } from '../../../../../ui/label';
import { Textarea } from '../../../../../ui/textarea';
import { Badge } from '../../../../../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../ui/select';
import { Save, Sparkles } from 'lucide-react';
import type { RoleConfiguration, CustomRole } from './types';

interface SaveRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  configurations: RoleConfiguration[];
  onSave: (role: CustomRole) => void;
}

const COLOR_OPTIONS = [
  { value: 'from-violet-500 to-purple-600', label: 'Фіолетовий', preview: 'bg-gradient-to-r from-violet-500 to-purple-600' },
  { value: 'from-blue-500 to-cyan-600', label: 'Синій', preview: 'bg-gradient-to-r from-blue-500 to-cyan-600' },
  { value: 'from-indigo-500 to-violet-600', label: 'Індиго', preview: 'bg-gradient-to-r from-indigo-500 to-violet-600' },
  { value: 'from-pink-500 to-rose-600', label: 'Рожевий', preview: 'bg-gradient-to-r from-pink-500 to-rose-600' },
  { value: 'from-emerald-500 to-teal-600', label: 'Смарагдовий', preview: 'bg-gradient-to-r from-emerald-500 to-teal-600' },
  { value: 'from-amber-500 to-orange-600', label: 'Бурштиновий', preview: 'bg-gradient-to-r from-amber-500 to-orange-600' },
  { value: 'from-slate-400 to-slate-500', label: 'Сірий', preview: 'bg-gradient-to-r from-slate-400 to-slate-500' },
];

export default function SaveRoleDialog({
  open,
  onOpenChange,
  configurations,
  onSave,
}: SaveRoleDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);

  const handleSave = () => {
    if (!name.trim()) return;

    const newRole: CustomRole = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      color,
      configurations: configurations.filter(c => c.enabled),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCustom: true,
    };

    onSave(newRole);
    
    // Reset form
    setName('');
    setDescription('');
    setColor(COLOR_OPTIONS[0].value);
    onOpenChange(false);
  };

  const enabledConfigs = configurations.filter(c => c.enabled);
  const totalPermissions = enabledConfigs.reduce((sum, c) => {
    return sum + Object.values(c.permissions).filter(Boolean).length;
  }, 0);
  const totalRlsRules = enabledConfigs.reduce((sum, c) => {
    return sum + c.rlsRules.filter(r => r.enabled).length;
  }, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-600" />
            Зберегти як нову роль
          </DialogTitle>
          <DialogDescription>
            Створіть нову роль на основі поточної конфігурації
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label>Назва ролі</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Наприклад: Senior Data Analyst"
              className="text-sm"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Опис</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишіть призначення та можливості цієї ролі..."
              rows={3}
              className="text-sm resize-none"
            />
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label>Колір</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-4 rounded ${option.preview}`} />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Configuration Summary */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white">
                Включено ролей: {enabledConfigs.length}
              </Badge>
              <Badge variant="outline" className="bg-white">
                Дозволів: {totalPermissions}
              </Badge>
              <Badge variant="outline" className="bg-white">
                RLS правил: {totalRlsRules}
              </Badge>
            </div>

            {enabledConfigs.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs text-slate-600">Включені ролі:</div>
                <div className="flex flex-wrap gap-1">
                  {enabledConfigs.map((config) => (
                    <Badge key={config.roleId} variant="secondary" className="text-xs">
                      {config.roleName}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            <Save className="h-4 w-4 mr-2" />
            Зберегти роль
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
