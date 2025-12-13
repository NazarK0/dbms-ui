/**
 * Skeleton компоненти для форм та спеціальних елементів
 * Використовується під час завантаження даних
 */

import { Card, CardHeader, CardContent } from './card';
import { Skeleton } from './skeleton';

/**
 * Skeleton для форми
 */
interface SkeletonFormProps {
  fields?: number;
  showButtons?: boolean;
  className?: string;
}

export function SkeletonForm({
  fields = 4,
  showButtons = true,
  className = '',
}: SkeletonFormProps) {
  return (
    <Card className={className}>
      <CardContent className="pt-6 space-y-4">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        {showButtons && (
          <div className="flex items-center gap-2 pt-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton для accordion/collapsible секції
 */
interface SkeletonAccordionProps {
  items?: number;
  className?: string;
}

export function SkeletonAccordion({
  items = 3,
  className = '',
}: SkeletonAccordionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-48" />
              </div>
              <Skeleton className="h-5 w-5" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

/**
 * Skeleton для топології/діаграми
 */
export function SkeletonDiagram({ className = '' }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="min-h-[400px] flex items-center justify-center">
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-24 w-48 rounded-lg" />
          </div>
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="h-20 w-40 rounded-lg" />
            <Skeleton className="h-20 w-40 rounded-lg" />
            <Skeleton className="h-20 w-40 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton для code editor/preview
 */
export function SkeletonCodeEditor({ className = '' }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="bg-slate-900 rounded-lg p-4 space-y-2 min-h-[300px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-4 bg-slate-700"
              style={{ width: `${Math.random() * 40 + 40}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton для tabs з вмістом
 */
interface SkeletonTabsProps {
  tabs?: number;
  contentLines?: number;
  className?: string;
}

export function SkeletonTabs({
  tabs = 3,
  contentLines = 5,
  className = '',
}: SkeletonTabsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-4 border-b pb-2">
          {Array.from({ length: tabs }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: contentLines }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-4"
            style={{ width: `${Math.random() * 30 + 60}%` }}
          />
        ))}
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton для badge group
 */
export function SkeletonBadgeGroup({
  count = 5,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-6 rounded-full"
          style={{ width: `${Math.random() * 40 + 60}px` }}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton для tree структури
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

    return (
      <div className={level > 1 ? 'ml-6 space-y-2' : 'space-y-2'}>
        {Array.from({ length: itemsPerLevel }).map((_, i) => (
          <div key={i}>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4" style={{ width: `${Math.random() * 80 + 80}px` }} />
            </div>
            {level < depth && renderLevel(level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">{renderLevel(1)}</CardContent>
    </Card>
  );
}

/**
 * Skeleton для progress card
 */
export function SkeletonProgress({ className = '' }: { className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
