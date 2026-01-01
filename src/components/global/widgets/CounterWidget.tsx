import { ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface CounterWidgetProps {
    value: string;
    change: string | number;
}

export default function CounterWidget({
    value,
    change,
}: CounterWidgetProps) {
    let trend: 'up' | 'down' | 'unchanged' = 'unchanged';
    let changeNum = typeof change === 'string' ? parseFloat(change) : change;
    
    if (changeNum > 0) {
        trend = 'up';
    } else if (changeNum < 0) {
        trend = 'down';
    } else {
        trend = 'unchanged';
    }

    return (
        <div className="flex items-baseline justify-between">
            <p className="text-slate-900 text-3xl">{value}</p>
            <Badge variant={trend === 'up' ? 'default' : 'secondary'} className="gap-1">
                {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {change}
            </Badge>
        </div>
    );
}