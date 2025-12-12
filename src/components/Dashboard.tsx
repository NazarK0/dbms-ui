import { Database, Users, Table2, HardDrive, Clock, TrendingUp, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export default function Dashboard() {
  const stats = [
    { label: 'Всього баз даних', value: '12', icon: Database, color: 'from-lime-500 to-green-600', change: '+2', trend: 'up' },
    { label: 'Активних користувачів', value: '47', icon: Users, color: 'from-green-500 to-lime-600', change: '+5', trend: 'up' },
    { label: 'Всього таблиць', value: '248', icon: Table2, color: 'from-yellow-500 to-lime-600', change: '+12', trend: 'up' },
    { label: 'Використано сховища', value: '3.2 ГБ', icon: HardDrive, color: 'from-lime-600 to-yellow-600', change: '-0.4 ГБ', trend: 'down' },
  ];

  const recentActivity = [
    { action: 'База даних створена', details: 'production_db', user: 'admin', time: '2 хвилини тому', type: 'success' },
    { action: 'Користувач створений', details: 'developer_user', user: 'root', time: '15 хвилин тому', type: 'info' },
    { action: 'Таблицю змінено', details: 'users.customers', user: 'admin', time: '1 годину тому', type: 'warning' },
    { action: 'Резервне копіювання завершено', details: 'staging_db', user: 'system', time: '2 години тому', type: 'success' },
    { action: 'Запит виконано', details: 'SELECT * FROM orders', user: 'analyst', time: '3 години тому', type: 'info' },
  ];

  const activeConnections = [
    { database: 'production_db', user: 'app_user', state: 'активний', duration: '00:45:32', queries: 1234 },
    { database: 'analytics_db', user: 'analyst', state: 'очікує', duration: '01:23:45', queries: 45 },
    { database: 'staging_db', user: 'developer', state: 'активний', duration: '00:12:18', queries: 678 },
    { database: 'production_db', user: 'api_service', state: 'активний', duration: '05:34:21', queries: 8921 },
  ];

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
          return (
            <Card key={stat.label} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-slate-900 text-3xl">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-slate-500">за останній тиждень</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Overview */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <CardTitle>Огляд продуктивності</CardTitle>
          </div>
          <CardDescription>Ключові метрики за останню годину</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-slate-600 text-sm">Продуктивність запитів</p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  ↓ 8%
                </Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-slate-900 text-2xl">12.4</span>
                <span className="text-slate-500">мс</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-slate-600 text-sm">Коефіцієнт попадань кешу</p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  ↑ 2%
                </Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-slate-900 text-2xl">98.2</span>
                <span className="text-slate-500">%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-slate-600 text-sm">Використання CPU</p>
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  ↑ 5%
                </Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-slate-900 text-2xl">34</span>
                <span className="text-slate-500">%</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-700" />
              <CardTitle>Остання активність</CardTitle>
            </div>
            <CardDescription>Нещодавні події системи</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full mt-2 flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 text-sm">{activity.action}</p>
                    <p className="text-slate-600 text-sm truncate">{activity.details}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {activity.user}
                      </Badge>
                      <span className="text-slate-500 text-xs">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Connections */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-700" />
              <CardTitle>Активні з'єднання</CardTitle>
            </div>
            <CardDescription>Поточні підключення до серверу</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeConnections.map((conn, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-slate-900 text-sm">{conn.database}</p>
                      <Badge 
                        variant={conn.state === 'активний' ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {conn.state}
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-xs">{conn.user}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900 text-sm">{conn.duration}</p>
                    <p className="text-slate-500 text-xs">{conn.queries} запитів</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}