import { useState } from 'react';
import { Plus, Server, Activity, AlertCircle, CheckCircle, Clock, MapPin, Zap } from 'lucide-react';

export default function ReplicaClusters() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);

  const clusters = [
    {
      id: 1,
      name: 'Primary Cluster',
      role: 'Primary',
      status: 'healthy',
      host: 'primary-db.example.com',
      port: 5432,
      location: 'US East (Virginia)',
      version: 'PostgreSQL 15.4',
      uptime: '45 days 12:34:56',
      connections: 47,
      replicationLag: '0ms',
      databases: 12,
    },
    {
      id: 2,
      name: 'Read Replica 1',
      role: 'Replica',
      status: 'healthy',
      host: 'replica-1.example.com',
      port: 5432,
      location: 'US West (Oregon)',
      version: 'PostgreSQL 15.4',
      uptime: '42 days 08:15:22',
      connections: 23,
      replicationLag: '12ms',
      databases: 12,
    },
    {
      id: 3,
      name: 'Read Replica 2',
      role: 'Replica',
      status: 'healthy',
      host: 'replica-2.example.com',
      port: 5432,
      location: 'EU (Ireland)',
      version: 'PostgreSQL 15.4',
      uptime: '38 days 16:42:10',
      connections: 18,
      replicationLag: '45ms',
      databases: 12,
    },
    {
      id: 4,
      name: 'Read Replica 3',
      role: 'Replica',
      status: 'warning',
      host: 'replica-3.example.com',
      port: 5432,
      location: 'Asia Pacific (Singapore)',
      version: 'PostgreSQL 15.4',
      uptime: '15 days 04:18:33',
      connections: 31,
      replicationLag: '234ms',
      databases: 12,
    },
  ];

  const replicationStats = [
    { metric: 'Replication Slots', value: '3', icon: Server, color: 'bg-blue-500' },
    { metric: 'Average Lag', value: '97ms', icon: Clock, color: 'bg-green-500' },
    { metric: 'Data Transferred', value: '2.4 TB', icon: Zap, color: 'bg-purple-500' },
    { metric: 'Sync Status', value: 'Streaming', icon: Activity, color: 'bg-orange-500' },
  ];

  const replicationActivity = [
    {
      replica: 'Read Replica 1',
      state: 'streaming',
      syncState: 'async',
      sentLSN: '0/8A2F4D8',
      writeLSN: '0/8A2F4D8',
      flushLSN: '0/8A2F4D8',
      lag: '12ms',
    },
    {
      replica: 'Read Replica 2',
      state: 'streaming',
      syncState: 'async',
      sentLSN: '0/8A2F4C0',
      writeLSN: '0/8A2F4C0',
      flushLSN: '0/8A2F4C0',
      lag: '45ms',
    },
    {
      replica: 'Read Replica 3',
      state: 'streaming',
      syncState: 'async',
      sentLSN: '0/8A2F3A8',
      writeLSN: '0/8A2F3A8',
      flushLSN: '0/8A2F3A8',
      lag: '234ms',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Replica Clusters</h2>
          <p className="text-gray-600">Manage PostgreSQL replication topology and monitoring</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Replica
        </button>
      </div>

      {/* Replication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {replicationStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.metric} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.metric}</p>
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

      {/* Topology Diagram */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6">Replication Topology</h3>
        <div className="flex flex-col items-center space-y-6">
          {/* Primary */}
          <div className="w-full max-w-md">
            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Primary Cluster</span>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm text-gray-600">
                <p>primary-db.example.com:5432</p>
                <p className="text-xs mt-1">US East (Virginia)</p>
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="relative w-full max-w-2xl h-12">
            <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-gray-300"></div>
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300"></div>
            <div className="absolute top-6 left-1/4 w-0.5 h-6 bg-gray-300"></div>
            <div className="absolute top-6 left-1/2 w-0.5 h-6 bg-gray-300"></div>
            <div className="absolute top-6 left-3/4 w-0.5 h-6 bg-gray-300"></div>
          </div>

          {/* Replicas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-green-600" />
                  <span className="text-gray-900 text-sm">Replica 1</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-xs text-gray-600">
                <p>replica-1.example.com</p>
                <p className="text-xs mt-1">US West • Lag: 12ms</p>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-green-600" />
                  <span className="text-gray-900 text-sm">Replica 2</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-xs text-gray-600">
                <p>replica-2.example.com</p>
                <p className="text-xs mt-1">EU Ireland • Lag: 45ms</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-yellow-600" />
                  <span className="text-gray-900 text-sm">Replica 3</span>
                </div>
                <AlertCircle className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-xs text-gray-600">
                <p>replica-3.example.com</p>
                <p className="text-xs mt-1">AP Singapore • Lag: 234ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cluster Details */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Cluster Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Name</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Role</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Status</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Location</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Host</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Connections</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Replication Lag</th>
                <th className="px-6 py-3 text-right text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clusters.map((cluster) => (
                <tr
                  key={cluster.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedCluster(cluster.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{cluster.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        cluster.role === 'Primary'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {cluster.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {cluster.status === 'healthy' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 text-sm">Healthy</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                          <span className="text-yellow-600 text-sm">Warning</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{cluster.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-gray-600">{cluster.host}:{cluster.port}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{cluster.connections}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm ${
                        parseInt(cluster.replicationLag) === 0
                          ? 'text-green-600'
                          : parseInt(cluster.replicationLag) > 100
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {cluster.replicationLag}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        Configure
                      </button>
                      {cluster.role !== 'Primary' && (
                        <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded transition-colors">
                          Promote
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Replication Activity */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900">Replication Activity</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Replica</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">State</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Sync State</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Sent LSN</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Write LSN</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Flush LSN</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Lag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {replicationActivity.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{activity.replica}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {activity.state}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{activity.syncState}</td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-gray-600">{activity.sentLSN}</code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-gray-600">{activity.writeLSN}</code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-gray-600">{activity.flushLSN}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{activity.lag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Replica Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-gray-900 mb-4">Add Replica Cluster</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Replica Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Read Replica 4"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Host</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="replica-4.example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Port</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="5432"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Location</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="us-east">US East (Virginia)</option>
                  <option value="us-west">US West (Oregon)</option>
                  <option value="eu-west">EU (Ireland)</option>
                  <option value="ap-southeast">Asia Pacific (Singapore)</option>
                  <option value="ap-northeast">Asia Pacific (Tokyo)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Replication Mode</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="async">Asynchronous</option>
                  <option value="sync">Synchronous</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Replica
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
