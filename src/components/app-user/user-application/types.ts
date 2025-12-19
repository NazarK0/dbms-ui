/**
 * TypeScript types for UserApplication component
 */

import type { SelectedTable, Tab } from '../browser-tabs';

export type View = 'dashboard' | 'database-tables' | 'table' | 'create-record' | 'edit-record' | 'profile';

export interface UserRole {
  id: number;
  name: string;
  color: string;
  permissions: string[];
}

export interface UserApplicationProps {
  onBack: () => void;
}

// Re-export SelectedTable from browser-tabs for convenience
export type { SelectedTable };

export interface ViewRouterProps {
  currentView: View;
  selectedDatabase: string | null;
  selectedTable: SelectedTable | null;
  recordId: string | null;
  userRoles: UserRole[];
  onUpdateActiveTab: (update: { view: View }) => void;
  onBackToDashboard: () => void;
  onBackToDatabase: () => void;
  onDatabaseSelect: (database: string) => void;
  onTableSelect: (database: string, table: string, permissions: string[]) => void;
  onCreateRecord: () => void;
  onEditRecord: (recordId: string) => void;
}

export interface UserApplicationLayoutProps {
  userRoles: UserRole[];
  currentView: View;
  tabs: Tab[];
  activeTabId: string | null;
  children: React.ReactNode;
  onBack: () => void;
  onProfileToggle: () => void;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onNewTab: () => void;
}