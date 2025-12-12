import { useState } from 'react';
import { Lock, UserCog, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

const adminPermissions = [
  {
    category: 'Управління БД',
    icon: '🗄️',
    permissions: [
      { id: 'db_create', name: 'Створення БД' },
      { id: 'db_delete', name: 'Видалення БД' },
      { id: 'db_modify', name: 'Модифікація БД' },
      { id: 'db_view', name: 'Перегляд БД' },
    ]
  },
  {
    category: 'Таблиці',
    icon: '📊',
    permissions: [
      { id: 'table_create', name: 'Створення' },
      { id: 'table_delete', name: 'Видалення' },
      { id: 'table_alter', name: 'Зміна структури' },
      { id: 'table_view', name: 'Перегляд схеми' },
    ]
  },
  {
    category: 'SQL',
    icon: '💻',
    permissions: [
      { id: 'sql_select', name: 'SELECT' },
      { id: 'sql_insert', name: 'INSERT' },
      { id: 'sql_update', name: 'UPDATE' },
      { id: 'sql_delete', name: 'DELETE' },
    ]
  },
  {
    category: 'Користувачі',
    icon: '👥',
    permissions: [
      { id: 'user_create', name: 'Створення' },
      { id: 'user_delete', name: 'Видалення' },
      { id: 'user_modify', name: 'Зміна' },
      { id: 'user_view', name: 'Перегляд' },
    ]
  },
  {
    category: 'Розширення',
    icon: '🔌',
    permissions: [
      { id: 'ext_install', name: 'Встановлення' },
      { id: 'func_create', name: 'Функції' },
      { id: 'trigger_create', name: 'Тригери' },
    ]
  },
  {
    category: 'Резервні копії',
    icon: '💾',
    permissions: [
      { id: 'backup_create', name: 'Створення' },
      { id: 'backup_restore', name: 'Відновлення' },
      { id: 'backup_view', name: 'Перегляд' },
    ]
  },
  {
    category: 'Моніторинг',
    icon: '📈',
    permissions: [
      { id: 'monitor_view', name: 'Метрики' },
      { id: 'logs_view', name: 'Логи' },
      { id: 'performance_view', name: 'Продуктивність' },
    ]
  },
];

const adminRoles = [
  { 
    id: 'superadmin', 
    name: 'Superadmin', 
    color: 'from-red-500 to-red-600',
    permissions: {
      db_create: true, db_delete: true, db_modify: true, db_view: true,
      table_create: true, table_delete: true, table_alter: true, table_view: true,
      sql_select: true, sql_insert: true, sql_update: true, sql_delete: true,
      user_create: true, user_delete: true, user_modify: true, user_view: true,
      ext_install: true, func_create: true, trigger_create: true,
      backup_create: true, backup_restore: true, backup_view: true,
      monitor_view: true, logs_view: true, performance_view: true,
    }
  },
  { 
    id: 'dbadmin', 
    name: 'Database Admin', 
    color: 'from-lime-500 to-green-600',
    permissions: {
      db_create: true, db_delete: true, db_modify: true, db_view: true,
      table_create: true, table_delete: true, table_alter: true, table_view: true,
      sql_select: true, sql_insert: true, sql_update: true, sql_delete: true,
      user_create: false, user_delete: false, user_modify: false, user_view: true,
      ext_install: true, func_create: true, trigger_create: true,
      backup_create: true, backup_restore: true, backup_view: true,
      monitor_view: true, logs_view: true, performance_view: true,
    }
  },
  { 
    id: 'developer', 
    name: 'Developer', 
    color: 'from-yellow-500 to-lime-600',
    permissions: {
      db_create: false, db_delete: false, db_modify: false, db_view: true,
      table_create: true, table_delete: false, table_alter: true, table_view: true,
      sql_select: true, sql_insert: true, sql_update: true, sql_delete: false,
      user_create: false, user_delete: false, user_modify: false, user_view: false,
      ext_install: false, func_create: true, trigger_create: true,
      backup_create: false, backup_restore: false, backup_view: true,
      monitor_view: true, logs_view: true, performance_view: true,
    }
  },
  { 
    id: 'analyst', 
    name: 'Analyst', 
    color: 'from-green-500 to-lime-600',
    permissions: {
      db_create: false, db_delete: false, db_modify: false, db_view: true,
      table_create: false, table_delete: false, table_alter: false, table_view: true,
      sql_select: true, sql_insert: false, sql_update: false, sql_delete: false,
      user_create: false, user_delete: false, user_modify: false, user_view: false,
      ext_install: false, func_create: false, trigger_create: false,
      backup_create: false, backup_restore: false, backup_view: false,
      monitor_view: true, logs_view: false, performance_view: true,
    }
  },
  { 
    id: 'viewer', 
    name: 'Viewer', 
    color: 'from-lime-600 to-yellow-600',
    permissions: {
      db_create: false, db_delete: false, db_modify: false, db_view: true,
      table_create: false, table_delete: false, table_alter: false, table_view: true,
      sql_select: false, sql_insert: false, sql_update: false, sql_delete: false,
      user_create: false, user_delete: false, user_modify: false, user_view: false,
      ext_install: false, func_create: false, trigger_create: false,
      backup_create: false, backup_restore: false, backup_view: false,
      monitor_view: true, logs_view: false, performance_view: true,
    }
  },
];

const userPermissions = [
  {
    category: 'Проєкти',
    icon: '📁',
    permissions: [
      { id: 'project_create', name: 'Створити' },
      { id: 'project_delete', name: 'Видалити' },
      { id: 'project_share', name: 'Поділитись' },
      { id: 'project_export', name: 'Експорт' },
    ]
  },
  {
    category: 'Дані',
    icon: '💾',
    permissions: [
      { id: 'data_import', name: 'Імпорт' },
      { id: 'data_export', name: 'Експорт' },
      { id: 'data_backup', name: 'Бекапи' },
    ]
  },
  {
    category: 'API',
    icon: '🔗',
    permissions: [
      { id: 'api_access', name: 'Доступ' },
      { id: 'api_keys', name: 'Ключі' },
      { id: 'webhooks', name: 'Webhooks' },
    ]
  },
  {
    category: 'Налаштування',
    icon: '⚙️',
    permissions: [
      { id: 'custom_branding', name: 'Брендинг' },
      { id: 'custom_domain', name: 'Домен' },
      { id: 'sso', name: 'SSO' },
    ]
  },
  {
    category: 'Підтримка',
    icon: '💬',
    permissions: [
      { id: 'support_email', name: 'Email' },
      { id: 'support_priority', name: 'Пріоритет' },
      { id: 'support_phone', name: 'Телефон' },
    ]
  },
  {
    category: 'Обмеження',
    icon: '📊',
    permissions: [
      { id: 'storage_limit', name: 'Сховище' },
      { id: 'users_limit', name: 'Користувачі' },
      { id: 'requests_limit', name: 'Запити' },
    ]
  },
];

const userRoles = [
  { 
    id: 'premium', 
    name: 'Premium User', 
    color: 'from-violet-500 to-purple-600',
    permissions: {
      project_create: true, project_delete: true, project_share: true, project_export: true,
      data_import: true, data_export: true, data_backup: true,
      api_access: true, api_keys: true, webhooks: true,
      custom_branding: true, custom_domain: true, sso: true,
      support_email: true, support_priority: true, support_phone: true,
      storage_limit: true, users_limit: true, requests_limit: true,
    },
    limits: { storage: 'Безліміт', users: 'Безліміт', requests: 'Безліміт' }
  },
  { 
    id: 'standard', 
    name: 'Standard User', 
    color: 'from-blue-500 to-cyan-600',
    permissions: {
      project_create: true, project_delete: true, project_share: true, project_export: true,
      data_import: false, data_export: true, data_backup: false,
      api_access: false, api_keys: false, webhooks: false,
      custom_branding: false, custom_domain: false, sso: false,
      support_email: true, support_priority: false, support_phone: false,
      storage_limit: true, users_limit: true, requests_limit: true,
    },
    limits: { storage: '100 GB', users: '10', requests: '10,000/день' }
  },
  { 
    id: 'free', 
    name: 'Free User', 
    color: 'from-slate-400 to-slate-500',
    permissions: {
      project_create: true, project_delete: false, project_share: false, project_export: false,
      data_import: false, data_export: false, data_backup: false,
      api_access: false, api_keys: false, webhooks: false,
      custom_branding: false, custom_domain: false, sso: false,
      support_email: true, support_priority: false, support_phone: false,
      storage_limit: true, users_limit: true, requests_limit: true,
    },
    limits: { storage: '1 GB', users: '1', requests: '100/день' }
  },
  { 
    id: 'trial', 
    name: 'Trial User', 
    color: 'from-amber-500 to-orange-600',
    permissions: {
      project_create: true, project_delete: true, project_share: true, project_export: true,
      data_import: true, data_export: true, data_backup: false,
      api_access: true, api_keys: true, webhooks: false,
      custom_branding: false, custom_domain: false, sso: false,
      support_email: true, support_priority: true, support_phone: false,
      storage_limit: true, users_limit: true, requests_limit: true,
    },
    limits: { storage: '10 GB', users: '5', requests: '1,000/день' }
  },
];

export default function RBACMatrix() {
  const [expandedAdminCategories, setExpandedAdminCategories] = useState<Set<string>>(new Set());
  const [expandedUserCategories, setExpandedUserCategories] = useState<Set<string>>(new Set());

  const toggleAdminCategory = (category: string) => {
    const newExpanded = new Set(expandedAdminCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedAdminCategories(newExpanded);
  };

  const toggleUserCategory = (category: string) => {
    const newExpanded = new Set(expandedUserCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedUserCategories(newExpanded);
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-slate-700" />
          <CardTitle>Матриця прав доступу (RBAC)</CardTitle>
        </div>
        <CardDescription>Налаштування дозволів для ролей адміністраторів та користувачів</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="admin">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="admin" className="gap-2">
              <UserCog className="w-4 h-4" />
              Адмін ролі ({adminRoles.length})
            </TabsTrigger>
            <TabsTrigger value="user" className="gap-2">
              <Users className="w-4 h-4" />
              Користувацькі ролі ({userRoles.length})
            </TabsTrigger>
          </TabsList>

          {/* Admin Permissions Tab */}
          <TabsContent value="admin" className="space-y-3">
            {adminPermissions.map((group) => (
              <div key={group.category} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAdminCategory(group.category)}
                  className="w-full px-3 py-2 flex items-center justify-between bg-gradient-to-r from-lime-50 to-green-50 hover:from-lime-100 hover:to-green-100 transition-colors border-b border-lime-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{group.icon}</span>
                    <span className="text-sm text-slate-900">{group.category}</span>
                    <Badge variant="outline" className="text-xs h-5 bg-white border-lime-300">{group.permissions.length}</Badge>
                  </div>
                  {expandedAdminCategories.has(group.category) ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </button>

                {expandedAdminCategories.has(group.category) && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-lime-50 to-green-50 border-b border-lime-200">
                        <tr>
                          <th className="px-3 py-1.5 text-left text-xs text-slate-600 w-40 sticky left-0 bg-gradient-to-r from-lime-50 to-green-50">
                            <div className="flex items-center gap-1.5">
                              <UserCog className="w-3.5 h-3.5 text-lime-600" />
                              <span>Роль адміна</span>
                            </div>
                          </th>
                          {group.permissions.map((perm) => (
                            <th key={perm.id} className="px-2 py-1.5 text-center text-xs text-slate-600 min-w-[70px]">
                              {perm.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {adminRoles.map((role) => (
                          <tr key={role.id} className="border-b border-slate-100 hover:bg-lime-50/30">
                            <td className="px-3 py-2 sticky left-0 bg-white hover:bg-lime-50/30">
                              <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${role.color}`} />
                                <span className="text-xs text-slate-900">{role.name}</span>
                              </div>
                            </td>
                            {group.permissions.map((perm) => (
                              <td key={perm.id} className="px-2 py-2 text-center">
                                <div className="flex justify-center">
                                  <Checkbox 
                                    checked={role.permissions[perm.id as keyof typeof role.permissions]} 
                                    disabled={role.id === 'superadmin'}
                                    className="h-4 w-4"
                                  />
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          {/* User Permissions Tab */}
          <TabsContent value="user" className="space-y-3">
            {userPermissions.map((group) => (
              <div key={group.category} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleUserCategory(group.category)}
                  className="w-full px-3 py-2 flex items-center justify-between bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 transition-colors border-b border-violet-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{group.icon}</span>
                    <span className="text-sm text-slate-900">{group.category}</span>
                    <Badge variant="outline" className="text-xs h-5 bg-white border-violet-300">{group.permissions.length}</Badge>
                  </div>
                  {expandedUserCategories.has(group.category) ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </button>

                {expandedUserCategories.has(group.category) && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-200">
                        <tr>
                          <th className="px-3 py-1.5 text-left text-xs text-slate-600 w-40 sticky left-0 bg-gradient-to-r from-violet-50 to-purple-50">
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-violet-600" />
                              <span>Роль користувача</span>
                            </div>
                          </th>
                          {group.permissions.map((perm) => (
                            <th key={perm.id} className="px-2 py-1.5 text-center text-xs text-slate-600 min-w-[70px]">
                              {perm.name}
                            </th>
                          ))}
                          {group.category === 'Обмеження' && (
                            <th className="px-2 py-1.5 text-center text-xs text-slate-600 min-w-[90px]">Значення</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {userRoles.map((role) => (
                          <tr key={role.id} className="border-b border-slate-100 hover:bg-violet-50/30">
                            <td className="px-3 py-2 sticky left-0 bg-white hover:bg-violet-50/30">
                              <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${role.color}`} />
                                <span className="text-xs text-slate-900">{role.name}</span>
                              </div>
                            </td>
                            {group.permissions.map((perm) => (
                              <td key={perm.id} className="px-2 py-2 text-center">
                                <div className="flex justify-center">
                                  <Checkbox 
                                    checked={role.permissions[perm.id as keyof typeof role.permissions]} 
                                    className="h-4 w-4"
                                  />
                                </div>
                              </td>
                            ))}
                            {group.category === 'Обмеження' && (
                              <td className="px-2 py-2 text-center">
                                <div className="text-[10px] text-slate-600 leading-tight">
                                  {perm.id === 'storage_limit' && role.limits.storage}
                                  {perm.id === 'users_limit' && role.limits.users}
                                  {perm.id === 'requests_limit' && role.limits.requests}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}