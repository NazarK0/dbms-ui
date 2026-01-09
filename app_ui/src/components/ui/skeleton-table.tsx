/**
 * Skeleton таблиць - використовується під час завантаження табличних даних
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Skeleton } from './skeleton';

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showCheckbox?: boolean;
  showActions?: boolean;
  className?: string;
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  showCheckbox = false,
  showActions = false,
  className = '',
}: SkeletonTableProps) {
  const totalColumns = columns + (showCheckbox ? 1 : 0) + (showActions ? 1 : 0);

  return (
    <div className={`border rounded-lg ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {showCheckbox && (
              <TableHead className="w-12">
                <Skeleton className="h-4 w-4" />
              </TableHead>
            )}
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="w-20">
                <Skeleton className="h-4 w-16" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {showCheckbox && (
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
              )}
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton
                    className="h-4"
                    style={{ width: `${Math.random() * 40 + 40}%` }}
                  />
                </TableCell>
              ))}
              {showActions && (
                <TableCell>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Компактна версія skeleton таблиці
 */
export function SkeletonTableCompact({
  rows = 3,
  columns = 3,
  className = '',
}: Omit<SkeletonTableProps, 'showCheckbox' | 'showActions'>) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton для таблиці з угрупованими даними
 */
export function SkeletonGroupedTable({
  groups = 3,
  rowsPerGroup = 3,
  columns = 4,
  className = '',
}: {
  groups?: number;
  rowsPerGroup?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: groups }).map((_, groupIndex) => (
        <div key={groupIndex} className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <SkeletonTable rows={rowsPerGroup} columns={columns} />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton для таблиці з пагінацією
 */
export function SkeletonTableWithPagination({
  rows = 10,
  columns = 5,
  showCheckbox = false,
  showActions = true,
  className = '',
}: SkeletonTableProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <SkeletonTable
        rows={rows}
        columns={columns}
        showCheckbox={showCheckbox}
        showActions={showActions}
      />
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
}