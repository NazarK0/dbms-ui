import { useState } from 'react';
import { Plus, Edit, Trash2, Zap, Shield, Search, AlertCircle } from 'lucide-react';

export default function TriggersRules() {
  const [activeView, setActiveView] = useState<'triggers' | 'rules'>('triggers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('production_db');
  const [showCreateTrigger, setShowCreateTrigger] = useState(false);
  const [showCreateRule, setShowCreateRule] = useState(false);

  const triggers = [
    {
      name: 'update_modified_timestamp',
      table: 'users',
      schema: 'public',
      event: 'BEFORE UPDATE',
      timing: 'FOR EACH ROW',
      function: 'update_timestamp()',
      enabled: true,
      description: 'Автоматичне оновлення часової мітки modified_at',
    },
    {
      name: 'log_order_changes',
      table: 'orders',
      schema: 'public',
      event: 'AFTER INSERT OR UPDATE',
      timing: 'FOR EACH ROW',
      function: 'audit_log()',
      enabled: true,
      description: 'Логування змін у замовленнях',
    },
    {
      name: 'validate_email_before_insert',
      table: 'users',
      schema: 'public',
      event: 'BEFORE INSERT',
      timing: 'FOR EACH ROW',
      function: 'check_email_format()',
      enabled: true,
      description: 'Перевірка формату email перед вставкою',
    },
    {
      name: 'update_inventory_stock',
      table: 'order_items',
      schema: 'public',
      event: 'AFTER INSERT',
      timing: 'FOR EACH ROW',
      function: 'decrease_stock()',
      enabled: true,
      description: 'Зменшення залишків при створенні замовлення',
    },
    {
      name: 'prevent_delete_admin',
      table: 'users',
      schema: 'public',
      event: 'BEFORE DELETE',
      timing: 'FOR EACH ROW',
      function: 'protect_admin_users()',
      enabled: true,
      description: 'Запобігання видалення адміністраторів',
    },
  ];

  const rules = [
    {
      name: 'audit_delete_rule',
      table: 'products',
      schema: 'public',
      event: 'DELETE',
      action: 'INSERT INTO deleted_products VALUES (OLD.*)',
      enabled: true,
      description: 'Збереження видалених продуктів в архів',
    },
    {
      name: 'readonly_view_rule',
      table: 'user_stats_view',
      schema: 'public',
      event: 'UPDATE',
      action: 'NOTHING',
      enabled: true,
      description: 'Заборона оновлення представлення статистики',
    },
    {
      name: 'redirect_insert_rule',
      table: 'main_table',
      schema: 'public',
      event: 'INSERT',
      action: 'INSERT INTO archive_table VALUES (NEW.*)',
      enabled: false,
      description: 'Перенаправлення вставок в архівну таблицю',
    },
  ];

  const filteredTriggers = triggers.filter((trigger) =>
    trigger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trigger.table.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRules = rules.filter((rule) =>
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.table.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Тригери та правила</h2>
          <p className="text-gray-600">Керування тригерами та правилами бази даних</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedDatabase}
            onChange={(e) => setSelectedDatabase(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="production_db">production_db</option>
            <option value="staging_db">staging_db</option>
            <option value="analytics_db">analytics_db</option>
          </select>
          {activeView === 'triggers' ? (
            <button
              onClick={() => setShowCreateTrigger(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Створити тригер
            </button>
          ) : (
            <button
              onClick={() => setShowCreateRule(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Створити правило
            </button>
          )}
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-lg border border-gray-200 p-1 inline-flex">
        <button
          onClick={() => setActiveView('triggers')}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            activeView === 'triggers'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          Тригери
        </button>
        <button
          onClick={() => setActiveView('rules')}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            activeView === 'rules'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          Правила
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Пошук ${activeView === 'triggers' ? 'тригерів' : 'правил'}...`}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Triggers Table */}
      {activeView === 'triggers' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-gray-900">Тригери ({filteredTriggers.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Назва</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Таблиця</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Подія</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Тайминг</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Функція</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Опис</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Статус</th>
                  <th className="px-6 py-3 text-right text-gray-700 text-sm">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTriggers.map((trigger) => (
                  <tr key={trigger.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <code className="text-sm text-gray-900">{trigger.name}</code>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{trigger.table}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        {trigger.event}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{trigger.timing}</td>
                    <td className="px-6 py-4">
                      <code className="text-xs text-gray-600">{trigger.function}</code>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs">{trigger.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${trigger.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-gray-600 text-sm">{trigger.enabled ? 'Активний' : 'Вимкнено'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          {trigger.enabled ? 'Вимкнути' : 'Увімкнути'}
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
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
      )}

      {/* Rules Table */}
      {activeView === 'rules' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-gray-900">Правила ({filteredRules.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Назва</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Таблиця</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Подія</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Дія</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Опис</th>
                  <th className="px-6 py-3 text-left text-gray-700 text-sm">Статус</th>
                  <th className="px-6 py-3 text-right text-gray-700 text-sm">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRules.map((rule) => (
                  <tr key={rule.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <code className="text-sm text-gray-900">{rule.name}</code>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{rule.table}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        {rule.event}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs text-gray-600">{rule.action}</code>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs">{rule.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${rule.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-gray-600 text-sm">{rule.enabled ? 'Активне' : 'Вимкнено'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          {rule.enabled ? 'Вимкнути' : 'Увімкнути'}
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
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
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-1">Інформація</h4>
            <p className="text-blue-700 text-sm">
              {activeView === 'triggers'
                ? 'Тригери автоматично виконують функції при певних подіях в таблиці. Використовуйте їх для забезпечення цілісності даних та автоматизації.'
                : 'Правила перезаписують стандартну поведінку операцій DML. Зверніть увагу, що тригери зазвичай більш гнучкі та рекомендовані для використання.'}
            </p>
          </div>
        </div>
      </div>

      {/* Create Trigger Modal */}
      {showCreateTrigger && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-gray-900 mb-4">Створити новий тригер</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Назва тригера</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="my_trigger"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Таблиця</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="table_name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Подія</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="INSERT">INSERT</option>
                    <option value="UPDATE">UPDATE</option>
                    <option value="DELETE">DELETE</option>
                    <option value="TRUNCATE">TRUNCATE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Тайминг</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="BEFORE">BEFORE</option>
                    <option value="AFTER">AFTER</option>
                    <option value="INSTEAD OF">INSTEAD OF</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Функція</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="function_name()"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Опис</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Опис тригера"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateTrigger(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={() => setShowCreateTrigger(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Створити тригер
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Rule Modal */}
      {showCreateRule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-gray-900 mb-4">Створити нове правило</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Назва правила</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="my_rule"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Таблиця</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="table_name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Подія</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="SELECT">SELECT</option>
                  <option value="INSERT">INSERT</option>
                  <option value="UPDATE">UPDATE</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Дія</label>
                <textarea
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="INSERT INTO audit_table VALUES (OLD.*);"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Опис</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Опис правила"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateRule(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={() => setShowCreateRule(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Створити правило
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
