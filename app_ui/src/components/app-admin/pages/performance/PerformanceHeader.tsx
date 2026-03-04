import { RefreshCw, Download } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';

interface PerformanceHeaderProps {
  timeRange: string;
}

export default function PerformanceHeader({timeRange}: PerformanceHeaderProps) {

  const exportHandler = () => {}
  const refreshHandler = () => {}
  const timeChangeHandler = () => {}

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-slate-900">Аналіз продуктивності</h2>
        <p className="text-slate-600">
          Статистика запитів та рекомендації з оптимізації (pg_stat_statements)
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Select value={timeRange} onValueChange={timeChangeHandler}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15m">Останні 15 хвилин</SelectItem>
            <SelectItem value="1h">Остання година</SelectItem>
            <SelectItem value="24h">Останні 24 години</SelectItem>
            <SelectItem value="7d">Останні 7 днів</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={refreshHandler}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Оновити
        </Button>
        <Button onClick={exportHandler}>
          <Download className="w-4 h-4 mr-2" />
          Експорт звіту
        </Button>
      </div>
    </div>
  );
}
