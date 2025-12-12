import { useState } from 'react';
import { Plus, Users, UserCog, Eye, ShieldCheck, AlertTriangle, Table2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';

type RoleType = 'admin' | 'user';

interface CreateRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleType: RoleType;
  onRoleTypeChange: (type: RoleType) => void;
}

export default function CreateRoleModal({ open, onOpenChange, roleType, onRoleTypeChange }: CreateRoleModalProps) {
  const [uiSettings, setUiSettings] = useState({
    dashboard: true,
    databases: true,
    users: false,
    roles: false,
    query: true,
    performance: true,
    clusters: false,
    backups: true,
    logs: true,
    config: false,
  });

  const [rlsPolicies, setRlsPolicies] = useState<{[key: string]: {
    enabled: boolean;
    select: boolean;
    insert: boolean;
    update: boolean;
    delete: boolean;
    using: string;
    withCheck: string;
  }}>({
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
  });

  const uiMenuItems = [
    { id: 'dashboard', label: 'Панель управління', icon: Eye, description: 'Головний дашборд з метриками' },
    { id: 'databases', label: 'Бази даних', icon: Eye, description: 'Управління БД, схемами та таблицями' },
    { id: 'users', label: 'Користувачі', icon: Users, description: 'Керування користувачами системи' },
    { id: 'roles', label: 'Ролі', icon: UserCog, description: 'Управління ролями та правами доступу' },
    { id: 'query', label: 'SQL редактор', icon: Eye, description: 'Виконання SQL запитів' },
    { id: 'performance', label: 'Продуктивність', icon: Eye, description: 'Аналіз продуктивності БД' },
    { id: 'clusters', label: 'Кластери', icon: Eye, description: 'Управління реплікацією та кластерами' },
    { id: 'backups', label: 'Резервні копії', icon: Eye, description: 'Бекапи та відновлення' },
    { id: 'logs', label: 'Логи', icon: Eye, description: 'Системні логи та історія дій' },
    { id: 'config', label: 'Конфігурація', icon: Eye, description: 'Параметри PostgreSQL' },
  ];

  const handleUiSettingChange = (settingId: string) => {
    setUiSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId as keyof typeof prev]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Створити нову роль</DialogTitle>
          <DialogDescription>Налаштуйте назву, опис, права доступу та видимість UI</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Role Type Selection */}
            <div className="space-y-3">
              <Label className="text-slate-900">Тип ролі</Label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => onRoleTypeChange('user')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    roleType === 'user'
                      ? 'border-lime-500 bg-lime-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        roleType === 'user' ? 'border-lime-500' : 'border-slate-300'
                      }`}>
                        {roleType === 'user' && (
                          <div className="w-3 h-3 rounded-full bg-lime-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-5 h-5 text-violet-600" />
                        <span className="text-slate-900">Роль користувача</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Для кінцевих користувачів застосунку. Контролює доступ до функцій, квоти та можливості.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => onRoleTypeChange('admin')}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    roleType === 'admin'
                      ? 'border-lime-500 bg-lime-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        roleType === 'admin' ? 'border-lime-500' : 'border-slate-300'
                      }`}>
                        {roleType === 'admin' && (
                          <div className="w-3 h-3 rounded-full bg-lime-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <UserCog className="w-5 h-5 text-lime-600" />
                        <span className="text-slate-900">Роль адміністратора</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Для адміністраторів з доступом до панелі. Управління БД, SQL запити, системні налаштування.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="role-name">Назва ролі</Label>
                <Input 
                  id="role-name" 
                  placeholder={roleType === 'user' ? 'Наприклад: Business User' : 'Наприклад: Backend Developer'} 
                  className="mt-2" 
                />
              </div>
              <div>
                <Label htmlFor="role-description">Опис ролі</Label>
                <Textarea id="role-description" placeholder="Опишіть призначення та обов'язки ролі..." className="mt-2" />
              </div>
              <div>
                <Label htmlFor="base-role">Базувати на існуючій ролі</Label>
                <select id="base-role" className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500">
                  <option value="">Почати з порожніх прав</option>
                  {roleType === 'user' ? (
                    <>
                      <option value="premium">Premium User</option>
                      <option value="standard">Standard User</option>
                      <option value="free">Free User</option>
                    </>
                  ) : (
                    <>
                      <option value="developer">Developer</option>
                      <option value="analyst">Analyst</option>
                      <option value="viewer">Viewer</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {roleType === 'admin' && (
              <>
                <Separator />

                {/* UI Visibility Settings */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-lime-600" />
                    <div>
                      <h4 className="text-slate-900">Видимість інтерфейсу адмін-панелі</h4>
                      <p className="text-sm text-slate-600">Оберіть які розділи будуть доступні для цієї ролі</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {uiMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-lime-300 transition-colors">
                          <Checkbox
                            id={`ui-${item.id}`}
                            checked={uiSettings[item.id as keyof typeof uiSettings]}
                            onCheckedChange={() => handleUiSettingChange(item.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor={`ui-${item.id}`} className="flex items-center gap-2 cursor-pointer">
                              <Icon className="w-4 h-4 text-slate-600" />
                              <span className="text-slate-900">{item.label}</span>
                            </Label>
                            <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900">
                      <strong>Примітка:</strong> Навіть якщо розділ видимий, фактичні можливості користувача будуть обмежені правами доступу RBAC.
                    </p>
                  </div>
                </div>

                <Separator />
              </>
            )}

            {/* Row Level Security - для всіх типів ролей */}
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-lime-600" />
                <div>
                  <h4 className="text-slate-900">Row Level Security (RLS)</h4>
                  <p className="text-sm text-slate-600">
                    {roleType === 'admin' 
                      ? 'Налаштуйте політики безпеки на рівні рядків для таблиць'
                      : 'Обмеження доступу користувачів до даних на рівні рядків'
                    }
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
          <Button onClick={() => onOpenChange(false)}>
            <Plus className="w-4 h-4 mr-2" />
            Створити роль
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}