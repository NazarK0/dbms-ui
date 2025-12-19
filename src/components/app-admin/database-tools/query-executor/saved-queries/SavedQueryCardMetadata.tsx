/**
 * SavedQueryCardMetadata Component
 * =================================
 * 
 * Відображення тегів та метаданих (дати створення/оновлення) в картці запиту.
 */

import { Tag } from 'lucide-react';
import { Badge } from '../../../../ui/badge';
import { SavedQueryCardMetadataProps } from './types';

export function SavedQueryCardMetadata({
  tags,
  createdAt,
  updatedAt,
  onTagClick,
}: SavedQueryCardMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {/* Теги */}
      {tags?.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="text-xs cursor-pointer hover:bg-slate-100"
          onClick={() => onTagClick?.(tag)}
        >
          <Tag className="w-3 h-3 mr-1" />
          {tag}
        </Badge>
      ))}
      
      {/* Дата створення */}
      <Badge variant="secondary" className="text-xs">
        Створено: {new Date(createdAt).toLocaleDateString('uk-UA')}
      </Badge>
      
      {/* Дата оновлення (якщо відрізняється від створення) */}
      {updatedAt !== createdAt && (
        <Badge variant="secondary" className="text-xs">
          Оновлено: {new Date(updatedAt).toLocaleDateString('uk-UA')}
        </Badge>
      )}
    </div>
  );
}
