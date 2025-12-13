import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import type { UserStatsCardProps } from './types';

export default function UserStatsCard({ data }: UserStatsCardProps) {
  const Icon = data.icon;

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${data.gradient} rounded-xl flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <Badge variant="secondary" className="text-lg">
            {data.value}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl mb-1">{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
