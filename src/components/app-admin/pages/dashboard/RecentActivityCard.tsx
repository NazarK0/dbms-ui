import { Clock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { ActivityItem } from '../../dashboard/ActivityItem';
import type { RecentActivityCardProps } from './types';

export default function RecentActivityCard({
  activities,
  visible,
}: RecentActivityCardProps) {
  if (!visible) return null;

  return (
    <Card className="border-lime-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-lime-600" />
          <CardTitle>Остання активність</CardTitle>
        </div>
        <CardDescription>Нещодавні події системи</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
