/**
 * CategorySection Component
 * 
 * Displays a category section with a title and list of widget cards.
 * Groups related widgets by category (stats, performance, activity).
 * 
 * @component
 * @example
 * ```tsx
 * <CategorySection
 *   category="stats"
 *   categoryLabel="Статистика"
 *   cards={categoryCards}
 *   onToggleVisibility={handleToggle}
 * />
 * ```
 */

import type { DashboardCard } from '../types';
import WidgetCard from './WidgetCard';

interface CategorySectionProps {
  /** Category identifier */
  category: string;
  /** Category display label */
  categoryLabel: string;
  /** Cards in this category */
  cards: DashboardCard[];
  /** Callback when widget visibility is toggled */
  onToggleVisibility: (cardId: string) => void;
}

export default function CategorySection({
  category,
  categoryLabel,
  cards,
  onToggleVisibility,
}: CategorySectionProps) {
  // Don't render if no cards in category
  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm text-slate-900">{categoryLabel}</h4>
      {cards.map((card) => (
        <WidgetCard
          key={card.id}
          id={card.id}
          name={card.name}
          description={card.description}
          visible={card.visible}
          onToggle={() => onToggleVisibility(card.id)}
        />
      ))}
    </div>
  );
}
