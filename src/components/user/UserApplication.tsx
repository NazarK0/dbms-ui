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
import UserApplicationHeader from './UserApplicationHeader';
import { useTabNavigation } from './hooks/useTabNavigation';
import { useNavigationHandlers } from './hooks/useNavigationHandlers';
import { mockUserRoles } from './data/mockUserRoles';

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
  // Use custom hooks
  const tabNavigation = useTabNavigation();
  const navigationHandlers = useNavigationHandlers({
    updateActiveTab: tabNavigation.updateActiveTab,
    selectedDatabase: tabNavigation.selectedDatabase,
  });

  const {
    tabs,
    activeTabId,
    currentView,
    selectedDatabase,
    selectedTable,
    recordId,
    updateActiveTab,
    handleTabChange,
    handleTabClose,
    handleNewTab,
  } = tabNavigation;

  const {
    handleTableSelect,
    handleBackToDatabase,
    handleDatabaseSelect,
    handleBackToDashboard,
    handleCreateRecord,
    handleEditRecord,
  } = navigationHandlers;

  // Mock user roles
  const userRoles = mockUserRoles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <UserApplicationHeader
          userRoles={userRoles}
          currentView={currentView}
          onBack={onBack}
          onProfileToggle={() => updateActiveTab({ view: currentView === 'profile' ? 'dashboard' : 'profile' })}
        />

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