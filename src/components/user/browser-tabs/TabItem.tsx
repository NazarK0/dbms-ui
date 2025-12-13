import TabActiveIndicator from './TabActiveIndicator';
import TabCloseButton from './TabCloseButton';
import TabLoadingIndicator from './TabLoadingIndicator';
import { getTabIcon, canCloseTab } from './utils';
import type { Tab } from './types';

interface TabItemProps {
  tab: Tab;
  isActive: boolean;
  totalTabs: number;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export default function TabItem({
  tab,
  isActive,
  totalTabs,
  onTabChange,
  onTabClose,
}: TabItemProps) {
  const showCloseButton = canCloseTab(totalTabs);

  return (
    <div
      className={`
        group relative flex items-center gap-2 px-4 h-full min-w-[180px] max-w-[240px] cursor-pointer
        transition-all duration-200 border-r border-slate-200/50
        ${
          isActive
            ? 'bg-white text-violet-700 shadow-md border-l border-violet-100'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/50'
        }
      `}
      onClick={() => onTabChange(tab.id)}
    >
      {/* Active tab indicator */}
      {isActive && <TabActiveIndicator />}

      {/* Icon */}
      <div className={`flex-shrink-0 ${isActive ? 'text-violet-600' : 'text-slate-500'}`}>
        {getTabIcon(tab)}
      </div>

      {/* Title */}
      <span className="flex-1 truncate text-sm font-medium">{tab.title}</span>

      {/* Close button */}
      {showCloseButton && (
        <TabCloseButton
          isActive={isActive}
          onClose={(e) => {
            e.stopPropagation();
            onTabClose(tab.id);
          }}
        />
      )}

      {/* Loading indicator for single tab */}
      {!showCloseButton && isActive && <TabLoadingIndicator />}
    </div>
  );
}
