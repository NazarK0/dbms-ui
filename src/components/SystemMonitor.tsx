import { Cpu, HardDrive, Activity, Zap, Users, Database } from 'lucide-react';

export default function SystemMonitor() {
  const systemStats = [
    { label: 'CPU Usage', value: '34%', icon: Cpu, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Memory Usage', value: '2.1 GB / 8 GB', icon: HardDrive, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Active Connections', value: '47', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Queries/sec', value: '1,243', icon: Zap, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const connections = [
    { pid: 12345, database: 'production_db', user: 'app_user', state: 'active', query: 'SELECT * FROM orders WHERE...', duration: '00:00:12' },
    { pid: 12346, database: 'analytics_db', user: 'analyst', state: 'idle', query: 'IDLE', duration: '00:15:34' },
    { pid: 12347, database: 'production_db', user: 'api_service', state: 'active', query: 'UPDATE users SET last_login...', duration: '00:00:03' },
    { pid: 12348, database: 'staging_db', user: 'developer', state: 'idle in transaction', query: 'BEGIN; INSERT INTO test...', duration: '00:02:45' },
    { pid: 12349, database: 'production_db', user: 'app_user', state: 'active', query: 'SELECT COUNT(*) FROM products', duration: '00:00:01' },
  ];

  const slowQueries = [
    { query: 'SELECT * FROM large_table WHERE complex_condition...', duration: '2.4s', calls: 145, database: 'production_db' },
    { query: 'UPDATE analytics SET processed = true WHERE...', duration: '1.8s', calls: 89, database: 'analytics_db' },
    { query: 'SELECT j.* FROM joins j INNER JOIN...', duration: '1.2s', calls: 234, database: 'production_db' },
  ];

  const databaseStats = [
    { name: 'production_db', size: '1.2 GB', connections: 18, tps: 450, cache_hit: '98.5%' },
    { name: 'analytics_db', size: '720 MB', connections: 8, tps: 120, cache_hit: '95.2%' },
    { name: 'staging_db', size: '850 MB', connections: 12, tps: 180, cache_hit: '97.1%' },
    { name: 'test_db', size: '340 MB', connections: 4, tps: 45, cache_hit: '92.8%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">System Monitor</h2>
        <p className="text-gray-600">Real-time PostgreSQL performance monitoring</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} rounded-lg p-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Database Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">Database Statistics</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Database</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Size</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Connections</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">TPS</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Cache Hit Ratio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {databaseStats.map((db) => (
                <tr key={db.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{db.name}</td>
                  <td className="px-6 py-4 text-gray-600">{db.size}</td>
                  <td className="px-6 py-4 text-gray-600">{db.connections}</td>
                  <td className="px-6 py-4 text-gray-600">{db.tps}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: db.cache_hit }}
                        ></div>
                      </div>
                      <span className="text-gray-600 text-sm">{db.cache_hit}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Connections */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">Active Connections</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">PID</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Database</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">User</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">State</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Query</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {connections.map((conn) => (
                <tr key={conn.pid} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{conn.pid}</td>
                  <td className="px-6 py-4 text-gray-600">{conn.database}</td>
                  <td className="px-6 py-4 text-gray-600">{conn.user}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        conn.state === 'active'
                          ? 'bg-green-100 text-green-700'
                          : conn.state === 'idle'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {conn.state}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                    <code className="text-xs">{conn.query}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{conn.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slow Queries */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">Slow Queries (Last 24 hours)</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {slowQueries.map((query, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <code className="text-sm text-gray-900 flex-1">{query.query}</code>
                <span className="text-red-600 ml-4">{query.duration}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{query.calls} calls</span>
                <span>•</span>
                <span>{query.database}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
