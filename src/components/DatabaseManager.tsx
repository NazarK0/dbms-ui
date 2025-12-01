import { useState } from 'react';
import { Plus, Trash2, Edit, Copy, Download, Upload, FileCode, Terminal, Table2, Network, Puzzle, Code, Zap, Archive, X } from 'lucide-react';
import QueryExecutor from './QueryExecutor';
import TableBrowser from './TableBrowser';
import SchemaVisualizer from './SchemaVisualizer';
import ExtensionManager from './ExtensionManager';
import FunctionsManager from './FunctionsManager';
import TriggersRules from './TriggersRules';
import BackupRestore from './BackupRestore';

type SubTab = 'query' | 'tables' | 'schema' | 'extensions' | 'functions' | 'triggers' | 'backup';

export default function DatabaseManager() {
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('tables');
  const [databases, setDatabases] = useState([
    { name: 'production_db', owner: 'admin', size: '1.2 ГБ', tables: 45, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'staging_db', owner: 'admin', size: '850 МБ', tables: 42, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'analytics_db', owner: 'analyst', size: '720 МБ', tables: 28, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'test_db', owner: 'developer', size: '340 МБ', tables: 18, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'backup_db', owner: 'admin', size: '2.1 ГБ', tables: 67, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
    { name: 'logs_db', owner: 'system', size: '1.8 ГБ', tables: 12, encoding: 'UTF8', collation: 'uk_UA.UTF-8' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedDb, setSelectedDb] = useState<string | null>(null);
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
      if (selectedDatabase === dbName) {
        setSelectedDatabase(null);
      }
    }
  };

  const handleSelectDatabase = (dbName: string) => {
    setSelectedDatabase(dbName);
    setActiveSubTab('tables');
  };

  const subTabs = [
    { id: 'query' as SubTab, label: 'Запити', icon: Terminal },
    { id: 'tables' as SubTab, label: 'Таблиці', icon: Table2 },
    { id: 'schema' as SubTab, label: 'Схема БД', icon: Network },
    { id: 'extensions' as SubTab, label: 'Розширення', icon: Puzzle },
    { id: 'functions' as SubTab, label: 'Функції', icon: Code },
    { id: 'triggers' as SubTab, label: 'Тригери', icon: Zap },
    { id: 'backup' as SubTab, label: 'Резервні копії', icon: Archive },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Керування базами даних</h2>
          <p className="text-gray-600">Управління базами даних PostgreSQL</p>
        </div>
        {!selectedDatabase && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Імпорт схеми
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Створити базу даних
            </button>
          </div>
        )}
      </div>

      {/* Selected Database Info & Close */}
      {selectedDatabase && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Copy className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-blue-900">Обрана база даних</p>
              <p className="text-blue-700 text-sm">{selectedDatabase}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedDatabase(null)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <X className="w-4 h-4" />
            Закрити
          </button>
        </div>
      )}

      {/* Sub Navigation - показується тільки коли вибрана БД */}
      {selectedDatabase && (
        <div className="bg-white rounded-lg border border-gray-200 p-1 inline-flex">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                  activeSubTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Content */}
      {!selectedDatabase ? (
        // Database List - показується тільки коли не вибрана БД
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-gray-900">Список баз даних</h3>
            <p className="text-gray-600 text-sm mt-1">Клацніть на рядок для відкриття деталей бази даних</p>
          </div>
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
                  <tr 
                    key={db.name} 
                    onClick={() => handleSelectDatabase(db.name)}
                    className="hover:bg-blue-50 cursor-pointer transition-colors"
                  >
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
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedDb(db.name);
                            setShowExportModal(true);
                          }}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Експорт схеми"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDb(db.name);
                            setShowCopyModal(true);
                          }}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Копіювати БД"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
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
      ) : (
        // Sub-components - показується тільки коли вибрана БД
        <>
          {activeSubTab === 'query' && <QueryExecutor selectedDatabase={selectedDatabase} />}
          {activeSubTab === 'tables' && <TableBrowser selectedDatabase={selectedDatabase} />}
          {activeSubTab === 'schema' && <SchemaVisualizer selectedDatabase={selectedDatabase} />}
          {activeSubTab === 'extensions' && <ExtensionManager selectedDatabase={selectedDatabase} />}
          {activeSubTab === 'functions' && <FunctionsManager selectedDatabase={selectedDatabase} />}
          {activeSubTab === 'triggers' && <TriggersRules selectedDatabase={selectedDatabase} />}
          {activeSubTab === 'backup' && <BackupRestore selectedDatabase={selectedDatabase} />}
        </>
      )}

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

      {/* Copy Database Modal */}
      {showCopyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-gray-900 mb-4">Копіювати базу даних</h3>
            <p className="text-gray-600 text-sm mb-4">
              Створити копію бази даних "{selectedDb}" з усіма таблицями та даними
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Назва нової бази даних</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`${selectedDb}_copy`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Тип копіювання</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="full">Повна копія (структура + дані)</option>
                  <option value="schema">Тільки структура</option>
                  <option value="data">Структура + дані (без індексів)</option>
                </select>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-900 text-sm">
                  <strong>Примітка:</strong> Копіювання великих баз даних може зайняти деякий час.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCopyModal(false);
                  setSelectedDb(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={() => {
                  setShowCopyModal(false);
                  setSelectedDb(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Копіювати
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Schema Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-gray-900 mb-4">Експорт схеми бази даних</h3>
            <p className="text-gray-600 text-sm mb-4">
              Експортувати схему бази даних "{selectedDb}"
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Формат експорту</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="sql">SQL (pg_dump)</option>
                  <option value="custom">Custom (pg_dump -Fc)</option>
                  <option value="tar">TAR архів</option>
                  <option value="directory">Директорія</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Що експортувати</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Структура таблиць</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Дані</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Індекси</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Тригери та функції</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Права доступу</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowExportModal(false);
                  setSelectedDb(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={() => {
                  setShowExportModal(false);
                  setSelectedDb(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Експортувати
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Schema Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-gray-900 mb-4">Імпорт схеми бази даних</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Цільова база даних</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Створити нову базу даних</option>
                  {databases.map((db) => (
                    <option key={db.name} value={db.name}>{db.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Файл схеми</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <FileCode className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Перетягніть файл сюди або клацніть для вибору</p>
                  <p className="text-xs text-gray-500 mt-1">SQL, Custom, TAR файли</p>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Параметри імпорту</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">Очистити цільову БД перед імпортом</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-700">Ігнорувати помилки</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">Відключити тригери під час імпорту</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Скасувати
              </button>
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Імпортувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
