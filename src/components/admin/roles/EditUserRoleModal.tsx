import { useState, useEffect } from 'react';
import { Save, Users, Eye, ShieldCheck, AlertTriangle, Table2, Key } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Switch } from '../../ui/switch';
import { Separator } from '../../ui/separator';
import { ScrollArea } from '../../ui/scroll-area';
import { Role } from './RoleCard';

interface EditUserRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
}

export default function EditUserRoleModal({ open, onOpenChange, role }: EditUserRoleModalProps) {
  const [roleName, setRoleName] = useState(role.name);
  const [roleDescription, setRoleDescription] = useState(role.description);
  
  const [uiDisplaySettings, setUiDisplaySettings] = useState({
    connectionStrings: false,
    internalTables: false,
  });

  const [rlsPolicies, setRlsPolicies] = useState<{[key: string]: {
    enabled: boolean;
    select: boolean;
    insert: boolean;
    update: boolean;
    delete: boolean;
    using: string;
    withCheck: string;
  }}>(
    {
      'users': {
        enabled: false,
        select: true,
        insert: false,
        update: false,
        delete: false,
        using: 'user_id = current_user_id()',
        withCheck: 'user_id = current_user_id()'
      },
      'orders': {
        enabled: false,
        select: true,
        insert: true,
        update: true,
        delete: false,
        using: 'company_id = current_user_company_id()',
        withCheck: 'company_id = current_user_company_id()'
      },
      'products': {
        enabled: false,
        select: true,
        insert: false,
        update: false,
        delete: false,
        using: 'is_public = true OR owner_id = current_user_id()',
        withCheck: 'owner_id = current_user_id()'
      },
      'audit_logs': {
        enabled: false,
        select: true,
        insert: false,
        update: false,
        delete: false,
        using: 'user_id = current_user_id() OR current_user_role() = \'admin\'',
        withCheck: 'false'
      }
    }
  );

  useEffect(() => {
    if (open) {
      setRoleName(role.name);
      setRoleDescription(role.description);
    }
  }, [open, role]);

  const handleUiDisplaySettingChange = (settingId: string) => {
    setUiDisplaySettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    console.log('Saving user role:', { roleName, roleDescription, uiDisplaySettings, rlsPolicies });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle>Редагувати користувацьку роль</DialogTitle>
              <DialogDescription>
                Змініть налаштування ролі, права доступу та видимість UI
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="role-name">Назва ролі</Label>
                <Input 
                  id="role-name" 
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Наприклад: Business User" 
                  className="mt-2" 
                />
              </div>
              <div>
                <Label htmlFor="role-description">Опис ролі</Label>
                <Textarea 
                  id="role-description" 
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  placeholder="Опишіть призначення та обов'язки ролі..." 
                  className="mt-2" 
                />
              </div>
            </div>

            <Separator />

            {/* UI Display Settings - only 2 options for user roles */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-violet-600" />
                <div>
                  <h4 className="text-slate-900">Налаштування відображення інтерфейсу</h4>
                  <p className="text-sm text-slate-600">
                    Контроль видимості технічних деталей та розширеної інформації
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg border bg-violet-50/30 border-violet-200">
                {/* Connection Strings */}
                <div className="flex items-start justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-violet-300 transition-colors">
                  <div className="flex items-start gap-3 flex-1">
                    <Key className="w-4 h-4 text-slate-600 mt-1" />
                    <div>
                      <Label htmlFor="display-connectionStrings" className="text-sm text-slate-900 cursor-pointer">
                        Connection strings
                      </Label>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Рядки підключення до БД
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="display-connectionStrings"
                    checked={uiDisplaySettings.connectionStrings}
                    onCheckedChange={() => handleUiDisplaySettingChange('connectionStrings')}
                  />
                </div>

                {/* Internal Tables */}
                <div className="flex items-start justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-violet-300 transition-colors">
                  <div className="flex items-start gap-3 flex-1">
                    <Table2 className="w-4 h-4 text-slate-600 mt-1" />
                    <div>
                      <Label htmlFor="display-internalTables" className="text-sm text-slate-900 cursor-pointer">
                        Тимчасові таблиці
                      </Label>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Службові та тимчасові таблиці
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="display-internalTables"
                    checked={uiDisplaySettings.internalTables}
                    onCheckedChange={() => handleUiDisplaySettingChange('internalTables')}
                  />
                </div>
              </div>

              <div className="rounded-lg p-3 border bg-violet-50 border-violet-200">
                <p className="text-sm text-violet-900">
                  <strong>Рекомендація:</strong> Технічні деталі варто показувати тільки досвідченим користувачам для запобігання плутанини.
                </p>
              </div>
            </div>

            <Separator />

            {/* Row Level Security */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-violet-600" />
                <div>
                  <h4 className="text-slate-900">Row Level Security (RLS)</h4>
                  <p className="text-sm text-slate-600">
                    Обмеження доступу користувачів до даних на рівні рядків
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-900">
                  <strong>Важливо:</strong> RLS політики застосовуються на рівні PostgreSQL і обмежують доступ до даних незалежно від прав RBAC.
                </p>
              </div>

              <div className="space-y-3">
                {Object.entries(rlsPolicies).map(([tableName, policy]) => (
                  <div key={tableName} className="border border-slate-200 rounded-lg bg-white">
                    <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Table2 className="w-4 h-4 text-slate-600" />
                        <div>
                          <h5 className="text-slate-900">{tableName}</h5>
                          <p className="text-xs text-slate-500">Таблиця бази даних</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`rls-${tableName}`} className="text-sm text-slate-600">
                          {policy.enabled ? 'Увімкнено' : 'Вимкнено'}
                        </Label>
                        <Switch
                          id={`rls-${tableName}`}
                          checked={policy.enabled}
                          onCheckedChange={() => {
                            setRlsPolicies(prev => ({
                              ...prev,
                              [tableName]: { ...prev[tableName], enabled: !prev[tableName].enabled }
                            }));
                          }}
                        />
                      </div>
                    </div>
                    
                    {policy.enabled && (
                      <div className="p-4 space-y-4">
                        <div>
                          <Label className="text-sm text-slate-700 mb-2 block">Дозволені операції</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`${tableName}-select`}
                                checked={policy.select}
                                onCheckedChange={() => {
                                  setRlsPolicies(prev => ({
                                    ...prev,
                                    [tableName]: { ...prev[tableName], select: !prev[tableName].select }
                                  }));
                                }}
                              />
                              <Label htmlFor={`${tableName}-select`} className="text-sm cursor-pointer">SELECT</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`${tableName}-insert`}
                                checked={policy.insert}
                                onCheckedChange={() => {
                                  setRlsPolicies(prev => ({
                                    ...prev,
                                    [tableName]: { ...prev[tableName], insert: !prev[tableName].insert }
                                  }));
                                }}
                              />
                              <Label htmlFor={`${tableName}-insert`} className="text-sm cursor-pointer">INSERT</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`${tableName}-update`}
                                checked={policy.update}
                                onCheckedChange={() => {
                                  setRlsPolicies(prev => ({
                                    ...prev,
                                    [tableName]: { ...prev[tableName], update: !prev[tableName].update }
                                  }));
                                }}
                              />
                              <Label htmlFor={`${tableName}-update`} className="text-sm cursor-pointer">UPDATE</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`${tableName}-delete`}
                                checked={policy.delete}
                                onCheckedChange={() => {
                                  setRlsPolicies(prev => ({
                                    ...prev,
                                    [tableName]: { ...prev[tableName], delete: !prev[tableName].delete }
                                  }));
                                }}
                              />
                              <Label htmlFor={`${tableName}-delete`} className="text-sm cursor-pointer">DELETE</Label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor={`${tableName}-using`} className="text-sm text-slate-700 mb-2 block">
                            USING вираз (SELECT/UPDATE/DELETE)
                          </Label>
                          <Textarea
                            id={`${tableName}-using`}
                            value={policy.using}
                            onChange={(e) => {
                              setRlsPolicies(prev => ({
                                ...prev,
                                [tableName]: { ...prev[tableName], using: e.target.value }
                              }));
                            }}
                            placeholder="Наприклад: user_id = current_user_id()"
                            className="font-mono text-sm"
                            rows={2}
                          />
                          <p className="text-xs text-slate-500 mt-1">SQL умова, яка визначає які рядки доступні для читання і модифікації</p>
                        </div>

                        <div>
                          <Label htmlFor={`${tableName}-check`} className="text-sm text-slate-700 mb-2 block">
                            WITH CHECK вираз (INSERT/UPDATE)
                          </Label>
                          <Textarea
                            id={`${tableName}-check`}
                            value={policy.withCheck}
                            onChange={(e) => {
                              setRlsPolicies(prev => ({
                                ...prev,
                                [tableName]: { ...prev[tableName], withCheck: e.target.value }
                              }));
                            }}
                            placeholder="Наприклад: company_id = current_user_company_id()"
                            className="font-mono text-sm"
                            rows={2}
                          />
                          <p className="text-xs text-slate-500 mt-1">SQL умова для перевірки нових або змінених рядків</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  <strong>Приклад:</strong> Для обмеження доступу до власних записів використовуйте: <code className="bg-white px-1 rounded">user_id = current_user_id()</code>
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Зберегти зміни
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
