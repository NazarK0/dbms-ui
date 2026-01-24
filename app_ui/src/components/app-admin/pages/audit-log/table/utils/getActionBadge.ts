import type { ActionBadgeConfig, ActionType } from '../types';


const getActionBadge = (action: ActionType): ActionBadgeConfig => {
  const badges: Record<ActionType, ActionBadgeConfig> = {
    create: {
      variant: 'default',
      label: 'Створення',
      color: 'from-green-500 to-lime-600',
    },
    update: {
      variant: 'secondary',
      label: 'Оновлення',
      color: 'from-yellow-500 to-lime-600',
    },
    delete: {
      variant: 'destructive',
      label: 'Видалення',
      color: 'from-red-500 to-red-600',
    },
    select: {
      variant: 'outline',
      label: 'Вибірка',
      color: 'from-slate-500 to-slate-600',
    },
    grant: {
      variant: 'default',
      label: 'Надання прав',
      color: 'from-lime-500 to-green-600',
    },
    revoke: {
      variant: 'destructive',
      label: 'Відкликання',
      color: 'from-orange-500 to-red-600',
    },
    login: {
      variant: 'outline',
      label: 'Вхід',
      color: 'from-blue-500 to-blue-600',
    },
    backup: {
      variant: 'secondary',
      label: 'Резервування',
      color: 'from-lime-600 to-yellow-600',
    },
  };
  return badges[action];
};

export default getActionBadge;
