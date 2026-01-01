import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';

interface LoadWidgetProps {
    value: string;
}

export default function LoadWidget({ value }: LoadWidgetProps) {
    let color: 'green' | 'yellow' | 'red' = 'green';
    let valueNum = parseFloat(value);

    if (valueNum > 70) {
        color = 'red';
    } else if (valueNum > 40) {
        color = 'yellow';
    } else {
        color = 'green';
    }

    return (
        <div className="flex items-center justify-between">
            <Badge variant="outline">{value}</Badge>
            <Progress color={color} value={valueNum} className="h-2" />
        </div>
    );
}