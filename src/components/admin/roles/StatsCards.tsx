import { Shield, UserCog, Users, Key } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

interface StatsCardsProps {
  totalRoles: number;
  totalAdmins: number;
  totalUsers: number;
  totalPermissions?: number;
}

export default function StatsCards({ 
  totalRoles, 
  totalAdmins, 
  totalUsers,
  totalPermissions = 47
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Roles */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-lg">{totalRoles}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Всього ролей</CardTitle>
          <CardDescription>Активні ролі в системі</CardDescription>
        </CardContent>
      </Card>

      {/* Admin Users */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-600 to-green-500 rounded-xl flex items-center justify-center">
              <UserCog className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-lg">{totalAdmins}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Адміністраторів</CardTitle>
          <CardDescription>З адмін ролями</CardDescription>
        </CardContent>
      </Card>

      {/* Regular Users */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-lg">{totalUsers}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Користувачів</CardTitle>
          <CardDescription>З користувацькими ролями</CardDescription>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-xl flex items-center justify-center">
              <Key className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-lg">{totalPermissions}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Дозволів</CardTitle>
          <CardDescription>Унікальних прав доступу</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
