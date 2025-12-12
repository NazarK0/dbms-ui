import { useState } from 'react';
import { LayoutDashboard, ArrowLeft, Bell, Settings, Users } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import BrowserTabs, { Tab } from './BrowserTabs';
import UserDashboard from './UserDashboard';
import DatabaseBrowser from './DatabaseBrowser';
import TableDataEditor from './TableDataEditor';
import UserProfile from './UserProfile';
import CreateRecord from './CreateRecord';
import EditRecord from './EditRecord';

type View = 'dashboard' | 'database-tables' | 'table' | 'create-record' | 'edit-record' | 'profile';

interface UserRole {
  id: number;
  name: string;
  color: string;
  permissions: string[];
}

interface UserApplicationProps {
  onBack: () => void;
}

export default function UserApplication({ onBack }: UserApplicationProps) {
  // Tabs state
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'dashboard',
      type: 'dashboard',
      title: 'Dashboard',
      view: 'dashboard',
      selectedDatabase: null,
      selectedTable: null,
      recordId: null,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState('dashboard');

  // Get current active tab
  const activeTab = tabs.find(t => t.id === activeTabId);
  const currentView = activeTab?.view || 'dashboard';
  const selectedDatabase = activeTab?.selectedDatabase || null;
  const selectedTable = activeTab?.selectedTable || null;
  const recordId = activeTab?.recordId || null;

  // Update active tab state
  const updateActiveTab = (updates: Partial<Tab>) => {
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, ...updates }
        : tab
    ));
  };

  // Mock user roles - in real app, this would come from authentication/authorization
  const userRoles: UserRole[] = [
    {
      id: 1,
      name: 'Developer',
      color: 'bg-violet-100 text-violet-700 border-violet-300',
      permissions: [
        'Database: app_production (SELECT, INSERT, UPDATE, DELETE)',
        'Database: app_staging (SELECT, INSERT, UPDATE)',
        'Table: users (RLS enabled)',
        'Table: orders (RLS enabled)',
        'Table: products (Full access)',
      ],
    },
    {
      id: 2,
      name: 'Data Analyst',
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      permissions: [
        'Database: app_production (SELECT)',
        'Database: app_analytics (SELECT)',
        'Table: orders (RLS enabled)',
        'Table: audit_logs (SELECT only)',
      ],
    },
  ];

  const handleTableSelect = (database: string, table: string, permissions: string[], highlightRecordId?: string) => {
    // Update current tab instead of creating new one
    updateActiveTab({
      type: 'table',
      title: table,
      view: 'table',
      selectedDatabase: database,
      selectedTable: { database, table, permissions, highlightRecordId },
      recordId: null,
    });
  };

  const handleBackToDatabase = () => {
    // Update current tab to show database tables
    updateActiveTab({
      type: 'database',
      title: selectedDatabase || 'Database',
      view: 'database-tables',
      selectedTable: null,
      recordId: null,
    });
  };

  const handleDatabaseSelect = (database: string) => {
    // Update current tab instead of creating new one
    updateActiveTab({
      type: 'database',
      title: database,
      view: 'database-tables',
      selectedDatabase: database,
      selectedTable: null,
      recordId: null,
    });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    // Tab state is automatically updated through activeTab derived state
  };

  const handleTabClose = (tabId: string) => {
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    if (tabIndex === -1) return;

    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    // If closing active tab, switch to previous or next tab
    if (tabId === activeTabId) {
      const newActiveTab = newTabs[Math.max(0, tabIndex - 1)];
      if (newActiveTab) {
        handleTabChange(newActiveTab.id);
      }
    }
  };

  const handleBackToDashboard = () => {
    // Update current tab back to dashboard view
    updateActiveTab({
      type: 'dashboard',
      title: 'Dashboard',
      view: 'dashboard',
      selectedDatabase: null,
      selectedTable: null,
      recordId: null,
    });
  };

  const handleNewTab = () => {
    // Create new dashboard tab
    const newTab: Tab = {
      id: `dashboard-${Date.now()}`,
      type: 'dashboard',
      title: 'Dashboard',
      view: 'dashboard',
      selectedDatabase: null,
      selectedTable: null,
      recordId: null,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCreateRecord = () => {
    // Update current tab to create-record view
    updateActiveTab({
      view: 'create-record',
    });
  };

  const handleEditRecord = (id: string) => {
    // Update current tab to edit-record view
    updateActiveTab({
      view: 'edit-record',
      recordId: id,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="border-b border-violet-200/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Home
                </Button>
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-slate-900">User Application</h1>
                  <p className="text-slate-600 text-sm">Система управління даними</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {userRoles.map((role) => (
                    <Badge key={role.id} variant="outline" className={role.color}>
                      {role.name}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="icon">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => updateActiveTab({ view: currentView === 'profile' ? 'dashboard' : 'profile' })}
                  className={currentView === 'profile' ? 'bg-violet-100 border-violet-300' : ''}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Browser Tabs */}
        {currentView !== 'profile' && (
          <BrowserTabs
            tabs={tabs}
            activeTabId={activeTabId}
            onTabChange={handleTabChange}
            onTabClose={handleTabClose}
            onNewTab={handleNewTab}
          />
        )}
      </header>

      {/* Main Content */}
      <main className="p-6">
        {currentView === 'profile' ? (
          // Profile View
          <UserProfile userRoles={userRoles} onBack={() => updateActiveTab({ view: 'dashboard' })} />
        ) : currentView === 'create-record' && selectedTable ? (
          // Create Record View
          <CreateRecord
            database={selectedTable.database}
            table={selectedTable.table}
            onBack={() => updateActiveTab({ view: 'table' })}
            onSave={(data) => {
              console.log('Saved:', data);
              updateActiveTab({ view: 'table' });
            }}
          />
        ) : currentView === 'edit-record' && selectedTable && recordId ? (
          // Edit Record View
          <EditRecord
            database={selectedTable.database}
            table={selectedTable.table}
            recordId={recordId}
            initialData={{
              id: recordId,
              name: 'John Doe',
              email: 'john@example.com',
              bio: 'Software developer',
              age: 30,
              is_active: true,
              role: 'admin',
              department: 'Engineering',
              phone: '+380501234567',
              address: 'Kyiv, Ukraine',
              notes: 'Some notes',
              created_at: '2024-01-15T10:30:00',
              updated_at: '2024-02-10T14:20:00',
              attachments: ['resume.pdf', 'certificate.jpg', 'project-plan.xlsx'],
            }}
            onBack={() => updateActiveTab({ view: 'table' })}
            onSave={(data) => {
              console.log('Updated:', data);
              updateActiveTab({ view: 'table' });
            }}
            onDelete={(id) => {
              console.log('Deleted:', id);
              updateActiveTab({ view: 'table' });
            }}
            canDelete={selectedTable.permissions.includes('DELETE')}
          />
        ) : currentView === 'table' && selectedTable ? (
          // Table Data Editor View
          <TableDataEditor
            database={selectedTable.database}
            table={selectedTable.table}
            permissions={selectedTable.permissions}
            highlightRecordId={selectedTable.highlightRecordId}
            onBack={handleBackToDatabase}
            onCreateRecord={handleCreateRecord}
            onEditRecord={(record) => handleEditRecord(record.id.toString())}
          />
        ) : currentView === 'database-tables' && selectedDatabase ? (
          // Database Tables Browser
          <DatabaseBrowser 
            onTableSelect={handleTableSelect} 
            selectedDatabase={selectedDatabase}
            onBack={handleBackToDashboard}
          />
        ) : (
          // Dashboard View
          <UserDashboard 
            userRoles={userRoles} 
            onDatabaseSelect={handleDatabaseSelect}
            onTableSelect={handleTableSelect}
          />
        )}
      </main>
    </div>
  );
}