import { Activity } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import ConnectionItem from '../../../dashboard/ConnectionItem';
import type { ActiveConnectionsCardProps } from './types';

export default function ActiveConnectionsCard({
  connections,
  visible,
}: ActiveConnectionsCardProps) {
  if (!visible) return null;

  return (
    <Card className="border-lime-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-lime-600" />
          <CardTitle>Активні з'єднання</CardTitle>
        </div>
        <CardDescription>Поточні підключення до серверу</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {connections.map((conn, index) => (
            <ConnectionItem key={index} {...conn} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
