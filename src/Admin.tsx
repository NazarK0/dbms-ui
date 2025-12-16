import { useState, lazy, Suspense } from 'react';
import { Tabs, TabsContent } from './components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Monitor } from 'lucide-react';
import AdminHeader from './components/admin/AdminHeader';
import AdminTabsList from './components/admin/AdminTabsList';
import { AdminUserProvider } from './contexts/AdminUserContext';
import { SkeletonCardGrid } from './components/ui/skeletons';

// Lazy load heavy page components
const Dashboard = lazy(() => import('./components/admin/pages/Dashboard'));
const DatabaseManager = lazy(() => import('./components/admin/pages/DatabaseManager'));
const UsersManager = lazy(() => import('./components/admin/pages/UsersManager'));
const RolesManager = lazy(() => import('./components/admin/pages/RolesManager'));
const UserUIPreview = lazy(() => import('./components/admin/pages/UserUIPreview'));
const AuditLog = lazy(() => import('./components/admin/pages/AuditLog'));
const PostgresConfig = lazy(() => import('./components/admin/pages/PostgresConfig'));
const CLI = lazy(() => import('./components/admin/pages/CLI'));
const SystemMonitor = lazy(() => import('./components/admin/pages/SystemMonitor'));
const ReplicaClusters = lazy(() => import('./components/admin/pages/ReplicaClusters'));
const PerformanceAnalyzer = lazy(() => import('./components/admin/pages/PerformanceAnalyzer'));
const Logs = lazy(() => import('./components/admin/Logs'));

type Tab = 'dashboard' | 'databases' | 'users' | 'roles' | 'userui' | 'audit' | 'config' | 'cli' | 'performance' | 'replicas' | 'monitor' | 'logs';

interface AdminProps {
  onBack: () => void;
}

// Loading fallback for tab content
function TabLoading() {
  return (
    <div className="space-y-6">
      <SkeletonCardGrid count={6} columns={3} />
    </div>
  );
}

export default function Admin({ onBack }: AdminProps) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <AdminUserProvider>
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
        <AdminHeader onHomeClick={onBack} />

        {/* Main Content */}
        <main className="p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Tab)} className="space-y-6">
            <AdminTabsList />

            <TabsContent value="dashboard" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <Dashboard />
              </Suspense>
            </TabsContent>
            <TabsContent value="databases" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <DatabaseManager />
              </Suspense>
            </TabsContent>
            <TabsContent value="users" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <UsersManager />
              </Suspense>
            </TabsContent>
            <TabsContent value="roles" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <RolesManager />
              </Suspense>
            </TabsContent>
            <TabsContent value="userui" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <UserUIPreview />
              </Suspense>
            </TabsContent>
            <TabsContent value="audit" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <AuditLog />
              </Suspense>
            </TabsContent>
            <TabsContent value="config" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <PostgresConfig />
              </Suspense>
            </TabsContent>
            <TabsContent value="cli" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <CLI />
              </Suspense>
            </TabsContent>
            <TabsContent value="performance" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <PerformanceAnalyzer />
              </Suspense>
            </TabsContent>
            <TabsContent value="replicas" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <ReplicaClusters />
              </Suspense>
            </TabsContent>
            <TabsContent value="monitor" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <SystemMonitor />
              </Suspense>
            </TabsContent>
            <TabsContent value="logs" className="mt-0">
              <Suspense fallback={<TabLoading />}>
                <Logs />
              </Suspense>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
    </AdminUserProvider>
  );
}