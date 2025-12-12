import { 
  LayoutDashboard, 
  Database, 
  Users, 
  Shield, 
  Eye, 
  History, 
  Settings, 
  Terminal, 
  TrendingUp, 
  Copy, 
  Activity, 
  FileText 
} from 'lucide-react';
import { TabsList, TabsTrigger } from '../ui/tabs';

export default function AdminTabsList() {
  const tabs = [
    { value: 'dashboard', icon: LayoutDashboard, label: 'Панель' },
    { value: 'databases', icon: Database, label: 'Бази даних' },
    { value: 'users', icon: Users, label: 'Користувачі' },
    { value: 'roles', icon: Shield, label: 'Ролі' },
    { value: 'userui', icon: Eye, label: 'UI Користувача' },
    { value: 'audit', icon: History, label: 'Аудит' },
    { value: 'config', icon: Settings, label: 'Конфігурація' },
    { value: 'cli', icon: Terminal, label: 'CLI' },
    { value: 'performance', icon: TrendingUp, label: 'Продуктивність' },
    { value: 'replicas', icon: Copy, label: 'Репліки' },
    { value: 'monitor', icon: Activity, label: 'Моніторинг' },
    { value: 'logs', icon: FileText, label: 'Логи' },
  ];

  return (
    <TabsList className="bg-white shadow-sm border border-slate-200 p-1.5 h-auto inline-flex">
      {tabs.map(({ value, icon: Icon, label }) => (
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
