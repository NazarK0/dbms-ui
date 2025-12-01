import { useState } from 'react';
import { Plus, Trash2, RefreshCw, Search, CheckCircle, AlertCircle, Download } from 'lucide-react';

export default function ExtensionManager({ selectedDatabase }: { selectedDatabase?: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDatabase, setCurrentDatabase] = useState(selectedDatabase || 'production_db');

  const installedExtensions = [
    {
      name: 'pg_stat_statements',
      version: '1.10',
      schema: 'public',
      description: 'Відстежування статистики виконання всіх SQL операторів',
      status: 'активне',
      size: '256 KB',
    },
    {
      name: 'uuid-ossp',
      version: '1.1',
      schema: 'public',
      description: 'Генератор універсальних унікальних ідентифікаторів (UUID)',
      status: 'активне',
      size: '128 KB',
    },
    {
      name: 'postgis',
      version: '3.3.3',
      schema: 'public',
      description: 'Геопросторові об\'єкти для PostgreSQL',
      status: 'активне',
      size: '8.2 MB',
    },
    {
      name: 'hstore',
      version: '1.8',
      schema: 'public',
      description: 'Тип даних для зберігання пар ключ/значення',
      status: 'активне',
      size: '192 KB',
    },
    {
      name: 'pg_trgm',
      version: '1.6',
      schema: 'public',
      description: 'Підтримка схожості тексту та пошук за індексами',
      status: 'активне',
      size: '384 KB',
    },
  ];

  const availableExtensions = [
    {
      name: 'pgcrypto',
      version: '1.3',
      description: 'Криптографічні функції',
      popular: true,
    },
    {
      name: 'pg_partman',
      version: '4.7.4',
      description: 'Управління секціонуванням таблиць',
      popular: true,
    },
    {
      name: 'timescaledb',
      version: '2.11.2',
      description: 'База даних часових рядів на основі PostgreSQL',
      popular: true,
    },
    {
      name: 'pg_repack',
      version: '1.4.8',
      description: 'Реорганізація таблиць без блокування',
      popular: false,
    },
    {
      name: 'postgres_fdw',
      version: '1.1',
      description: 'Обгортка сторонніх даних для віддалених серверів PostgreSQL',
      popular: false,
    },
    {
      name: 'plpgsql',
      version: '1.0',
      description: 'Процедурна мова PL/pgSQL',
      popular: true,
    },
  ];

  const filteredInstalled = installedExtensions.filter((ext) =>
    ext.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailable = availableExtensions.filter((ext) =>
    ext.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Менеджер розширень</h2>
          <p className="text-gray-600">Керування розширеннями PostgreSQL</p>
        </div>
        <div className="flex items-center gap-3">
          {!selectedDatabase && (
            <select
              value={currentDatabase}
              onChange={(e) => setCurrentDatabase(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="production_db">production_db</option>
              <option value="staging_db">staging_db</option>
              <option value="analytics_db">analytics_db</option>
              <option value="test_db">test_db</option>
            </select>
          )}
          {selectedDatabase && (
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
              {selectedDatabase}
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Оновити
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Пошук розширень..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Installed Extensions */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Встановлені розширення ({filteredInstalled.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Назва</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Версія</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Схема</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Опис</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Розмір</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Статус</th>
                <th className="px-6 py-3 text-right text-gray-700 text-sm">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInstalled.map((ext) => (
                <tr key={ext.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <code className="text-sm text-gray-900">{ext.name}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{ext.version}</td>
                  <td className="px-6 py-4 text-gray-600">{ext.schema}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs">{ext.description}</td>
                  <td className="px-6 py-4 text-gray-600">{ext.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 text-sm">{ext.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        Оновити
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

      {/* Available Extensions */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Доступні розширення</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAvailable.map((ext) => (
              <div key={ext.name} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <code className="text-gray-900">{ext.name}</code>
                      {ext.popular && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">
                          Популярне
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mt-1">v{ext.version}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{ext.description}</p>
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Встановити
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Extension Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-1">Важлива інформація</h4>
            <p className="text-blue-700 text-sm">
              Встановлення або видалення розширень може вплинути на продуктивність бази даних. 
              Переконайтеся, що ви розумієте призначення розширення перед його встановленням.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}