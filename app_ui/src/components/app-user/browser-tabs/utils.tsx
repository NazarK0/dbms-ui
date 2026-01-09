/**
 * Utility functions for BrowserTabs component
 */

import { LayoutDashboard, Database, Table } from 'lucide-react';
import type { Tab, TabType } from './types';

/**
 * Get icon component for tab type
 */
export function getTabIcon(tab: Tab): React.ReactNode {
  if (tab.icon) return tab.icon;

  return getIconByType(tab.type);
}

/**
 * Get default icon by tab type
 */
export function getIconByType(type: TabType): React.ReactNode {
  switch (type) {
    case 'dashboard':
      return <LayoutDashboard className="w-3.5 h-3.5" />;
    case 'database':
      return <Database className="w-3.5 h-3.5" />;
    case 'table':
      return <Table className="w-3.5 h-3.5" />;
    default:
      return <LayoutDashboard className="w-3.5 h-3.5" />;
  }
}

/**
 * Check if tab can be closed
 */
export function canCloseTab(totalTabs: number): boolean {
  return totalTabs > 1;
}

/**
 * Calculate scroll state
 */
export function calculateScrollState(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number
): { canScrollLeft: boolean; canScrollRight: boolean } {
  return {
    canScrollLeft: scrollLeft > 0,
    canScrollRight: scrollLeft < scrollWidth - clientWidth - 1,
  };
}
