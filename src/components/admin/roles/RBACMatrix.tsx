import { useState } from 'react';
import { Shield, UserCog, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Checkbox } from '../../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { 
  adminPermissions, 
  adminRolesWithPermissions, 
  userPermissions, 
  userRolesWithPermissions 
} from '../../../mockData/admin';

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>Матриця прав доступу (RBAC)</CardTitle>
            <CardDescription>Налаштування дозволів для ролей адміністраторів та користувачів</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="admin">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="admin" className="gap-2">
              <UserCog className="w-4 h-4" />
              Адмін ролі ({adminRolesWithPermissions.length})
            </TabsTrigger>
            <TabsTrigger value="user" className="gap-2">
              <Users className="w-4 h-4" />
              Користувацькі ролі ({userRolesWithPermissions.length})
            </TabsTrigger>
          </TabsList>

          {/* Admin Permissions Tab */}
          <TabsContent value="admin" className="space-y-3">
            {adminPermissions.map((group) => {
              const IconComponent = group.icon;
              return (
                <div key={group.category} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleAdminCategory(group.category)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-lime-50 to-green-50 hover:from-lime-100 hover:to-green-100 transition-colors border-b border-lime-200"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-lime-600" />
                      <span className="text-slate-900">{group.category}</span>
                      <Badge variant="outline" className="bg-white border-lime-300 text-lime-700">
                        {group.permissions.length}
                      </Badge>
                    </div>
                    {expandedAdminCategories.has(group.category) ? (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    )}
                  </button>

                  {expandedAdminCategories.has(group.category) && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-lime-50 to-green-50 border-b border-lime-200">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs text-slate-600 w-48 sticky left-0 bg-gradient-to-r from-lime-50 to-green-50">
                              <div className="flex items-center gap-2">
                                <UserCog className="w-4 h-4 text-lime-600" />
                                <span>Роль адміна</span>
                              </div>
                            </th>
                            {group.permissions.map((perm) => (
                              <th key={perm.id} className="px-3 py-2 text-center text-xs text-slate-600 min-w-[90px]">
                                {perm.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {adminRolesWithPermissions.map((role) => (
                            <tr key={role.id} className="border-b border-slate-100 hover:bg-lime-50/30">
                              <td className="px-4 py-3 sticky left-0 bg-white hover:bg-lime-50/30">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${role.color}`} />
                                  <span className="text-sm text-slate-900">{role.name}</span>
                                </div>
                              </td>
                              {group.permissions.map((perm) => (
                                <td key={perm.id} className="px-3 py-3 text-center">
                                  <div className="flex justify-center">
                                    <Checkbox 
                                      checked={role.permissions[perm.id as keyof typeof role.permissions]} 
                                      disabled={role.id === 'superadmin'}
                                      className="data-[state=checked]:bg-lime-600 data-[state=checked]:border-lime-600"
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
              );
            })}
          </TabsContent>

          {/* User Permissions Tab */}
          <TabsContent value="user" className="space-y-3">
            {userPermissions.map((group) => {
              const IconComponent = group.icon;
              return (
                <div key={group.category} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleUserCategory(group.category)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 transition-colors border-b border-violet-200"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-violet-600" />
                      <span className="text-slate-900">{group.category}</span>
                      <Badge variant="outline" className="bg-white border-violet-300 text-violet-700">
                        {group.permissions.length}
                      </Badge>
                    </div>
                    {expandedUserCategories.has(group.category) ? (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    )}
                  </button>

                  {expandedUserCategories.has(group.category) && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-200">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs text-slate-600 w-48 sticky left-0 bg-gradient-to-r from-violet-50 to-purple-50">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-violet-600" />
                                <span>Роль користувача</span>
                              </div>
                            </th>
                            {group.permissions.map((perm) => (
                              <th key={perm.id} className="px-3 py-2 text-center text-xs text-slate-600 min-w-[90px]">
                                {perm.name}
                              </th>
                            ))}
                            {group.category === 'Обмеження' && (
                              <th className="px-3 py-2 text-center text-xs text-slate-600 min-w-[110px]">Значення</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {userRolesWithPermissions.map((role) => (
                            <tr key={role.id} className="border-b border-slate-100 hover:bg-violet-50/30">
                              <td className="px-4 py-3 sticky left-0 bg-white hover:bg-violet-50/30">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${role.color}`} />
                                  <span className="text-sm text-slate-900">{role.name}</span>
                                </div>
                              </td>
                              {group.permissions.map((perm) => (
                                <td key={perm.id} className="px-3 py-3 text-center">
                                  <div className="flex justify-center">
                                    <Checkbox 
                                      checked={role.permissions[perm.id as keyof typeof role.permissions]} 
                                      className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                                    />
                                  </div>
                                </td>
                              ))}
                              {group.category === 'Обмеження' && (
                                <td className="px-3 py-3 text-center">
                                  <div className="text-xs text-slate-600">
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
              );
            })}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}