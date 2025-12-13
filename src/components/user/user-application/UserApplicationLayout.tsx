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
  onBack,
  onProfileToggle,
  onTabChange,
  onTabClose,
  onNewTab,
}: UserApplicationLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <UserApplicationHeader
          userRoles={userRoles}
          currentView={currentView}
          onBack={onBack}
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
      <main className="p-6">{children}</main>
    </div>
  );
}
