import { Database, Users, Table2, HardDrive, Clock, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Всього баз даних', value: '12', icon: Database, color: 'bg-blue-500' },
    { label: 'Активних користувачів', value: '47', icon: Users, color: 'bg-green-500' },
    { label: 'Всього таблиць', value: '248', icon: Table2, color: 'bg-purple-500' },
    { label: 'Використано сховища', value: '3.2 ГБ', icon: HardDrive, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { action: 'База даних створена', details: 'production_db', user: 'admin', time: '2 хвилини тому' },
    { action: 'Користувач створений', details: 'developer_user', user: 'root', time: '15 хвилин тому' },
    { action: 'Таблицю змінено', details: 'users.customers', user: 'admin', time: '1 годину тому' },
    { action: 'Резервне копіювання завершено', details: 'staging_db', user: 'system', time: '2 години тому' },
    { action: 'Запит виконано', details: 'SELECT * FROM orders', user: 'analyst', time: '3 години тому' },
  ];

  const activeConnections = [
    { database: 'production_db', user: 'app_user', state: 'активний', duration: '00:45:32' },
    { database: 'analytics_db', user: 'analyst', state: 'очікує', duration: '01:23:45' },
    { database: 'staging_db', user: 'developer', state: 'активний', duration: '00:12:18' },
    { database: 'production_db', user: 'api_service', state: 'активний', duration: '05:34:21' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-gray-700" />
          <h2 className="text-gray-900">Огляд продуктивності</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Продуктивність запитів</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-gray-900">12.4мс</span>
              <span className="text-green-600 text-sm">↓ 8%</span>
            </div>
            <div className="mt-2 bg-gray-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Коефіцієнт попадань кешу</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-gray-900">98.2%</span>
              <span className="text-green-600 text-sm">↑ 2%</span>
            </div>
            <div className="mt-2 bg-gray-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Використання CPU</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-gray-900">34%</span>
              <span className="text-yellow-600 text-sm">↑ 5%</span>
            </div>
            <div className="mt-2 bg-gray-100 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '34%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-700" />
            <h2 className="text-gray-900">Остання активність</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.details}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 text-xs">від {activity.user}</span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Connections */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gray-700" />
            <h2 className="text-gray-900">Активні з'єднання</h2>
          </div>
          <div className="space-y-3">
            {activeConnections.map((conn, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-900 text-sm">{conn.database}</p>
                  <p className="text-gray-600 text-xs">{conn.user}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${conn.state === 'активний' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-xs text-gray-600">{conn.state}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{conn.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
