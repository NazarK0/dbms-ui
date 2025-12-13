import { Database, Activity, HardDrive, FileCode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import type { ActionTypeStatsProps } from './types';

export default function ActionTypeStats({ statistics }: ActionTypeStatsProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Статистика за типом дій</CardTitle>
        <CardDescription>Розподіл операцій в системі</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Create */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-600 text-sm">Створення</p>
                <p className="text-2xl text-slate-900">{statistics.create}</p>
              </div>
            </div>
          </div>

          {/* Update */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-600 text-sm">Оновлення</p>
                <p className="text-2xl text-slate-900">{statistics.update}</p>
              </div>
            </div>
          </div>

          {/* Delete */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-600 text-sm">Видалення</p>
                <p className="text-2xl text-slate-900">{statistics.delete}</p>
              </div>
            </div>
          </div>

          {/* Query */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-600 to-yellow-600 rounded-lg flex items-center justify-center">
                <FileCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-600 text-sm">Запити</p>
                <p className="text-2xl text-slate-900">{statistics.query}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
