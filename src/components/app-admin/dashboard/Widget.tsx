import { LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { getRandomInt } from '../../../utils/getRandomInt';

interface Counter {
	value: number | string;
	change?: number | string;
}

type TableRows<T> = T[] 

interface StatsCounter {
	value: number | string;
	change: number | string;
}

interface StatsCounter {
	value: number | string;
	change: number | string;
}


enum WidgetType {
	COUNTER,
	LIST,
	LOAD,
}

interface WidgetProps<T extends object[] | Stats > {
  label: string;
  value: T;
  wType: WidgetType;
  icon: LucideIcon;
}

const widgetBgColors = [
	'from-lime-500 to-green-600',
	'from-lime-600 to-green-500',
	'from-violet-500 to-purple-600',
	'from-yellow-500 to-lime-600',
	'from-lime-600 to-yellow-600',
];

export function Widget<T>({ 
  label, 
  value, 
  type,
  icon: Icon, 
  change,
}: WidgetProps) {
  const trend = change > 0 ? 'up' : 'down';
  const colorIdx = getRandomInt(widgetBgColors.length -1);
  const color = widgetBgColors[colorIdx];

  return (
    <Card className="border-lime-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-md`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-sm text-slate-600">{label}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          
        </div>
      </CardContent>
    </Card>
  );
}
