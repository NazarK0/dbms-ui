/**
 * UI Menu Items
 * 
 * Menu items for role-based UI access configuration
 */

import { Eye, Database, Users, Shield, Activity, HardDrive, Plug, Code } from 'lucide-react';
import type { UIMenuItem } from './types';

export const uiMenuItems: UIMenuItem[] = [
  { id: 'dashboard', label: 'Панель управління', icon: Eye, description: 'Головний дашборд з метриками' },
  { id: 'databases', label: 'Бази даних', icon: Database, description: 'Управління БД, схемами та таблицями' },
  { id: 'users', label: 'Користувачі', icon: Users, description: 'Управління користувачами системи' },
  { id: 'roles', label: 'Ролі', icon: Shield, description: 'Управління ролями та правами' },
  { id: 'monitoring', label: 'Моніторинг', icon: Activity, description: 'Системний моніторинг та логи' },
  { id: 'performance', label: 'Продуктивність', icon: Activity, description: 'Аналіз продуктивності БД' },
  { id: 'backups', label: 'Резервні копії', icon: HardDrive, description: 'Управління бекапами' },
  { id: 'extensions', label: 'Розширення', icon: Plug, description: 'PostgreSQL розширення' },
  { id: 'config', label: 'Конфігурація', icon: Shield, description: 'Налаштування PostgreSQL' },
  { id: 'cli', label: 'CLI', icon: Code, description: 'Командний інтерфейс' },
];
