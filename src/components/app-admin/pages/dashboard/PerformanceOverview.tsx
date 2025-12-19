import { TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Progress } from '../../../ui/progress';
import type { PerformanceOverviewProps } from './types';

export default function PerformanceOverview({
  metrics,
  visible,
}: PerformanceOverviewProps) {
  if (!visible) return null;

  return (
    <Card className="border-lime-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-lime-600" />
          <CardTitle>Огляд продуктивності</CardTitle>
        </div>
        <CardDescription>Ключові метрики за останню годину</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">{metric.label}</p>
                <Badge variant="outline">{metric.value}%</Badge>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
