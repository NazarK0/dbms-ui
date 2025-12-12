import { useState } from 'react';

export interface DashboardCard {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  category: 'stats' | 'performance' | 'activity';
}

const defaultCards: DashboardCard[] = [
  { id: 'databases', name: 'Всього баз даних', description: 'Кількість баз даних у системі', visible: true, category: 'stats' },
  { id: 'admins', name: 'Адміністраторів', description: 'Кількість адміністраторів системи', visible: true, category: 'stats' },
  { id: 'users', name: 'Користувачів', description: 'Кількість звичайних користувачів', visible: true, category: 'stats' },
  { id: 'tables', name: 'Всього таблиць', description: 'Загальна кількість таблиць', visible: true, category: 'stats' },
  { id: 'storage', name: 'Використано сховища', description: 'Використаний дисковий простір', visible: true, category: 'stats' },
  { id: 'performance', name: 'Огляд продуктивності', description: 'Ключові метрики продуктивності', visible: true, category: 'performance' },
  { id: 'activity', name: 'Остання активність', description: 'Нещодавні події системи', visible: true, category: 'activity' },
  { id: 'connections', name: 'Активні з\'єднання', description: 'Поточні підключення', visible: true, category: 'activity' },
];

export function useDashboardCustomization() {
  const [visibleCards, setVisibleCards] = useState<DashboardCard[]>(defaultCards);
  const [customizeDialogOpen, setCustomizeDialogOpen] = useState(false);

  const toggleCardVisibility = (cardId: string) => {
    setVisibleCards(visibleCards.map(card => 
      card.id === cardId ? { ...card, visible: !card.visible } : card
    ));
  };

  const isCardVisible = (cardId: string) => {
    return visibleCards.find(card => card.id === cardId)?.visible ?? true;
  };

  const visibleCount = visibleCards.filter(card => card.visible).length;

  return {
    visibleCards,
    customizeDialogOpen,
    setCustomizeDialogOpen,
    toggleCardVisibility,
    isCardVisible,
    visibleCount,
  };
}
