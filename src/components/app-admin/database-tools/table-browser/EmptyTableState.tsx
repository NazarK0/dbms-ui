import { Table2 } from 'lucide-react';
import { Card, CardContent } from '../../../ui/card';
import type { EmptyTableStateProps } from './types';

export default function EmptyTableState({
  message = 'Таблицю не вибрано',
  description = 'Оберіть таблицю зі списку, щоб переглянути її схему та дані',
}: EmptyTableStateProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Table2 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-slate-900 mb-2">{message}</h3>
        <p className="text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
