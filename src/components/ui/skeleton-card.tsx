/**
 * Skeleton компонент для карток
 * Використовується під час завантаження даних
 */

import { Card, CardHeader, CardContent } from './card';
import { Skeleton } from './skeleton';

interface SkeletonCardProps {
  /** Чи показувати заголовок */
  showHeader?: boolean;
  /** Кількість рядків контенту */
  contentLines?: number;
  /** Чи показувати footer */
  showFooter?: boolean;
  /** Додаткові CSS класи */
  className?: string;
}

export function SkeletonCard({
  showHeader = true,
  contentLines = 3,
  showFooter = false,
  className = '',
}: SkeletonCardProps) {
  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
      )}
      
      <CardContent className="space-y-3">
        {Array.from({ length: contentLines }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-4"
            style={{ width: `${Math.random() * 30 + 60}%` }}
          />
        ))}
      </CardContent>

      {showFooter && (
        <div className="px-6 pb-6">
          <Skeleton className="h-10 w-full" />
        </div>
      )}
    </Card>
  );
}

/**
 * Skeleton для статистичних карток
 */
export function SkeletonStatCard({ className = '' }: { className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-8 w-24 mb-2" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton для карток з іконкою
 */
export function SkeletonIconCard({ className = '' }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

/**
 * Grid з skeleton карток
 */
interface SkeletonCardGridProps {
  count?: number;
  columns?: 2 | 3 | 4 | 5;
  cardType?: 'default' | 'stat' | 'icon';
  className?: string;
}

export function SkeletonCardGrid({
  count = 4,
  columns = 4,
  cardType = 'default',
  className = '',
}: SkeletonCardGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  };

  const CardComponent = {
    default: SkeletonCard,
    stat: SkeletonStatCard,
    icon: SkeletonIconCard,
  }[cardType];

  return (
    <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <CardComponent key={i} />
      ))}
    </div>
  );
}
