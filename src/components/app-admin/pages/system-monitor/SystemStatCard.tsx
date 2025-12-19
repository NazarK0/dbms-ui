import { Card, CardContent } from '../../../ui/card';
import { Progress } from '../../../ui/progress';
import type { SystemStatCardProps } from './types';

export default function SystemStatCard({ stat }: SystemStatCardProps) {
  const Icon = stat.icon;

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
            <p className="text-slate-900 text-2xl">{stat.value}</p>
          </div>
          <div
            className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <Progress value={stat.percentage} className="h-2" />
      </CardContent>
    </Card>
  );
}
