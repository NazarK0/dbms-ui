import { useState } from 'react';
import { Database, Users, Terminal, Table2, Activity, Settings, LayoutDashboard, Archive, Copy, Puzzle, Code, Zap } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DatabaseManager from './components/DatabaseManager';
import UserManager from './components/UserManager';
import QueryExecutor from './components/QueryExecutor';
import TableBrowser from './components/TableBrowser';
import SystemMonitor from './components/SystemMonitor';
import BackupRestore from './components/BackupRestore';
import ReplicaClusters from './components/ReplicaClusters';
import ExtensionManager from './components/ExtensionManager';
import FunctionsManager from './components/FunctionsManager';
import TriggersRules from './components/TriggersRules';

type Tab = 'dashboard' | 'databases' | 'users' | 'query' | 'tables' | 'backup' | 'replicas' | 'extensions' | 'functions' | 'triggers' | 'monitor';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Панель', icon: LayoutDashboard },
    { id: 'databases' as Tab, label: 'Бази даних', icon: Database },
    { id: 'users' as Tab, label: 'Користувачі', icon: Users },
    { id: 'query' as Tab, label: 'Запити', icon: Terminal },
    { id: 'tables' as Tab, label: 'Таблиці', icon: Table2 },
    { id: 'extensions' as Tab, label: 'Розширення', icon: Puzzle },
    { id: 'functions' as Tab, label: 'Функції', icon: Code },
    { id: 'triggers' as Tab, label: 'Тригери', icon: Zap },
    { id: 'backup' as Tab, label: 'Резервні копії', icon: Archive },
    { id: 'replicas' as Tab, label: 'Репліки', icon: Copy },
    { id: 'monitor' as Tab, label: 'Моніторинг', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">PostgreSQL Адміністратор</h1>
                <p className="text-gray-500 text-sm">Консоль суперадміністратора</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Підключено</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">root@localhost:5432</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'databases' && <DatabaseManager />}
        {activeTab === 'users' && <UserManager />}
        {activeTab === 'query' && <QueryExecutor />}
        {activeTab === 'tables' && <TableBrowser />}
        {activeTab === 'extensions' && <ExtensionManager />}
        {activeTab === 'functions' && <FunctionsManager />}
        {activeTab === 'triggers' && <TriggersRules />}
        {activeTab === 'backup' && <BackupRestore />}
        {activeTab === 'replicas' && <ReplicaClusters />}
        {activeTab === 'monitor' && <SystemMonitor />}
      </main>
    </div>
  );
}
