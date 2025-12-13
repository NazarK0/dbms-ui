import { Zap } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import SlowQueryItem from './SlowQueryItem';
import type { SlowQueriesCardProps } from './types';

export default function SlowQueriesCard({ queries }: SlowQueriesCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-600" />
          <CardTitle>Повільні запити (за останні 24 години)</CardTitle>
        </div>
        <CardDescription>Запити з найдовшим часом виконання</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {queries.map((query, index) => (
            <SlowQueryItem key={index} query={query} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
