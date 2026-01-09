import { LayoutDashboard, Database, Users, Shield, Activity, Zap, HardDrive, Settings, Terminal, Eye, Server, History, FileText, Copy } from 'lucide-react';

// Admin tabs list
export interface AdminTab {
  value: string;
  icon: any;
  label: string;
}

export const adminTabs: AdminTab[] = [
  { value: 'dashboard', icon: LayoutDashboard, label: 'Панель' },
  { value: 'databases', icon: Database, label: 'Бази даних' },
  { value: 'users', icon: Users, label: 'Користувачі' },
  { value: 'roles', icon: Shield, label: 'Ролі' },
  { value: 'userui', icon: Eye, label: 'UI Користувача' },
  { value: 'audit', icon: History, label: 'Аудит' },
  { value: 'config', icon: Settings, label: 'Конфігурація' },
  { value: 'cli', icon: Terminal, label: 'CLI' },
  { value: 'performance', icon: Zap, label: 'Продуктивність' },
  { value: 'replicas', icon: Copy, label: 'Репліки' },
  { value: 'monitor', icon: Activity, label: 'Моніторинг' },
  { value: 'logs', icon: FileText, label: 'Логи' },
];

// Role preview options
export interface RolePreviewOption {
  id: string;
  name: string;
  color: string;
}

export const rolePreviewOptions: RolePreviewOption[] = [
  { id: 'data-analyst', name: 'Data Analyst', color: 'from-violet-500 to-purple-600' },
  { id: 'content-manager', name: 'Content Manager', color: 'from-blue-500 to-cyan-600' },
  { id: 'report-viewer', name: 'Report Viewer', color: 'from-indigo-500 to-violet-600' },
  { id: 'developer', name: 'Developer', color: 'from-yellow-500 to-lime-600' },
];