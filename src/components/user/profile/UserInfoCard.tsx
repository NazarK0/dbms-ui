import { User, Mail, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

interface UserRole {
  id: number;
  name: string;
  color: string;
}

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  department: string;
  position: string;
  joinedDate: string;
  lastLogin: string;
}

interface ActivityStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface UserInfoCardProps {
  user: UserInfo;
  userRoles: UserRole[];
  activityStats: ActivityStat[];
}

export default function UserInfoCard({ user, userRoles, activityStats }: UserInfoCardProps) {
  return (
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
  );
}
