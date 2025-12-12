import { User, Mail, Calendar, Shield, Key, Settings as SettingsIcon, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface UserRole {
  id: number;
  name: string;
  color: string;
  permissions: string[];
}

interface UserProfileProps {
  userRoles: UserRole[];
  onBack?: () => void;
}

export default function UserProfile({ userRoles, onBack }: UserProfileProps) {
  const user = {
    name: 'Олександр Петренко',
    email: 'oleksandr.petrenko@example.com',
    avatar: 'AP',
    department: 'IT Department',
    position: 'Senior Developer',
    joinedDate: '15 січня 2024',
    lastLogin: '2 хвилини тому',
  };

  const activityStats = [
    { label: 'Запитів сьогодні', value: '1,245', change: '+12%', trend: 'up' },
    { label: 'Створено записів', value: '47', change: '+5%', trend: 'up' },
    { label: 'Оновлено записів', value: '128', change: '+8%', trend: 'up' },
    { label: 'Видалено записів', value: '3', change: '-2%', trend: 'down' },
  ];

  // Aggregate all unique permissions from all roles
  const allPermissions = Array.from(
    new Set(userRoles.flatMap((role) => role.permissions))
  ).sort();

  const groupedDatabases = [
    {
      group: 'Production Databases',
      databases: ['app_production', 'analytics_production'],
      grantedBy: ['Developer', 'Data Analyst'],
    },
    {
      group: 'Staging Databases',
      databases: ['app_staging', 'test_environment'],
      grantedBy: ['Developer'],
    },
    {
      group: 'Analytics Databases',
      databases: ['analytics_production', 'reports_db'],
      grantedBy: ['Data Analyst'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">Профіль користувача</h2>
        <p className="text-slate-600">Інформація про обліковий запис та призначені ролі</p>
      </div>

      {/* User Info */}
      <Card className="border-violet-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-violet-600" />
            Інформація про користувача
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-medium flex-shrink-0 shadow-lg">
              {user.avatar}
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-slate-900 text-xl mb-1">{user.name}</h3>
                <div className="flex items-center gap-2 text-slate-600 mb-1">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 mb-3">
                  <span className="text-sm">{user.position} • {user.department}</span>
                </div>
                
                {/* User Roles */}
                <div className="flex flex-wrap gap-2">
                  {userRoles.map((role) => (
                    <Badge
                      key={role.id}
                      variant="secondary"
                      className={role.color}
                    >
                      {role.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Дата реєстрації</p>
                  <div className="flex items-center gap-2 text-slate-900">
                    <Calendar className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-medium">{user.joinedDate}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Останній вхід</p>
                  <div className="flex items-center gap-2 text-slate-900">
                    <Activity className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-medium">{user.lastLogin}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-slate-900 font-medium mb-4">Активність за сьогодні</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activityStats.map((stat) => (
                <div key={stat.label} className="p-3 bg-violet-50 rounded-lg border border-violet-200">
                  <p className="text-xs text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-xl font-medium text-slate-900 mb-1">{stat.value}</p>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Access by Role */}
      <Card className="border-violet-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-600" />
            Доступ до баз даних
          </CardTitle>
          <CardDescription>Бази даних доступні на основі ваших ролей</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {groupedDatabases.map((group, index) => (
            <div key={index} className="p-4 bg-violet-50 rounded-lg border border-violet-200">
              <h4 className="text-slate-900 font-medium mb-3">{group.group}</h4>
              <div className="space-y-2">
                {group.databases.map((db) => (
                  <div key={db} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{db}</span>
                    <div className="flex gap-1">
                      {group.grantedBy.map((role) => (
                        <Badge key={role} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}