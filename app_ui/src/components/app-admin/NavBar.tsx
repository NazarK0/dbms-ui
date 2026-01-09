import { useState, lazy, Suspense } from 'react';
import { Link } from '@tanstack/react-router';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "../../components/ui/navigation-menu";
import { Activity, FileText, LayoutDashboard, Database, Users, Shield, Eye, History, Settings, Terminal, Zap, Copy } from 'lucide-react';

type Tab = 'dashboard' | 'databases' | 'users' | 'roles' | 'userui' | 'audit' | 'config' | 'cli' | 'performance' | 'replicas' | 'monitor' | 'logs';
export interface AdminTab {
  value: string;
  icon: any;
  label: string;
}

export const adminTabs: AdminTab[] = [
    { value: '/admin', icon: LayoutDashboard, label: 'Панель' },
    { value: '/admin/databases', icon: Database, label: 'Бази даних' },
    { value: '/admin/users', icon: Users, label: 'Користувачі' },
    { value: '/admin/roles', icon: Shield, label: 'Ролі' },
    { value: '/admin/userui', icon: Eye, label: 'UI Користувача' },
    { value: '/admin/audit', icon: History, label: 'Аудит' },
    { value: '/admin/pg-config', icon: Settings, label: 'Конфігурація' },
    { value: '/admin/cli', icon: Terminal, label: 'CLI' },
    { value: '/admin/performance', icon: Zap, label: 'Продуктивність' },
    { value: '/admin/replicas', icon: Copy, label: 'Репліки' },
    { value: '/admin/monitor', icon: Activity, label: 'Моніторинг' },
    { value: '/admin/logs', icon: FileText, label: 'Логи' },
];


export default function NavBar() {
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');

    return (
        <NavigationMenu>
            <NavigationMenuList className="bg-white border border-lime-200 rounded-lg shadow-sm p-1.5 h-auto inline-flex">
                {adminTabs.map((tab) => (
                    <NavigationMenuItem key={tab.value}>
                        <NavigationMenuLink asChild className="gap-2 px-3 py-2 rounded-md hover:bg-lime-100 data-[active=true]:bg-lime-600 data-[active=true]:text-white flex items-center" onClick={() => setActiveTab(tab.value as Tab)} data-active={activeTab === tab.value}>
                            <Link to={tab.value} className="flex items-center justify-center">
                                <tab.icon className="mr-2 h-4 w-4" />
                                {tab.label}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}