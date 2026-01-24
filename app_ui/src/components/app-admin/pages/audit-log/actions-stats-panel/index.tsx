import { Database, Activity, HardDrive, FileCode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import StatCard from './StatCard';
import { useAuditLogStatsPanelData } from './useAuditLogStatsPanelData';
import { SkeletonChart } from '../../../../ui/skeletons';


export default function ActionStatsPanel() {
  const { data :statistics, isLoading, error } = useAuditLogStatsPanelData();

  if (isLoading) return <SkeletonChart />;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Статистика за типом дій</CardTitle>
        <CardDescription>Розподіл операцій в системі</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Create */}
          <StatCard title="Створення" icon={Database} value={statistics!.create} />
          <StatCard title="Оновлення" icon={Activity} value={statistics!.update} />
          <StatCard title="Видалення" icon={HardDrive} value={statistics!.delete} />
          <StatCard title="Запити" icon={FileCode} value={statistics!.query} />
        </div>
      </CardContent>
    </Card>
  );
}
