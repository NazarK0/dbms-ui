import { LucideIcon } from 'lucide-react';
import type { IntClosedRange } from 'type-fest';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getRandomInt } from '../../utils/getRandomInt';
import { CounterWidget, ListWidget, LoadWidget } from './widget-types';
import { ColumnConfig, TableRows } from './table';


export interface CounterWidgetData {
  value: number | string;
  change: number | string;
}
export interface LoadWidgetData {
  value: IntClosedRange<0, 100>;
}
export interface ListWidgetData {
  columns: ColumnConfig<Record<string, any>>;
  data: TableRows<Record<string, any>>;
  url?: string;
  rowClassName?: (row: Record<string, any>) => string;
}



export enum WidgetType {
  COUNTER,
  LIST,
  LOAD,
}

interface WidgetProps<D extends CounterWidgetData | LoadWidgetData | ListWidgetData> {
  title: string;
  data: D;
  type: WidgetType;
  icon: LucideIcon;
}

const widgetBgColors = [
  'from-lime-500 to-green-600',
  'from-lime-600 to-green-500',
  'from-violet-500 to-purple-600',
  'from-yellow-500 to-lime-600',
  'from-lime-600 to-yellow-600',
];

export default function Widget<D extends CounterWidgetData | LoadWidgetData | ListWidgetData>({
  title,
  data,
  type,
  icon: Icon,
}: WidgetProps<D>) {

  const colorIdx = getRandomInt(widgetBgColors.length - 1);
  const color = widgetBgColors[colorIdx];


  return (
    <Card className="border-lime-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-md`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-sm text-slate-600">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {type === WidgetType.COUNTER && <CounterWidget value={(data as CounterWidgetData).value} change={(data as CounterWidgetData).change} />}
        {type === WidgetType.LOAD && <LoadWidget value={(data as LoadWidgetData).value} />}
        {type === WidgetType.LIST && (
          <ListWidget
            columns={(data as ListWidgetData).columns}
            data={(data as ListWidgetData).data as TableRows<Record<string, any>>}
            url={(data as ListWidgetData).url}
            rowClassName={(data as ListWidgetData).rowClassName}
          />
        )}
      </CardContent>
    </Card>
  );
}
