import { useState } from 'react';
import { Database, Table2, Search } from 'lucide-react';

export default function TableBrowser() {
  const [selectedDatabase, setSelectedDatabase] = useState('production_db');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const databases = {
    production_db: ['users', 'orders', 'products', 'customers', 'payments', 'invoices', 'shipping'],
    staging_db: ['users', 'orders', 'products', 'test_data'],
    analytics_db: ['events', 'user_actions', 'metrics', 'reports'],
  };

  const tableSchema = {
    users: [
      { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
      { column: 'username', type: 'varchar(255)', nullable: false, default: null, key: 'UNI' },
      { column: 'email', type: 'varchar(255)', nullable: false, default: null, key: 'UNI' },
      { column: 'password_hash', type: 'varchar(255)', nullable: false, default: null, key: '' },
      { column: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
      { column: 'updated_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
      { column: 'status', type: 'varchar(50)', nullable: false, default: "'active'", key: '' },
    ],
    orders: [
      { column: 'id', type: 'integer', nullable: false, default: 'nextval()', key: 'PRI' },
      { column: 'user_id', type: 'integer', nullable: false, default: null, key: 'FOR' },
      { column: 'total_amount', type: 'decimal(10,2)', nullable: false, default: null, key: '' },
      { column: 'status', type: 'varchar(50)', nullable: false, default: "'pending'", key: '' },
      { column: 'created_at', type: 'timestamp', nullable: false, default: 'CURRENT_TIMESTAMP', key: '' },
    ],
  };

  const tableData = {
    users: [
      { id: 1, username: 'john_doe', email: 'john@example.com', password_hash: '***', created_at: '2024-01-15', updated_at: '2024-01-15', status: 'active' },
      { id: 2, username: 'jane_smith', email: 'jane@example.com', password_hash: '***', created_at: '2024-01-16', updated_at: '2024-01-16', status: 'active' },
      { id: 3, username: 'bob_wilson', email: 'bob@example.com', password_hash: '***', created_at: '2024-01-17', updated_at: '2024-01-17', status: 'inactive' },
    ],
    orders: [
      { id: 1, user_id: 1, total_amount: '149.99', status: 'completed', created_at: '2024-01-20' },
      { id: 2, user_id: 2, total_amount: '89.50', status: 'pending', created_at: '2024-01-21' },
      { id: 3, user_id: 1, total_amount: '299.00', status: 'shipped', created_at: '2024-01-22' },
    ],
  };

  const currentTables = databases[selectedDatabase as keyof typeof databases] || [];
  const filteredTables = currentTables.filter((table) =>
    table.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        {/* Database Selector */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <label className="block text-sm text-gray-700 mb-2">Select Database</label>
          <select
            value={selectedDatabase}
            onChange={(e) => {
              setSelectedDatabase(e.target.value);
              setSelectedTable(null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="production_db">production_db</option>
            <option value="staging_db">staging_db</option>
            <option value="analytics_db">analytics_db</option>
          </select>
        </div>

        {/* Table List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tables..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredTables.map((table) => (
              <button
                key={table}
                onClick={() => setSelectedTable(table)}
                className={`w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                  selectedTable === table ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <Table2 className="w-4 h-4" />
                <span className="text-sm">{table}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {selectedTable ? (
          <>
            {/* Table Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-gray-900">{selectedTable}</h2>
                  <p className="text-gray-600">
                    {selectedDatabase} • {(tableSchema[selectedTable as keyof typeof tableSchema] || []).length} columns
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Schema */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-gray-900">Schema</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-700 text-sm">Column</th>
                      <th className="px-6 py-3 text-left text-gray-700 text-sm">Type</th>
                      <th className="px-6 py-3 text-left text-gray-700 text-sm">Nullable</th>
                      <th className="px-6 py-3 text-left text-gray-700 text-sm">Default</th>
                      <th className="px-6 py-3 text-left text-gray-700 text-sm">Key</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(tableSchema[selectedTable as keyof typeof tableSchema] || []).map((col, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-900 text-sm">{col.column}</td>
                        <td className="px-6 py-3 text-gray-600 text-sm">
                          <code className="px-2 py-1 bg-gray-100 rounded text-xs">{col.type}</code>
                        </td>
                        <td className="px-6 py-3 text-gray-600 text-sm">
                          {col.nullable ? (
                            <span className="text-yellow-600">Yes</span>
                          ) : (
                            <span className="text-green-600">No</span>
                          )}
                        </td>
                        <td className="px-6 py-3 text-gray-600 text-sm">
                          {col.default ? <code className="text-xs">{col.default}</code> : '—'}
                        </td>
                        <td className="px-6 py-3 text-gray-600 text-sm">
                          {col.key && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {col.key}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Data Preview */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-gray-900">Data Preview (First 100 rows)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {Object.keys((tableData[selectedTable as keyof typeof tableData] || [])[0] || {}).map((key) => (
                        <th key={key} className="px-6 py-3 text-left text-gray-700 text-sm">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(tableData[selectedTable as keyof typeof tableData] || []).map((row: any, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.values(row).map((value: any, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-3 text-gray-600 text-sm">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Table2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No Table Selected</h3>
            <p className="text-gray-600">Select a table from the sidebar to view its schema and data</p>
          </div>
        )}
      </div>
    </div>
  );
}
