/**
 * Configuration data and constants for UserUIPreview components
 */

import {
  Monitor,
  Smartphone,
  Tablet,
  FolderOpen,
  Share2,
  Download,
  Upload,
  Star,
  Settings,
} from 'lucide-react';
import {
  ActionConfig,
  DeviceConfig,
  DeviceSize,
  PermissionConfig,
  PreviewConfig,
  RoleConfig,
  RolePermissions,
  UserRole,
} from '../types';

export const userRoles: UserRole[] = [
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'content-manager',
    name: 'Content Manager',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'report-viewer',
    name: 'Report Viewer',
    color: 'from-indigo-500 to-violet-600',
  },
  {
    id: 'guest-user',
    name: 'Guest User',
    color: 'from-slate-400 to-slate-500',
  },
];

export const deviceSizes: Record<string, DeviceSize> = {
  desktop: { width: '100%', height: '600px' },
  tablet: { width: '768px', height: '600px' },
  mobile: { width: '375px', height: '667px' },
};

export const rolePermissions: RolePermissions = {
  'data-analyst': {
    createProjects: true,
    deleteProjects: true,
    shareProjects: true,
    exportData: true,
    importData: true,
    useApi: true,
    customBranding: true,
    prioritySupport: true,
  },
  'content-manager': {
    createProjects: true,
    deleteProjects: true,
    shareProjects: true,
    exportData: true,
    importData: false,
    useApi: false,
    customBranding: false,
    prioritySupport: false,
  },
  'report-viewer': {
    createProjects: true,
    deleteProjects: false,
    shareProjects: false,
    exportData: false,
    importData: false,
    useApi: false,
    customBranding: false,
    prioritySupport: false,
  },
  'guest-user': {
    createProjects: true,
    deleteProjects: true,
    shareProjects: true,
    exportData: true,
    importData: true,
    useApi: true,
    customBranding: false,
    prioritySupport: true,
  },
};

export const deviceConfigs: DeviceConfig[] = [
  {
    name: 'desktop',
    icon: Monitor,
    size: deviceSizes.desktop,
  },
  {
    name: 'tablet',
    icon: Tablet,
    size: deviceSizes.tablet,
  },
  {
    name: 'mobile',
    icon: Smartphone,
    size: deviceSizes.mobile,
  },
];

export const permissionConfigs: PermissionConfig[] = [
  {
    key: 'createProjects',
    label: 'Створення проєктів',
    description: 'Дозволяє створювати нові проєкти',
  },
  {
    key: 'deleteProjects',
    label: 'Видалення проєктів',
    description: 'Дозволяє видаляти існуючі проєкти',
  },
  {
    key: 'shareProjects',
    label: 'Спільний доступ',
    description: 'Дозволяє ділитися проєктами з іншими користувачами',
  },
  {
    key: 'exportData',
    label: 'Експорт даних',
    description: 'Дозволяє експортувати дані з системи',
  },
  {
    key: 'importData',
    label: 'Імпорт даних',
    description: 'Дозволяє імпортувати дані в систему',
  },
  {
    key: 'useApi',
    label: 'Використання API',
    description: 'Дозволяє доступ до API системи',
  },
  {
    key: 'customBranding',
    label: 'Свій брендинг',
    description: 'Дозволяє налаштування власного брендингу',
  },
  {
    key: 'prioritySupport',
    label: 'Пріоритетна підтримка',
    description: 'Надає доступ до пріоритетної підтримки',
  },
];

export const actionConfigs: ActionConfig[] = [
  {
    key: 'createProjects',
    icon: FolderOpen,
    label: 'Новий проєкт',
  },
  {
    key: 'shareProjects',
    icon: Share2,
    label: 'Поділитись',
  },
  {
    key: 'exportData',
    icon: Download,
    label: 'Експорт',
  },
  {
    key: 'importData',
    icon: Upload,
    label: 'Імпорт',
  },
  {
    key: 'customBranding',
    icon: Star,
    label: 'Брендинг',
  },
  {
    key: 'useApi',
    icon: Settings,
    label: 'API',
  },
];

export const previewConfig: PreviewConfig = {
  headerColor: 'from-lime-500 to-green-600',
  accentColor: 'lime-600',
  disabledColor: 'slate-400',
  enabledBgColor: 'lime-50',
  disabledBgColor: 'slate-50',
};

export const roleConfigs: RoleConfig[] = [
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    color: 'from-violet-500 to-purple-600',
    description: 'Повний доступ до аналізу даних, API та експорту/імпорту',
    permissions: rolePermissions['data-analyst'],
  },
  {
    id: 'content-manager',
    name: 'Content Manager',
    color: 'from-blue-500 to-cyan-600',
    description: 'Управління контентом з обмеженим доступом до API',
    permissions: rolePermissions['content-manager'],
  },
  {
    id: 'report-viewer',
    name: 'Report Viewer',
    color: 'from-indigo-500 to-violet-600',
    description: 'Тільки перегляд звітів без можливості редагування',
    permissions: rolePermissions['report-viewer'],
  },
  {
    id: 'guest-user',
    name: 'Guest User',
    color: 'from-slate-400 to-slate-500',
    description: 'Гостьовий доступ з базовими можливостями',
    permissions: rolePermissions['guest-user'],
  },
];

export const defaultDeviceType = 'desktop';
export const defaultRole = 'data-analyst';

export const headerTitle = 'Перегляд користувацького інтерфейсу';
export const headerDescription =
  'Попередній перегляд реального User UI для різних ролей користувачів';

export const roleSelectorLabel = 'Роль користувача:';
export const previewWindowTitle = 'Попередній перегляд User Interface';
export const permissionsPanelTitle = 'Доступні можливості';

export const mockAppName = 'Мій застосунок';
export const welcomeTitle = 'Вітаємо!';
export const welcomeText = 'Ваша роль:';
export const prioritySupportText = 'Пріоритетна підтримка активна';

export const permissionLabels = {
  allowed: 'Дозволено',
  denied: 'Заборонено',
};

export const navigationItems = [
  { label: 'Головна', active: true },
  { label: 'Проєкти', active: false },
  { label: 'API', requiresPermission: 'useApi' as const },
  { label: 'Допомога', active: false },
];

export const deviceIcons = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
};

export const borderStyles = {
  deviceFrame: 'border-8 border-slate-800',
  actionButton: 'border-2',
  permissionItem: '',
};

export const colorClasses = {
  enabled: {
    border: 'border-lime-200',
    bg: 'bg-lime-50',
    hover: 'hover:border-lime-300',
    text: 'text-lime-600',
  },
  disabled: {
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    text: 'text-slate-400',
    opacity: 'opacity-50',
    cursor: 'cursor-not-allowed',
  },
  header: {
    bg: 'bg-gradient-to-r from-lime-500 to-green-600',
    text: 'text-white',
  },
  welcome: {
    bg: 'bg-gradient-to-r from-violet-50 to-purple-50',
    border: 'border-violet-200',
    text: 'text-slate-900',
  },
  prioritySupport: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-900',
    icon: 'text-amber-600',
  },
};

export const layoutConfig = {
  desktop: {
    showNavigation: true,
    showFullHeader: true,
    actionGridCols: 3,
  },
  tablet: {
    showNavigation: false,
    showFullHeader: true,
    actionGridCols: 3,
  },
  mobile: {
    showNavigation: false,
    showFullHeader: false,
    actionGridCols: 2,
  },
};

export const previewDimensions = {
  desktop: {
    width: '100%',
    height: '600px',
    maxWidth: '100%',
  },
  tablet: {
    width: '768px',
    height: '600px',
    maxWidth: '100%',
  },
  mobile: {
    width: '375px',
    height: '667px',
    maxWidth: '100%',
  },
};

export const iconSizes = {
  header: 'w-5 h-5',
  action: 'w-6 h-6',
  navigation: 'w-4 h-4',
  avatar: 'w-4 h-4',
  logo: 'w-5 h-5',
  notification: 'w-4 h-4',
};

export const textSizes = {
  actionLabel: 'text-xs',
  navigation: 'text-sm',
  welcomeTitle: '',
  welcomeText: 'text-sm',
  permissionLabel: 'text-sm',
  header: '',
};
