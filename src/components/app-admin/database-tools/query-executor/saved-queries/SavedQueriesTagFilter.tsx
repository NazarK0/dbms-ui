/**
 * SavedQueriesTagFilter Component
 * ================================
 * 
 * Фільтр по тегах для збережених запитів.
 */

import { Tag } from 'lucide-react';
import { Button } from '../../../../ui/button';
import { SavedQueriesTagFilterProps } from './types';

export function SavedQueriesTagFilter({
  tags,
  selectedTag,
  onSelectTag,
}: SavedQueriesTagFilterProps) {
  // Якщо немає тегів - не показуємо фільтр
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      <Button
        variant={selectedTag === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectTag(null)}
        className="h-7 text-xs"
      >
        Всі
      </Button>
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTag === tag ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectTag(tag)}
          className="h-7 text-xs"
        >
          <Tag className="w-3 h-3 mr-1" />
          {tag}
        </Button>
      ))}
    </div>
  );
}
