import { X, Plus, LayoutDashboard, Database, Table, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useRef, useEffect, useState } from 'react';

export interface Tab {
  id: string;
  type: 'dashboard' | 'database' | 'table';
  title: string;
  icon?: React.ReactNode;
  data?: {
    database?: string;
    table?: string;
    permissions?: string[];
    highlightRecordId?: string;
  };
  // Tab state
  view?: 'dashboard' | 'database-tables' | 'table' | 'create-record' | 'edit-record';
  selectedDatabase?: string | null;
  selectedTable?: {
    database: string;
    table: string;
    permissions: string[];
    highlightRecordId?: string;
  } | null;
  recordId?: string | null;
}

interface BrowserTabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onNewTab?: () => void;
}

export default function BrowserTabs({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  onNewTab,
}: BrowserTabsProps) {
  const getTabIcon = (tab: Tab) => {
    if (tab.icon) return tab.icon;
    
    switch (tab.type) {
      case 'dashboard':
        return <LayoutDashboard className="w-3.5 h-3.5" />;
      case 'database':
        return <Database className="w-3.5 h-3.5" />;
      case 'table':
        return <Table className="w-3.5 h-3.5" />;
      default:
        return <LayoutDashboard className="w-3.5 h-3.5" />;
    }
  };

  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tabs]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (tabsRef.current) {
      e.preventDefault();
      tabsRef.current.scrollLeft += e.deltaY;
      updateScrollButtons();
    }
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
      setTimeout(updateScrollButtons, 100);
    }
  };

  return (
    <div className="relative flex items-center bg-slate-100 border-b border-violet-200/50 h-[46px]">
      {/* Left scroll button */}
      {canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-md bg-slate-100/95 hover:bg-slate-200 text-slate-600 shadow-sm"
          onClick={() => scrollTabs('left')}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      )}

      {/* Tabs scrollable container - hidden scrollbar */}
      <div 
        ref={tabsRef}
        className="flex-1 overflow-x-auto scrollbar-hide h-full"
        onWheel={handleWheel}
        onScroll={updateScrollButtons}
      >
        <div className="flex items-center min-w-max h-full">
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTabId;
            // Show close button if there's more than 1 tab
            const canClose = tabs.length > 1;

            return (
              <div
                key={tab.id}
                className={`
                  group relative flex items-center gap-2 px-4 h-full min-w-[180px] max-w-[240px] cursor-pointer
                  transition-all duration-200 border-r border-slate-200/50
                  ${isActive 
                    ? 'bg-white text-violet-700 shadow-md border-l border-violet-100' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/50'
                  }
                `}
                onClick={() => onTabChange(tab.id)}
              >
                {/* Active tab indicator */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-violet-600 to-violet-500" />
                )}

                {/* Icon */}
                <div className={`flex-shrink-0 ${isActive ? 'text-violet-600' : 'text-slate-500'}`}>
                  {getTabIcon(tab)}
                </div>

                {/* Title */}
                <span className="flex-1 truncate text-sm font-medium">
                  {tab.title}
                </span>

                {/* Close button */}
                {canClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`
                      flex-shrink-0 w-5 h-5 rounded-sm
                      ${isActive 
                        ? 'opacity-60 hover:opacity-100 hover:bg-violet-100' 
                        : 'opacity-0 group-hover:opacity-60 hover:opacity-100 hover:bg-slate-300'
                      }
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabClose(tab.id);
                    }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                )}

                {/* Loading indicator for dashboard tab */}
                {!canClose && isActive && (
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-md bg-slate-100/95 hover:bg-slate-200 text-slate-600 shadow-sm"
          onClick={() => scrollTabs('right')}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}

      {/* New tab button */}
      {onNewTab && (
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 w-10 h-10 m-1 rounded-md hover:bg-slate-200/50 text-slate-600"
          onClick={onNewTab}
        >
          <Plus className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}