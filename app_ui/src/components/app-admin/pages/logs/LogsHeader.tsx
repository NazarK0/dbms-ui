import { RefreshCw, Download } from 'lucide-react';
import { Button } from '../../../ui/button';

export default function LogsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-slate-900">Системні логи</h2>
        <p className="text-slate-600">Журнал подій та помилок системи</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Оновити
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Експорт
        </Button>
      </div>
    </div>
  );
}
