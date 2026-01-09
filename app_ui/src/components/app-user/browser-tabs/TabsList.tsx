import TabItem from './TabItem';
import type { Tab } from './types';

interface TabsListProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export default function TabsList({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
}: TabsListProps) {
  return (
    <div className="flex items-center min-w-max h-full">
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeTabId}
          totalTabs={tabs.length}
          onTabChange={onTabChange}
          onTabClose={onTabClose}
        />
      ))}
    </div>
  );
}
