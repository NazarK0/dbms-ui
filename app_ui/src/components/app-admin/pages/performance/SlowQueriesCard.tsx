import { Badge } from '../../../ui/badge';
import { Alert, AlertDescription } from '../../../ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Clock, TrendingUp } from 'lucide-react';
import type { SlowQueryDetail } from '../../../../mockData/admin';
import { getImpactVariant } from './utils/getImpactVariant';

interface SlowQueriesCardProps {
  queries: SlowQueryDetail[];
}

export default function SlowQueriesCard({ queries }: SlowQueriesCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-600" />
          <CardTitle>Повільні запити та рекомендації</CardTitle>
        </div>
        <CardDescription>Запити, які потребують оптимізації</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {queries.map((query, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <code className="text-sm text-slate-900 block mb-2 bg-white px-3 py-2 rounded font-mono">
                    {query.query}
                  </code>
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="outline" className="gap-1">
                      <Clock className="w-3 h-3" />
                      Середній час: {query.avgTime}
                    </Badge>
                    <Badge variant="secondary">{query.calls} викликів</Badge>
                  </div>
                </div>
                <Badge variant={getImpactVariant(query.impact)}>
                  {query.impact} важливість
                </Badge>
              </div>
              <Alert className="bg-blue-50 border-blue-200">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  <strong>Рекомендація:</strong> {query.recommendation}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}