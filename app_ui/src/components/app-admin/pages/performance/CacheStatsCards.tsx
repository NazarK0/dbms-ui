import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '../../../ui/card';
import { Progress } from '../../../ui/progress';
import type { CacheStat } from '../../../../mockData/admin';
import { getTrendColor } from './utils/getTrendColor';

interface CacheStatsCardsProps {
  stats: CacheStat[];
}

export default function CacheStatsCards({ stats }: CacheStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const TrendIcon = stat.trend === 'up' 
          ? TrendingUp 
          : stat.trend === 'down' 
          ? TrendingDown 
          : TrendingUp;
        
        const trendColor = getTrendColor(stat.trend);

        return (
          <Card key={stat.metric} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <p className="text-slate-600 text-sm mb-2">{stat.metric}</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-slate-900 text-2xl">{stat.value}</span>
                <TrendIcon className={`w-4 h-4 ${trendColor}`} />
              </div>
              <Progress value={stat.percentage} className="h-2" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}