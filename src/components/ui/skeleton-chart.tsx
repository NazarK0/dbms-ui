/**
 * Skeleton графіків та візуалізацій - використовується під час завантаження
 */

import { Card, CardHeader, CardContent } from './card';
import { Skeleton } from './skeleton';

interface SkeletonChartProps {
  type?: 'line' | 'bar' | 'pie' | 'area';
  height?: number;
  showHeader?: boolean;
  showLegend?: boolean;
  className?: string;
}

export function SkeletonChart({
  type = 'line',
  height = 300,
  showHeader = true,
  showLegend = true,
  className = '',
}: SkeletonChartProps) {
  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
      )}
      
      <CardContent>
        {showLegend && (
          <div className="flex gap-4 mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        )}
        
        <div
          className="relative bg-slate-50 rounded-lg overflow-hidden"
          style={{ height: `${height}px` }}
        >
          {type === 'line' && <SkeletonLineChart />}
          {type === 'bar' && <SkeletonBarChart />}
          {type === 'pie' && <SkeletonPieChart />}
          {type === 'area' && <SkeletonAreaChart />}
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonLineChart() {
  return (
    <div className="absolute inset-0 p-6">
      <svg width="100%" height="100%" className="text-slate-200">
        {/* Y-axis */}
        <line x1="40" y1="20" x2="40" y2="260" stroke="currentColor" strokeWidth="1" />
        
        {/* X-axis */}
        <line x1="40" y1="260" x2="95%" y2="260" stroke="currentColor" strokeWidth="1" />
        
        {/* Grid lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1="40"
            y1={20 + i * 48}
            x2="95%"
            y2={20 + i * 48}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4"
            opacity="0.3"
          />
        ))}
        
        {/* Line path */}
        <polyline
          points="60,180 120,140 180,160 240,100 300,120 360,80 420,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-slate-300"
        />
      </svg>
      
      {/* Axis labels */}
      <div className="absolute bottom-0 left-12 right-6 flex justify-between">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-3 w-8" />
        ))}
      </div>
    </div>
  );
}

function SkeletonBarChart() {
  return (
    <div className="absolute inset-0 p-6 flex items-end justify-around gap-2">
      {[60, 80, 45, 90, 70, 55, 75, 85].map((height, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <Skeleton
            className="w-full"
            style={{ height: `${height}%` }}
          />
          <Skeleton className="h-3 w-8" />
        </div>
      ))}
    </div>
  );
}

function SkeletonPieChart() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <Skeleton className="h-48 w-48 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white h-24 w-24 rounded-full" />
        </div>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonAreaChart() {
  return (
    <div className="absolute inset-0 p-6">
      <svg width="100%" height="100%" className="text-slate-200">
        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            y1={i * 60}
            x2="100%"
            y2={i * 60}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4"
            opacity="0.3"
          />
        ))}
        
        {/* Area fill */}
        <path
          d="M 0 180 L 100 140 L 200 160 L 300 100 L 400 120 L 500 80 L 500 260 L 0 260 Z"
          fill="currentColor"
          opacity="0.2"
          className="text-slate-300"
        />
        
        {/* Line */}
        <polyline
          points="0,180 100,140 200,160 300,100 400,120 500,80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-300"
        />
      </svg>
    </div>
  );
}

/**
 * Skeleton для dashboard з кількома графіками
 */
export function SkeletonChartGrid({
  charts = 2,
  className = '',
}: {
  charts?: number;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {Array.from({ length: charts }).map((_, i) => (
        <SkeletonChart key={i} type={i % 2 === 0 ? 'line' : 'bar'} />
      ))}
    </div>
  );
}

/**
 * Skeleton для статистичних індикаторів
 */
export function SkeletonStatsRow({
  stats = 4,
  className = '',
}: {
  stats?: number;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: stats }).map((_, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <Skeleton className="h-4 w-20 mb-3" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}