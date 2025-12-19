import UserApplicationHeader from '../UserApplicationHeader';
import BrowserTabs from '../BrowserTabs';
import type { UserApplicationLayoutProps } from './types';

/**
 * Layout wrapper for UserApplication
 * Provides consistent layout with header, browser tabs, and main content area
 */
export default function UserApplicationLayout({
  userRoles,
  currentView,
  tabs,
  activeTabId,
  children,
  onProfileToggle,
  onTabChange,
  onTabClose,
  onNewTab,
}: UserApplicationLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm flex-shrink-0">
        <UserApplicationHeader
          userRoles={userRoles}
          currentView={currentView}
          onProfileToggle={onProfileToggle}
        />

        {/* Browser Tabs */}
        {currentView !== 'profile' && (
          <BrowserTabs
            tabs={tabs}
            activeTabId={activeTabId}
            onTabChange={onTabChange}
            onTabClose={onTabClose}
            onNewTab={onNewTab}
          />
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}