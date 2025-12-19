/**
 * Types for BrowserTabs component
 */

export type TabType = 'dashboard' | 'database' | 'table';

export type TabView = 'dashboard' | 'database-tables' | 'table' | 'create-record' | 'edit-record';

export interface TabData {
  database?: string;
  table?: string;
  permissions?: string[];
  highlightRecordId?: string;
}

export interface SelectedTable {
  database: string;
  table: string;
  permissions: string[];
  highlightRecordId?: string;
}

export interface Tab {
  id: string;
  type: TabType;
  title: string;
  icon?: React.ReactNode;
  data?: TabData;
  // Tab state
  view?: TabView;
  selectedDatabase?: string | null;
  selectedTable?: SelectedTable | null;
  recordId?: string | null;
}

export interface BrowserTabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onNewTab?: () => void;
}

export interface ScrollState {
  canScrollLeft: boolean;
  canScrollRight: boolean;
}
