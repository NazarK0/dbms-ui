import { Settings, CheckCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import type { ConfigStatistics as ConfigStats } from './types';

interface ConfigStatisticsProps {
  statistics: ConfigStats;
}

export default function ConfigStatistics({ statistics }: ConfigStatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-lg">{statistics.totalParams}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Всього параметрів</CardTitle>
          <CardDescription>Доступні налаштування</CardDescription>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-lg">{statistics.changed}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Змінених</CardTitle>
          <CardDescription>Відрізняються від default</CardDescription>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm border-yellow-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="text-lg border-yellow-500 text-yellow-700">
              {statistics.requiresRestart}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Потрібен restart</CardTitle>
          <CardDescription>Після зміни значення</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
