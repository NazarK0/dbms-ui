import { useTabNavigation } from './hooks/useTabNavigation';
import { useNavigationHandlers } from './hooks/useNavigationHandlers';
import { mockUserRoles } from '../../mockData/user';
import { UserApplicationLayout, ViewRouter } from './user-application';
import type { UserApplicationProps } from './user-application';

export default function UserApplication({ onBack }: UserApplicationProps) {
  // Use custom hooks for tab navigation
  const tabNavigation = useTabNavigation();
  const navigationHandlers = useNavigationHandlers({
    updateActiveTab: tabNavigation.updateActiveTab,
    selectedDatabase: tabNavigation.selectedDatabase,
  });

  // Destructure navigation state
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

  // Destructure navigation handlers
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

  // Handle profile toggle
  const handleProfileToggle = () => {
    updateActiveTab({
      view: currentView === 'profile' ? 'dashboard' : 'profile',
    });
  };

  return (
    <UserApplicationLayout
      userRoles={userRoles}
      currentView={currentView}
      tabs={tabs}
      activeTabId={activeTabId}
      onBack={onBack}
      onProfileToggle={handleProfileToggle}
      onTabChange={handleTabChange}
      onTabClose={handleTabClose}
      onNewTab={handleNewTab}
    >
      <ViewRouter
        currentView={currentView}
        selectedDatabase={selectedDatabase}
        selectedTable={selectedTable}
        recordId={recordId}
        userRoles={userRoles}
        onUpdateActiveTab={updateActiveTab}
        onBackToDashboard={handleBackToDashboard}
        onBackToDatabase={handleBackToDatabase}
        onDatabaseSelect={handleDatabaseSelect}
        onTableSelect={handleTableSelect}
        onCreateRecord={handleCreateRecord}
        onEditRecord={handleEditRecord}
      />
    </UserApplicationLayout>
  );
}
