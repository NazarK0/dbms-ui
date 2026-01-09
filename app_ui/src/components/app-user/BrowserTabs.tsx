import {
  TabsList,
  TabScrollButton,
  NewTabButton,
  useTabScroll,
} from './browser-tabs';
import type { BrowserTabsProps, Tab } from './browser-tabs';

export type { Tab, BrowserTabsProps };

export default function BrowserTabs({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  onNewTab,
}: BrowserTabsProps) {
  const {
    tabsRef,
    canScrollLeft,
    canScrollRight,
    handleWheel,
    scrollTabs,
    updateScrollButtons,
  } = useTabScroll(tabs);

  return (
    <div className="relative flex items-center bg-slate-100 border-b border-violet-200/50 h-[46px]">
      {/* Left scroll button */}
      {canScrollLeft && (
        <TabScrollButton direction="left" onClick={() => scrollTabs('left')} />
      )}

      {/* Tabs scrollable container - hidden scrollbar */}
      <div
        ref={tabsRef}
        className="flex-1 overflow-x-auto scrollbar-hide h-full"
        onWheel={handleWheel}
        onScroll={updateScrollButtons}
      >
        <TabsList
          tabs={tabs}
          activeTabId={activeTabId}
          onTabChange={onTabChange}
          onTabClose={onTabClose}
        />
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <TabScrollButton direction="right" onClick={() => scrollTabs('right')} />
      )}

      {/* New tab button */}
      {onNewTab && <NewTabButton onClick={onNewTab} />}
    </div>
  );
}
