/**
 * CategorySection Component
 * 
 * Displays a category section with a title and list of widget cards.
 * Groups related widgets by category (stats, performance, activity).
 */

import type { WidgetCardData } from './types';
import WidgetCard from './WidgetCard';

interface CategorySectionProps {
  categoryLabel: string;
  cards: WidgetCardData[];
}

export default function CategorySection({
  categoryLabel,
  cards,
}: CategorySectionProps) {
  // Don't render if no cards in category
  if (cards.length === 0) {
    return null;
  }

  function handleToggle(cardId: number) {
    // TODO: Add additional logic
  }
  return (
    <div className="space-y-3">
      <h4 className="text-sm text-slate-900">{categoryLabel}</h4>
      {cards.map((card) => (
        <WidgetCard
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          visible={card.visible}
          onToggle={() => handleToggle(card.id)}
        />
      ))}
    </div>
  );
}
