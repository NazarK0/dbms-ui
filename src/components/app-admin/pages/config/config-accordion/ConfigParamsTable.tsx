import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../../../ui/table';
import ConfigParamRow from './ConfigParamRow';
import type { ConfigParamsTableProps } from './types';

export default function ConfigParamsTable({ params, onParamChange }: ConfigParamsTableProps) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-64">Параметр</TableHead>
            <TableHead className="w-48">Поточне значення</TableHead>
            <TableHead className="w-48">За замовчуванням</TableHead>
            <TableHead>Опис</TableHead>
            <TableHead className="w-32 text-center">Restart</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {params.map((param) => (
            <ConfigParamRow
              key={param.name}
              param={param}
              onParamChange={onParamChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
