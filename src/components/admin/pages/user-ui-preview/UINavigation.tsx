import { Home, FolderOpen, Settings, HelpCircle } from 'lucide-react';
import type { UINavigationProps } from './types';

export default function UINavigation({
  deviceType,
  permissions,
}: UINavigationProps) {
  if (deviceType !== 'desktop') return null;

  return (
    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-4 text-sm">
      <button className="flex items-center gap-2 text-lime-600 font-medium">
        <Home className="w-4 h-4" />
        Головна
      </button>
      <button className="flex items-center gap-2 text-slate-600 hover:text-lime-600">
        <FolderOpen className="w-4 h-4" />
        Проєкти
      </button>
      {permissions.useApi && (
        <button className="flex items-center gap-2 text-slate-600 hover:text-lime-600">
          <Settings className="w-4 h-4" />
          API
        </button>
      )}
      <button className="flex items-center gap-2 text-slate-600 hover:text-lime-600">
        <HelpCircle className="w-4 h-4" />
        Допомога
      </button>
    </div>
  );
}
