import { Card, CardContent } from '../../../ui/card';
import type { ReplicationStat } from './types';

interface ReplicationStatsProps {
  stats: ReplicationStat[];
}

export default function ReplicationStats({ stats }: ReplicationStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.metric} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">{stat.metric}</p>
                  <p className="text-slate-900 text-2xl">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
