import { useState, useEffect } from 'react';
import { Database, Users, LayoutDashboard, Copy, Activity, TrendingUp, FileText, Server, Shield, History, Settings, Terminal, Eye, Home, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Alert, AlertDescription } from './components/ui/alert';
import { Badge } from './components/ui/badge';
import Dashboard from './components/admin/pages/Dashboard';
import DatabaseManager from './components/admin/pages/DatabaseManager';
import UsersManager from './components/admin/pages/UsersManager';
import RolesManager from './components/admin/pages/RolesManager';
import UserUIPreview from './components/admin/pages/UserUIPreview';
import AuditLog from './components/admin/pages/AuditLog';
import PostgresConfig from './components/admin/pages/PostgresConfig';
import CLI from './components/admin/pages/CLI';
import SystemMonitor from './components/admin/pages/SystemMonitor';
import ReplicaClusters from './components/admin/pages/ReplicaClusters';
import PerformanceAnalyzer from './components/admin/pages/PerformanceAnalyzer';
import Logs from './components/admin/Logs';
import HomePage from './components/global/HomePage';
import { UserApplication } from './components/user';
import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Bell, Settings as SettingsIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { Monitor } from 'lucide-react';
import AdminHeader from './components/admin/AdminHeader';
import AdminTabsList from './components/admin/AdminTabsList';

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
        <AdminHeader onHomeClick={() => setCurrentView('home')} />

        {/* Main Content */}
        <main className="p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Tab)} className="space-y-6">
            <AdminTabsList />

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