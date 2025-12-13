import { TabsList, TabsTrigger } from '../ui/tabs';
import { adminTabs } from '../../mockData/admin';

export default function AdminTabsList() {
  return (
    <TabsList className="bg-white shadow-sm border border-slate-200 p-1.5 h-auto inline-flex">
      {adminTabs.map(({ value, icon: Icon, label }) => (
        <TabsTrigger 
          key={value}
          value={value} 
          className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white"
        >
          <Icon className="w-4 h-4" />
          <span className="xl:inline hidden">{label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}