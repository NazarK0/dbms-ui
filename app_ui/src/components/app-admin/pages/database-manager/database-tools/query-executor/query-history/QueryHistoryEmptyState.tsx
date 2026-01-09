/**
 * Query History Empty State Component
 * ====================================
 * 
 * Відображення порожнього стану списку історії.
 */

interface QueryHistoryEmptyStateProps {
  /** Чи є активний пошук */
  hasSearchTerm: boolean;
}

export function QueryHistoryEmptyState({ hasSearchTerm }: QueryHistoryEmptyStateProps) {
  return (
    <div className="text-center py-8 text-slate-500">
      {hasSearchTerm ? 'Запитів не знайдено' : 'Історія запитів порожня'}
    </div>
  );
}
