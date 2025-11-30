import { useState, useEffect } from 'react';
import { Database, Users, LayoutDashboard, Copy, Activity, TrendingUp, FileText } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DatabaseManager from './components/DatabaseManager';
import UserManager from './components/UserManager';
import SystemMonitor from './components/SystemMonitor';
import ReplicaClusters from './components/ReplicaClusters';
import PerformanceAnalyzer from './components/PerformanceAnalyzer';
import Logs from './components/Logs';

type Tab = 'dashboard' | 'databases' | 'users' | 'performance' | 'replicas' | 'monitor' | 'logs';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Панель', icon: LayoutDashboard },
    { id: 'databases' as Tab, label: 'Бази даних', icon: Database },
    { id: 'users' as Tab, label: 'Користувачі', icon: Users },
    { id: 'performance' as Tab, label: 'Продуктивність', icon: TrendingUp },
    { id: 'replicas' as Tab, label: 'Репліки', icon: Copy },
    { id: 'monitor' as Tab, label: 'Моніторинг', icon: Activity },
    { id: 'logs' as Tab, label: 'Логи', icon: FileText },
  ];

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md text-center">
          <Database className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-gray-900 mb-2">PostgreSQL Адміністратор</h2>
          <p className="text-gray-600 mb-6">
            Для роботи з системою управління базами даних використовуйте персональний комп'ютер або ноутбук
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 text-sm">
              Мінімальна ширина екрану: 1024px
            </p>
          </div>
        </div>
      </div>
    );
  }

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
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap group ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                  title={tab.label}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="xl:inline hidden">{tab.label}</span>
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
        {activeTab === 'performance' && <PerformanceAnalyzer />}
        {activeTab === 'replicas' && <ReplicaClusters />}
        {activeTab === 'monitor' && <SystemMonitor />}
        {activeTab === 'logs' && <Logs />}
      </main>
    </div>
  );
}
