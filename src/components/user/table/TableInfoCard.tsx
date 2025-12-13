import { Card, CardContent } from '../../ui/card';

interface TableInfoCardProps {
  database: string;
  recordsCount: number;
}

export default function TableInfoCard({ database, recordsCount }: TableInfoCardProps) {
  return (
    <Card className="border-violet-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            База даних: <span className="font-medium text-slate-900">{database}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>{recordsCount} записів</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
