import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Badge } from '../../../../ui/badge';
import type { StatisticCardProps } from './types';

export default function StatisticCard({ config, value }: StatisticCardProps) {
  const Icon = config.icon;

  return (
    <Card className={`border-slate-200 shadow-sm ${config.borderColor || ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${config.gradient.from} ${config.gradient.to} rounded-xl flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <Badge variant={config.badgeVariant} className="text-lg">
            {value}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl mb-1">{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
