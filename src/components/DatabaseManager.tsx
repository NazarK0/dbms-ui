import { useState } from 'react';
import { Plus, Trash2, Edit, Copy, Download } from 'lucide-react';

export default function DatabaseManager() {
  const [databases, setDatabases] = useState([
    { name: 'production_db', owner: 'admin', size: '1.2 ГБ', tables: 45, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'staging_db', owner: 'admin', size: '850 МБ', tables: 42, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'analytics_db', owner: 'analyst', size: '720 МБ', tables: 28, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'test_db', owner: 'developer', size: '340 МБ', tables: 18, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'backup_db', owner: 'admin', size: '2.1 ГБ', tables: 67, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'logs_db', owner: 'system', size: '1.8 ГБ', tables: 12, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDbName, setNewDbName] = useState('');
  const [newDbOwner, setNewDbOwner] = useState('admin');

  const handleCreateDatabase = () => {
    if (newDbName.trim()) {
      setDatabases([
        ...databases,
        {
          name: newDbName,
          owner: newDbOwner,
          size: '0 МБ',
          tables: 0,
          encoding: 'UTF8',
          collation: 'uk_UA.UTF-8',
        },
      ]);
      setNewDbName('');
      setShowCreateModal(false);
    }
  };

  const handleDeleteDatabase = (dbName: string) => {
    if (confirm(`Ви впевнені, що хочете видалити базу даних "${dbName}"?`)) {
      setDatabases(databases.filter((db) => db.name !== dbName));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Керування базами даних</h2>
          <p className="text-gray-600">Управління базами даних PostgreSQL</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Створити базу даних
        </button>
      </div>

      {/* Database List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Назва бази даних</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Власник</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Розмір</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Таблиці</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Кодування</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Сортування</th>
                <th className="px-6 py-3 text-right text-gray-700 text-sm">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {databases.map((db) => (
                <tr key={db.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{db.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{db.owner}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{db.size}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{db.tables}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{db.encoding}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{db.collation}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDatabase(db.name)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
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

      {/* Create Database Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-gray-900 mb-4">Створити нову базу даних</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Назва бази даних</label>
                <input
                  type="text"
                  value={newDbName}
                  onChange={(e) => setNewDbName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="my_database"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Власник</label>
                <select
                  value={newDbOwner}
                  onChange={(e) => setNewDbOwner(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin">admin</option>
                  <option value="developer">developer</option>
                  <option value="analyst">analyst</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Кодування</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="UTF8">UTF8</option>
                  <option value="LATIN1">LATIN1</option>
                  <option value="SQL_ASCII">SQL_ASCII</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={handleCreateDatabase}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Створити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
