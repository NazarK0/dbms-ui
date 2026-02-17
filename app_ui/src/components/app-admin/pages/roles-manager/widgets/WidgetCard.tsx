
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Badge } from '../../../../ui/badge';
import type { WidgetCardProps } from './types';

export default function WidgetCard({
  icon: Icon,
  gradient,
  value,
  title,
  description,
}: WidgetCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <Badge variant="secondary" className="text-lg">{value}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl mb-1">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
