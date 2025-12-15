import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Badge } from '../../../../ui/badge';
import type { StatisticCardProps } from './types';

/**
 * Universal statistic card component
 * 
 * Displays a statistic with icon, value, title, and description
 * Configured through the config prop for maximum reusability
 */
export default function StatisticCard({ value, config }: StatisticCardProps) {
  const Icon = config.icon;
  const badgeClassName = config.badgeVariant === 'outline' 
    ? 'text-lg border-yellow-500 text-yellow-700'
    : 'text-lg';

  return (
    <Card className={`border-slate-200 shadow-sm ${config.borderClassName || ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <Badge variant={config.badgeVariant || 'secondary'} className={badgeClassName}>
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
