import { useState } from 'react';
import { Tab } from '../BrowserTabs';

export function useTabNavigation() {
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

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
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

  const handleNewTab = () => {
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

  return {
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
  };
}
