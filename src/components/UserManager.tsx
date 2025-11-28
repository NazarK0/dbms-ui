import { useState } from 'react';
import { Plus, Trash2, Edit, Shield, Key, Lock, CheckCircle } from 'lucide-react';

export default function UserManager() {
  const [users, setUsers] = useState([
    { username: 'admin', role: 'Superuser', databases: 'All', lastLogin: '2024-11-28 09:15', status: 'active' },
    { username: 'developer', role: 'Developer', databases: 'staging_db, test_db', lastLogin: '2024-11-28 08:30', status: 'active' },
    { username: 'analyst', role: 'Read-only', databases: 'analytics_db', lastLogin: '2024-11-27 14:22', status: 'active' },
    { username: 'app_user', role: 'Application', databases: 'production_db', lastLogin: '2024-11-28 09:45', status: 'active' },
    { username: 'backup_service', role: 'Backup', databases: 'All', lastLogin: '2024-11-28 02:00', status: 'active' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRBACModal, setShowRBACModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('Developer');

  const handleCreateUser = () => {
    if (newUsername.trim()) {
      setUsers([
        ...users,
        {
          username: newUsername,
          role: newRole,
          databases: 'None',
          lastLogin: 'Never',
          status: 'active',
        },
      ]);
      setNewUsername('');
      setShowCreateModal(false);
    }
  };

  const handleDeleteUser = (username: string) => {
    if (confirm(`Are you sure you want to delete user "${username}"?`)) {
      setUsers(users.filter((user) => user.username !== username));
    }
  };

  const roles = [
    { name: 'Superuser', permissions: ['All privileges', 'Create databases', 'Create roles', 'Bypass RLS'] },
    { name: 'Developer', permissions: ['Create databases', 'Create tables', 'Insert/Update/Delete', 'Execute functions'] },
    { name: 'Read-only', permissions: ['Select data', 'Execute read-only functions'] },
    { name: 'Application', permissions: ['Select', 'Insert', 'Update', 'Delete on assigned databases'] },
    { name: 'Backup', permissions: ['Read all databases', 'Execute backup commands'] },
  ];

  const rbacMatrix = {
    production_db: {
      tables: ['users', 'orders', 'products', 'payments'],
      access: {
        admin: { select: true, insert: true, update: true, delete: true, grant: true },
        developer: { select: true, insert: false, update: false, delete: false, grant: false },
        analyst: { select: true, insert: false, update: false, delete: false, grant: false },
        app_user: { select: true, insert: true, update: true, delete: true, grant: false },
      },
    },
    staging_db: {
      tables: ['users', 'orders', 'test_data'],
      access: {
        admin: { select: true, insert: true, update: true, delete: true, grant: true },
        developer: { select: true, insert: true, update: true, delete: true, grant: false },
      },
    },
    analytics_db: {
      tables: ['events', 'metrics', 'reports'],
      access: {
        admin: { select: true, insert: true, update: true, delete: true, grant: true },
        analyst: { select: true, insert: false, update: false, delete: false, grant: false },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">User & Role Management</h2>
          <p className="text-gray-600">Manage PostgreSQL users and permissions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowRBACModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Lock className="w-4 h-4" />
            RBAC Matrix
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Username</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Role</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Database Access</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Last Login</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Status</th>
                <th className="px-6 py-3 text-right text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.username} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{user.databases}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{user.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user.username);
                          setShowRBACModal(true);
                        }}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors">
                        <Key className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.username)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        disabled={user.username === 'admin'}
                      >
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

      {/* Roles Reference */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Role Permissions Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div key={role.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-blue-600" />
                <h4 className="text-gray-900">{role.name}</h4>
              </div>
              <ul className="space-y-2">
                {role.permissions.map((permission, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-gray-900 mb-4">Create New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="new_user"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Superuser">Superuser</option>
                  <option value="Developer">Developer</option>
                  <option value="Read-only">Read-only</option>
                  <option value="Application">Application</option>
                  <option value="Backup">Backup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Database Access</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="database1, database2"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RBAC Matrix Modal */}
      {showRBACModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900">Role-Based Access Control Matrix</h3>
                <p className="text-gray-600 text-sm">View and manage permissions across databases and tables</p>
              </div>
              <button
                onClick={() => {
                  setShowRBACModal(false);
                  setSelectedUser(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {Object.entries(rbacMatrix).map(([dbName, dbData]) => (
              <div key={dbName} className="mb-6 last:mb-0">
                <div className="bg-gray-50 px-4 py-3 rounded-t-lg border border-gray-200">
                  <h4 className="text-gray-900">{dbName}</h4>
                </div>
                <div className="border border-gray-200 border-t-0 rounded-b-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-gray-700 text-sm">User/Role</th>
                          <th className="px-4 py-3 text-center text-gray-700 text-sm">SELECT</th>
                          <th className="px-4 py-3 text-center text-gray-700 text-sm">INSERT</th>
                          <th className="px-4 py-3 text-center text-gray-700 text-sm">UPDATE</th>
                          <th className="px-4 py-3 text-center text-gray-700 text-sm">DELETE</th>
                          <th className="px-4 py-3 text-center text-gray-700 text-sm">GRANT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {Object.entries(dbData.access).map(([user, permissions]) => (
                          <tr
                            key={user}
                            className={`hover:bg-gray-50 ${
                              selectedUser === user ? 'bg-blue-50' : ''
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-900">{user}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {permissions.select ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mx-auto"></div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {permissions.insert ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mx-auto"></div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {permissions.update ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mx-auto"></div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {permissions.delete ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mx-auto"></div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {permissions.grant ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full mx-auto"></div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowRBACModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
