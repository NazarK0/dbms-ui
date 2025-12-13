/**
 * Skeleton компонент для списків
 * Використовується під час завантаження списків даних
 */

import { Skeleton } from './skeleton';

interface SkeletonListProps {
  /** Кількість елементів */
  items?: number;
  /** Чи показувати аватар/іконку */
  showAvatar?: boolean;
  /** Чи показувати додаткову інформацію */
  showMeta?: boolean;
  /** Додаткові CSS класи */
  className?: string;
}

export function SkeletonList({
  items = 5,
  showAvatar = true,
  showMeta = true,
  className = '',
}: SkeletonListProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3">
          {showAvatar && (
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            {showMeta && <Skeleton className="h-3 w-1/2" />}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton для списку з картками
 */
export function SkeletonListCard({
  items = 4,
  className = '',
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton для вертикального меню/sidebar
 */
export function SkeletonSidebarMenu({
  items = 8,
  showIcons = true,
  className = '',
}: {
  items?: number;
  showIcons?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          {showIcons && <Skeleton className="h-5 w-5 flex-shrink-0" />}
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton для timeline/activity feed
 */
export function SkeletonTimeline({
  items = 5,
  className = '',
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
            {i < items - 1 && <div className="w-0.5 h-full bg-slate-200" />}
          </div>
          <div className="flex-1 space-y-2 pb-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton для horizontal scroll списку (наприклад, теги, чіпси)
 */
export function SkeletonChipList({
  items = 6,
  className = '',
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 flex-wrap ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-8 rounded-full"
          style={{ width: `${Math.random() * 40 + 60}px` }}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton для дерева (файлова структура, категорії)
 */
export function SkeletonTree({
  depth = 3,
  itemsPerLevel = 3,
  className = '',
}: {
  depth?: number;
  itemsPerLevel?: number;
  className?: string;
}) {
  const renderLevel = (level: number) => {
    if (level > depth) return null;
    
    return Array.from({ length: itemsPerLevel }).map((_, i) => (
      <div key={i} style={{ paddingLeft: `${level * 20}px` }}>
        <div className="flex items-center gap-2 py-2">
          <Skeleton className="h-4 w-4 flex-shrink-0" />
          <Skeleton className="h-4" style={{ width: `${Math.random() * 80 + 80}px` }} />
        </div>
        {level < depth && i === 0 && renderLevel(level + 1)}
      </div>
    ));
  };

  return <div className={className}>{renderLevel(1)}</div>;
}
