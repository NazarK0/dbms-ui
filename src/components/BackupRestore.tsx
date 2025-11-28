import { useState } from 'react';
import { Download, Upload, Clock, Database, Play, Check, AlertCircle, Trash2, Calendar } from 'lucide-react';

export default function BackupRestore() {
  const [selectedDatabase, setSelectedDatabase] = useState('production_db');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [backupInProgress, setBackupInProgress] = useState(false);

  const backups = [
    {
      id: 1,
      database: 'production_db',
      filename: 'production_db_2024_11_28_09_00.sql',
      size: '1.2 GB',
      type: 'Full',
      status: 'completed',
      created: '2024-11-28 09:00:00',
      duration: '5m 32s',
    },
    {
      id: 2,
      database: 'production_db',
      filename: 'production_db_2024_11_27_09_00.sql',
      size: '1.1 GB',
      type: 'Full',
      status: 'completed',
      created: '2024-11-27 09:00:00',
      duration: '5m 18s',
    },
    {
      id: 3,
      database: 'analytics_db',
      filename: 'analytics_db_2024_11_28_06_00.sql',
      size: '720 MB',
      type: 'Incremental',
      status: 'completed',
      created: '2024-11-28 06:00:00',
      duration: '2m 45s',
    },
    {
      id: 4,
      database: 'staging_db',
      filename: 'staging_db_2024_11_28_03_00.sql',
      size: '850 MB',
      type: 'Full',
      status: 'completed',
      created: '2024-11-28 03:00:00',
      duration: '4m 12s',
    },
    {
      id: 5,
      database: 'production_db',
      filename: 'production_db_2024_11_26_09_00.sql',
      size: '1.0 GB',
      type: 'Full',
      status: 'completed',
      created: '2024-11-26 09:00:00',
      duration: '5m 05s',
    },
  ];

  const schedules = [
    {
      id: 1,
      database: 'production_db',
      frequency: 'Daily',
      time: '09:00 AM',
      type: 'Full',
      retention: '30 days',
      enabled: true,
      nextRun: '2024-11-29 09:00:00',
    },
    {
      id: 2,
      database: 'analytics_db',
      frequency: 'Daily',
      time: '06:00 AM',
      type: 'Incremental',
      retention: '14 days',
      enabled: true,
      nextRun: '2024-11-29 06:00:00',
    },
    {
      id: 3,
      database: 'staging_db',
      frequency: 'Weekly',
      time: '03:00 AM',
      type: 'Full',
      retention: '7 days',
      enabled: true,
      nextRun: '2024-12-02 03:00:00',
    },
  ];

  const handleCreateBackup = () => {
    setBackupInProgress(true);
    setTimeout(() => {
      setBackupInProgress(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Backup & Restore</h2>
          <p className="text-gray-600">Manage database backups and restoration</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Schedule Backup
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4" />
            Restore from File
          </button>
        </div>
      </div>

      {/* Quick Backup */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Create Manual Backup</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Database</label>
            <select
              value={selectedDatabase}
              onChange={(e) => setSelectedDatabase(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="production_db">production_db</option>
              <option value="staging_db">staging_db</option>
              <option value="analytics_db">analytics_db</option>
              <option value="test_db">test_db</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Backup Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="full">Full Backup</option>
              <option value="incremental">Incremental</option>
              <option value="differential">Differential</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Compression</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="gzip">GZIP</option>
              <option value="none">None</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <button
            onClick={handleCreateBackup}
            disabled={backupInProgress}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {backupInProgress ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Create Backup
              </>
            )}
          </button>
        </div>
      </div>

      {/* Backup Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Backups</p>
              <p className="text-gray-900 mt-2">{backups.length}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm">Storage Used</p>
              <p className="text-gray-900 mt-2">5.8 GB</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <Download className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm">Last Backup</p>
              <p className="text-gray-900 mt-2">2 hours ago</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm">Success Rate</p>
              <p className="text-gray-900 mt-2">99.8%</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <Check className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Backups */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Scheduled Backups</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Database</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Frequency</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Time</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Type</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Retention</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Next Run</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Status</th>
                <th className="px-6 py-3 text-right text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{schedule.database}</td>
                  <td className="px-6 py-4 text-gray-600">{schedule.frequency}</td>
                  <td className="px-6 py-4 text-gray-600">{schedule.time}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {schedule.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{schedule.retention}</td>
                  <td className="px-6 py-4 text-gray-600">{schedule.nextRun}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${schedule.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-gray-600 text-sm">{schedule.enabled ? 'Active' : 'Disabled'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Backup History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Database</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Filename</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Size</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Type</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Created</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Duration</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Status</th>
                <th className="px-6 py-3 text-right text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {backups.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{backup.database}</td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-gray-600">{backup.filename}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{backup.size}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{backup.created}</td>
                  <td className="px-6 py-4 text-gray-600">{backup.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {backup.status === 'completed' ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 text-sm">Completed</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-red-600 text-sm">Failed</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Upload className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-gray-900 mb-4">Schedule Backup</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Database</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="production_db">production_db</option>
                  <option value="staging_db">staging_db</option>
                  <option value="analytics_db">analytics_db</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Frequency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="09:00"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Backup Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="full">Full Backup</option>
                  <option value="incremental">Incremental</option>
                  <option value="differential">Differential</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Retention Period</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
