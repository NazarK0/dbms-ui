import { useState } from 'react';
import { Plus, Edit, Trash2, Play, Code, Search } from 'lucide-react';

export default function FunctionsManager({ selectedDatabase }: { selectedDatabase?: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDatabase, setCurrentDatabase] = useState(selectedDatabase || 'production_db');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);

  const functions = [
    {
      name: 'calculate_order_total',
      schema: 'public',
      returnType: 'numeric',
      language: 'plpgsql',
      arguments: 'order_id integer',
      description: 'Розрахунок загальної суми замовлення',
      volatility: 'STABLE',
      lastModified: '2024-11-20 14:30:00',
    },
    {
      name: 'get_user_stats',
      schema: 'public',
      returnType: 'TABLE(total_orders int, total_spent numeric)',
      language: 'plpgsql',
      arguments: 'user_id integer',
      description: 'Отримання статистики користувача',
      volatility: 'STABLE',
      lastModified: '2024-11-18 09:15:00',
    },
    {
      name: 'validate_email',
      schema: 'public',
      returnType: 'boolean',
      language: 'plpgsql',
      arguments: 'email text',
      description: 'Перевірка валідності email адреси',
      volatility: 'IMMUTABLE',
      lastModified: '2024-11-15 16:45:00',
    },
    {
      name: 'generate_report',
      schema: 'analytics',
      returnType: 'json',
      language: 'plpgsql',
      arguments: 'start_date date, end_date date',
      description: 'Генерація аналітичного звіту',
      volatility: 'STABLE',
      lastModified: '2024-11-25 11:20:00',
    },
    {
      name: 'update_inventory',
      schema: 'public',
      returnType: 'void',
      language: 'plpgsql',
      arguments: 'product_id integer, quantity integer',
      description: 'Оновлення інвентарю товару',
      volatility: 'VOLATILE',
      lastModified: '2024-11-22 13:10:00',
    },
  ];

  const filteredFunctions = functions.filter((func) =>
    func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    func.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const functionTemplate = `CREATE OR REPLACE FUNCTION function_name(param1 type1, param2 type2)
RETURNS return_type AS $$
BEGIN
    -- Код функції тут
    RETURN result;
END;
$$ LANGUAGE plpgsql;`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Менеджер функцій</h2>
          <p className="text-gray-600">Керування користувацькими функціями PostgreSQL</p>
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
            </select>
          )}
          {selectedDatabase && (
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
              {selectedDatabase}
            </div>
          )}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Створити функцію
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
            placeholder="Пошук функцій..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Functions List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-900">Функції ({filteredFunctions.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Назва</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Схема</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Аргументи</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Повертає</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Мова</th>
                <th className="px-6 py-3 text-left text-gray-700 text-sm">Опис</th>
                <th className="px-6 py-3 text-right text-gray-700 text-sm">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFunctions.map((func) => (
                <tr key={func.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <code className="text-sm text-gray-900">{func.name}</code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{func.schema}</td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-gray-600">{func.arguments}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {func.returnType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {func.language}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs">{func.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedFunction(func.name)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
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

      {/* Function Details */}
      {selectedFunction && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Деталі функції: {selectedFunction}</h3>
            <button
              onClick={() => setSelectedFunction(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-sm overflow-x-auto">
              <code>{`CREATE OR REPLACE FUNCTION calculate_order_total(order_id integer)
RETURNS numeric AS $$
DECLARE
    total numeric := 0;
BEGIN
    SELECT SUM(quantity * price)
    INTO total
    FROM order_items
    WHERE order_id = $1;
    
    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql STABLE;`}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Create Function Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-gray-900 mb-4">Створити нову функцію</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Назва функції</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="my_function"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Схема</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="public">public</option>
                    <option value="analytics">analytics</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Мова</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="plpgsql">PL/pgSQL</option>
                    <option value="sql">SQL</option>
                    <option value="plpython3u">PL/Python</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Тип повернення</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="integer, text, void тощо"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Код функції</label>
                <textarea
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={functionTemplate}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Опис</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Опис функції"
                />
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
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Створити функцію
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}