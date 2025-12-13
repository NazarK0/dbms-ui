import { useState, useEffect } from 'react';
import { Save, UserCog, Users, Shield, Eye, Database, Activity, ChevronDown, ChevronRight, AlertTriangle, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { type User, commonTimezones, allTimezones } from '../../mockData/admin';

interface EditUserPermissionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  userType: 'admin' | 'user';
}

// Available roles
const adminRoles = [
  { value: 'superadmin', label: 'Superadmin', color: 'from-red-500 to-red-600' },
  { value: 'database-admin', label: 'Database Admin', color: 'from-lime-500 to-green-600' },
  { value: 'developer', label: 'Developer', color: 'from-yellow-500 to-lime-600' },
  { value: 'analyst', label: 'Analyst', color: 'from-green-500 to-lime-600' },
  { value: 'viewer', label: 'Viewer', color: 'from-lime-600 to-yellow-600' },
];

const userRoles = [
  { value: 'data-analyst', label: 'Data Analyst', color: 'from-violet-500 to-purple-600' },
  { value: 'content-manager', label: 'Content Manager', color: 'from-blue-500 to-cyan-600' },
  { value: 'report-viewer', label: 'Report Viewer', color: 'from-indigo-500 to-violet-600' },
  { value: 'guest-user', label: 'Guest User', color: 'from-slate-400 to-slate-500' },
];

// Permission categories for admin
const adminPermissionCategories = [
  {
    id: 'databases',
    label: 'Управління базами даних',
    icon: Database,
    permissions: [
      { id: 'db-view', label: 'Переглядати бази даних' },
      { id: 'db-create', label: 'Створювати бази даних' },
      { id: 'db-edit', label: 'Редагувати налаштування БД' },
      { id: 'db-delete', label: 'Видаляти бази даних' },
      { id: 'schema-view', label: 'Переглядати схеми' },
      { id: 'schema-manage', label: 'Управляти схемами' },
    ]
  },
  {
    id: 'tables',
    label: 'Управління таблицями',
    icon: Database,
    permissions: [
      { id: 'table-view', label: 'Переглядати таблиці' },
      { id: 'table-create', label: 'Створювати таблиці' },
      { id: 'table-edit', label: 'Редагувати структуру' },
      { id: 'table-delete', label: 'Видаляти таблиці' },
      { id: 'data-view', label: 'Переглядати дані' },
      { id: 'data-edit', label: 'Редагувати дані' },
    ]
  },
  {
    id: 'query',
    label: 'SQL запити',
    icon: Activity,
    permissions: [
      { id: 'query-select', label: 'Виконувати SELECT запити' },
      { id: 'query-insert', label: 'Виконувати INSERT запити' },
      { id: 'query-update', label: 'Виконувати UPDATE запити' },
      { id: 'query-delete', label: 'Виконувати DELETE запити' },
      { id: 'query-ddl', label: 'Виконувати DDL команди (CREATE, ALTER, DROP)' },
      { id: 'query-history', label: 'Переглядати історію запитів' },
    ]
  },
  {
    id: 'users',
    label: 'Управління користувачами',
    icon: UserCog,
    permissions: [
      { id: 'users-view', label: 'Переглядати користувачів' },
      { id: 'users-edit', label: 'Редагувати користувачів' },
      { id: 'users-roles', label: 'Призначати ролі' },
      { id: 'users-permissions', label: 'Налаштовувати права доступу' },
    ]
  },
  {
    id: 'system',
    label: 'Системні функції',
    icon: Shield,
    permissions: [
      { id: 'system-monitor', label: 'Моніторинг системи' },
      { id: 'system-config', label: 'Конфігурація PostgreSQL' },
      { id: 'system-backup', label: 'Резервне копіювання' },
      { id: 'system-restore', label: 'Відновлення БД' },
      { id: 'system-logs', label: 'Перегляд логів' },
      { id: 'system-clusters', label: 'Управління кластерами' },
    ]
  },
];

// Permission categories for users
const userPermissionCategories = [
  {
    id: 'content',
    label: 'Контент',
    icon: Eye,
    permissions: [
      { id: 'content-view', label: 'Переглядати контент' },
      { id: 'content-create', label: 'Створювати контент' },
      { id: 'content-edit', label: 'Редагувати контент' },
      { id: 'content-delete', label: 'Видаляти контент' },
    ]
  },
  {
    id: 'profile',
    label: 'Профіль',
    icon: Users,
    permissions: [
      { id: 'profile-view', label: 'Переглядати профіль' },
      { id: 'profile-edit', label: 'Редагувати профіль' },
      { id: 'profile-export', label: 'Експорт даних' },
    ]
  },
  {
    id: 'features',
    label: 'Функції застосунку',
    icon: Activity,
    permissions: [
      { id: 'feature-basic', label: 'Базові функції' },
      { id: 'feature-advanced', label: 'Розширені функції' },
      { id: 'feature-analytics', label: 'Аналітика' },
      { id: 'feature-export', label: 'Експорт даних' },
    ]
  },
];

export default function EditUserPermissionsModal({ open, onOpenChange, user, userType }: EditUserPermissionsModalProps) {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [timezoneSearchMode, setTimezoneSearchMode] = useState<'common' | 'all'>('common');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<{[key: string]: boolean}>({});

  const roles = userType === 'admin' ? adminRoles : userRoles;
  const permissionCategories = userType === 'admin' ? adminPermissionCategories : userPermissionCategories;
  const themeColor = userType === 'admin' ? 'lime' : 'violet';

  useEffect(() => {
    if (open) {
      // Initialize with current values
      setSelectedRole('');
      setSelectedTimezone(user.timezone || '');
      setTimezoneSearchMode('common');
      setExpandedCategories([]);
      // Initialize permissions based on role
      const initialPermissions: {[key: string]: boolean} = {};
      permissionCategories.forEach(category => {
        category.permissions.forEach(perm => {
          initialPermissions[perm.id] = false;
        });
      });
      setPermissions(initialPermissions);
    }
  }, [open, permissionCategories]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePermissionChange = (permId: string) => {
    setPermissions(prev => ({
      ...prev,
      [permId]: !prev[permId]
    }));
  };

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    const category = permissionCategories.find(c => c.id === categoryId);
    if (category) {
      const newPermissions = { ...permissions };
      category.permissions.forEach(perm => {
        newPermissions[perm.id] = checked;
      });
      setPermissions(newPermissions);
    }
  };

  const getCategoryProgress = (categoryId: string) => {
    const category = permissionCategories.find(c => c.id === categoryId);
    if (!category) return { enabled: 0, total: 0 };
    
    const enabled = category.permissions.filter(p => permissions[p.id]).length;
    const total = category.permissions.length;
    return { enabled, total };
  };

  const handleSave = () => {
    console.log('Saving user permissions:', { 
      userId: user.id, 
      role: selectedRole, 
      permissions 
    });
    onOpenChange(false);
  };

  const Icon = userType === 'admin' ? UserCog : Users;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${user.roleColor} rounded-full flex items-center justify-center text-white`}>
              {user.avatar}
            </div>
            <div>
              <DialogTitle>Налаштування прав доступу</DialogTitle>
              <DialogDescription>
                {user.name} • {user.email}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6 py-4">
            {/* Microsoft AD Warning */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-900">
                <strong>Примітка:</strong> Користувач синхронізований з Active Directory. Ви можете змінити роль та права доступу в системі, але базова інформація про обліковий запис керується через AD.
              </p>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${userType === 'admin' ? 'text-lime-600' : 'text-violet-600'}`} />
                <div>
                  <h4 className="text-slate-900">Призначити роль</h4>
                  <p className="text-sm text-slate-600">
                    Оберіть роль, яка визначає базовий набір прав доступу
                  </p>
                </div>
              </div>

              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className={`w-full ${selectedRole ? 'border-' + themeColor + '-300' : ''}`}>
                  <SelectValue placeholder="Оберіть роль..." />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 bg-gradient-to-br ${role.color} rounded-full`} />
                        {role.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedRole && (
                <div className={`rounded-lg p-3 border ${
                  userType === 'admin' 
                    ? 'bg-lime-50 border-lime-200' 
                    : 'bg-violet-50 border-violet-200'
                }`}>
                  <p className={`text-sm ${
                    userType === 'admin' ? 'text-lime-900' : 'text-violet-900'
                  }`}>
                    <strong>Роль обрано:</strong> {roles.find(r => r.value === selectedRole)?.label}. Налаштуйте детальні права доступу нижче.
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Timezone Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className={`w-5 h-5 ${userType === 'admin' ? 'text-lime-600' : 'text-violet-600'}`} />
                <div>
                  <h4 className="text-slate-900">Часовий пояс</h4>
                  <p className="text-sm text-slate-600">
                    Налаштування часового поясу для відображення дати та часу
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant={timezoneSearchMode === 'common' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimezoneSearchMode('common')}
                    className={timezoneSearchMode === 'common' ? `bg-gradient-to-r ${
                      userType === 'admin'
                        ? 'from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700'
                        : 'from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700'
                    }` : ''}
                  >
                    Поширені
                  </Button>
                  <Button
                    type="button"
                    variant={timezoneSearchMode === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimezoneSearchMode('all')}
                    className={timezoneSearchMode === 'all' ? `bg-gradient-to-r ${
                      userType === 'admin'
                        ? 'from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700'
                        : 'from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700'
                    }` : ''}
                  >
                    Всі часові пояси
                  </Button>
                </div>

                <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                  <SelectTrigger className={`w-full ${selectedTimezone ? 'border-' + themeColor + '-300' : ''}`}>
                    <SelectValue placeholder="Оберіть часовий пояс..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {(timezoneSearchMode === 'common' ? commonTimezones : allTimezones).map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedTimezone && (
                  <div className={`rounded-lg p-3 border ${
                    userType === 'admin' 
                      ? 'bg-lime-50 border-lime-200' 
                      : 'bg-violet-50 border-violet-200'
                  }`}>
                    <p className={`text-sm ${
                      userType === 'admin' ? 'text-lime-900' : 'text-violet-900'
                    }`}>
                      <strong>Поточний час:</strong> {new Date().toLocaleString('uk-UA', { timeZone: selectedTimezone })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Granular Permissions */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className={`w-5 h-5 ${userType === 'admin' ? 'text-lime-600' : 'text-violet-600'}`} />
                <div>
                  <h4 className="text-slate-900">Детальні права доступу</h4>
                  <p className="text-sm text-slate-600">
                    Точне налаштування дозволів для цього користувача
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {permissionCategories.map((category) => {
                  const Icon = category.icon;
                  const isExpanded = expandedCategories.includes(category.id);
                  const progress = getCategoryProgress(category.id);
                  const allEnabled = progress.enabled === progress.total;
                  const someEnabled = progress.enabled > 0 && progress.enabled < progress.total;

                  return (
                    <div key={category.id} className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                      <div 
                        className={`p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${
                          isExpanded ? 'border-b border-slate-200' : ''
                        }`}
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            userType === 'admin' 
                              ? 'bg-lime-100' 
                              : 'bg-violet-100'
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              userType === 'admin' ? 'text-lime-600' : 'text-violet-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h5 className="text-slate-900">{category.label}</h5>
                              <Badge variant="secondary" className="text-xs">
                                {progress.enabled}/{progress.total}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {progress.enabled === 0 && 'Немає активних дозволів'}
                              {progress.enabled > 0 && progress.enabled < progress.total && `${progress.enabled} з ${progress.total} активні`}
                              {progress.enabled === progress.total && 'Всі дозволи активні'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={allEnabled}
                            onCheckedChange={(checked) => {
                              handleCategoryToggle(category.id, checked as boolean);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 bg-slate-50/50 space-y-3">
                          {category.permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                              <Label htmlFor={permission.id} className="text-sm text-slate-900 cursor-pointer flex-1">
                                {permission.label}
                              </Label>
                              <Checkbox
                                id={permission.id}
                                checked={permissions[permission.id] || false}
                                onCheckedChange={() => handlePermissionChange(permission.id)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={`rounded-lg p-3 border ${
                userType === 'admin' 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-sm ${
                  userType === 'admin' ? 'text-amber-900' : 'text-blue-900'
                }`}>
                  <strong>Порада:</strong> Натисніть на категорію, щоб розгорнути детальні права. Використовуйте чекбокс біля назви категорії для швидкого вибору всіх дозволів.
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
            className={`bg-gradient-to-r ${
              userType === 'admin'
                ? 'from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700'
                : 'from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700'
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            Зберегти зміни
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}