import { useState, useEffect } from 'react';
import { Database, Users, LayoutDashboard, Copy, Activity, TrendingUp, FileText, Server, Shield, History, Settings, Terminal, Eye, Home, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Alert, AlertDescription } from './components/ui/alert';
import { Badge } from './components/ui/badge';
import Dashboard from './components/Dashboard';
import DatabaseManager from './components/DatabaseManager';
import UsersManager from './components/UsersManager';
import RolesManager from './components/RolesManager';
import UserUIPreview from './components/UserUIPreview';
import AuditLog from './components/AuditLog';
import PostgresConfig from './components/PostgresConfig';
import CLI from './components/CLI';
import SystemMonitor from './components/SystemMonitor';
import ReplicaClusters from './components/ReplicaClusters';
import PerformanceAnalyzer from './components/PerformanceAnalyzer';
import Logs from './components/Logs';
import HomePage from './components/HomePage';
import { UserApplication } from './components/user';
import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Bell, Settings as SettingsIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { Monitor } from 'lucide-react';

type Tab = 'dashboard' | 'databases' | 'users' | 'roles' | 'userui' | 'audit' | 'config' | 'cli' | 'performance' | 'replicas' | 'monitor' | 'logs';
type View = 'home' | 'admin' | 'user';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Database className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-slate-900 mb-2">PostgreSQL Адміністратор</h2>
          <p className="text-slate-600 mb-6">
            Для роботи з системою управління базами даних використовуйте персональний комп'ютер або ноутбук
          </p>
          <Alert className="bg-blue-50 border-blue-200">
            <Server className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Мінімальна ширина екрану: 1024px
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Home Page
  if (currentView === 'home') {
    return <HomePage onNavigate={setCurrentView} />;
  }

  // User UI (будемо створювати)
  if (currentView === 'user') {
    return <UserApplication onBack={() => setCurrentView('home')} />;
  }

  // Admin Panel
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-yellow-50">
      {/* Mobile Warning */}
      <div className="md:hidden flex items-center justify-center min-h-screen p-6 bg-lime-600">
        <Card className="border-lime-200 shadow-xl max-w-md">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-center">Використовуйте ПК</CardTitle>
            <CardDescription className="text-center">
              Ця система управління базами даних доступна тільки на персональних комп'ютерах та ноутбуках
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Desktop UI */}
      <div className="hidden md:block">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-lime-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('home')}
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
                <div className="w-10 h-10 bg-gradient-to-br from-lime-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-slate-900">PostgreSQL DBMS</h1>
                  <p className="text-slate-600 text-sm">Root Admin Panel</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-2">
                  <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
                  Connected
                </Badge>
                <Button variant="outline" size="icon">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SettingsIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Tab)} className="space-y-6">
            <TabsList className="bg-white shadow-sm border border-slate-200 p-1.5 h-auto inline-flex">
              <TabsTrigger value="dashboard" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <LayoutDashboard className="w-4 h-4" />
                <span className="xl:inline hidden">Панель</span>
              </TabsTrigger>
              <TabsTrigger value="databases" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <Database className="w-4 h-4" />
                <span className="xl:inline hidden">Бази даних</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <Users className="w-4 h-4" />
                <span className="xl:inline hidden">Користувачі</span>
              </TabsTrigger>
              <TabsTrigger value="roles" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <Shield className="w-4 h-4" />
                <span className="xl:inline hidden">Ролі</span>
              </TabsTrigger>
              <TabsTrigger value="userui" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <Eye className="w-4 h-4" />
                <span className="xl:inline hidden">UI Користувача</span>
              </TabsTrigger>
              <TabsTrigger value="audit" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <History className="w-4 h-4" />
                <span className="xl:inline hidden">Аудит</span>
              </TabsTrigger>
              <TabsTrigger value="config" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <Settings className="w-4 h-4" />
                <span className="xl:inline hidden">Конфігурація</span>
              </TabsTrigger>
              <TabsTrigger value="cli" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <Terminal className="w-4 h-4" />
                <span className="xl:inline hidden">CLI</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <TrendingUp className="w-4 h-4" />
                <span className="xl:inline hidden">Продуктивність</span>
              </TabsTrigger>
              <TabsTrigger value="replicas" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <Copy className="w-4 h-4" />
                <span className="xl:inline hidden">Репліки</span>
              </TabsTrigger>
              <TabsTrigger value="monitor" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <Activity className="w-4 h-4" />
                <span className="xl:inline hidden">Моніторинг</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white">
                <FileText className="w-4 h-4" />
                <span className="xl:inline hidden">Логи</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-0">
              <Dashboard />
            </TabsContent>
            <TabsContent value="databases" className="mt-0">
              <DatabaseManager />
            </TabsContent>
            <TabsContent value="users" className="mt-0">
              <UsersManager />
            </TabsContent>
            <TabsContent value="roles" className="mt-0">
              <RolesManager />
            </TabsContent>
            <TabsContent value="userui" className="mt-0">
              <UserUIPreview />
            </TabsContent>
            <TabsContent value="audit" className="mt-0">
              <AuditLog />
            </TabsContent>
            <TabsContent value="config" className="mt-0">
              <PostgresConfig />
            </TabsContent>
            <TabsContent value="cli" className="mt-0">
              <CLI />
            </TabsContent>
            <TabsContent value="performance" className="mt-0">
              <PerformanceAnalyzer />
            </TabsContent>
            <TabsContent value="replicas" className="mt-0">
              <ReplicaClusters />
            </TabsContent>
            <TabsContent value="monitor" className="mt-0">
              <SystemMonitor />
            </TabsContent>
            <TabsContent value="logs" className="mt-0">
              <Logs />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}