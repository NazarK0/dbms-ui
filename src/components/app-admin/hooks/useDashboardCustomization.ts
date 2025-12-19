import { useState } from 'react';
import { defaultDashboardCards, type DashboardCard } from '@/mockData/admin/dashboard';

export type { DashboardCard };

export function useDashboardCustomization() {
  const [visibleCards, setVisibleCards] = useState<DashboardCard[]>(defaultDashboardCards);
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