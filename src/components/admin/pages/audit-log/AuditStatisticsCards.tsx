import { History, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import type { AuditStatisticsCardsProps } from './types';

export default function AuditStatisticsCards({ statistics }: AuditStatisticsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Events */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
              <History className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-lg">
              {statistics.total}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Всього подій</CardTitle>
          <CardDescription>За весь період</CardDescription>
        </CardContent>
      </Card>

      {/* Today */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-lg">
              {statistics.today}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Сьогодні</CardTitle>
          <CardDescription>Події за 12 грудня</CardDescription>
        </CardContent>
      </Card>

      {/* Success */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-lime-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <Badge variant="default" className="text-lg">
              {statistics.success}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Успішних</CardTitle>
          <CardDescription>Виконано без помилок</CardDescription>
        </CardContent>
      </Card>

      {/* Failed */}
      <Card className="border-slate-200 shadow-sm border-red-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <Badge variant="destructive" className="text-lg">
              {statistics.failed}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl mb-1">Помилкових</CardTitle>
          <CardDescription>Виконано з помилками</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
