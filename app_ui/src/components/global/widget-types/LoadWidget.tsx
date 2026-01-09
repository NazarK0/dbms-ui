import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';

interface LoadWidgetProps {
    value: number;
}

export default function LoadWidget({ value }: LoadWidgetProps) {
    let color: 'green' | 'yellow' | 'red' = 'green';


    if (value > 70) {
        color = 'red';
    } else if (value > 40) {
        color = 'yellow';
    } else {
        color = 'green';
    }

    return (
        <div className="flex items-center justify-between">
            <Badge variant="outline">{value}%</Badge>
            <Progress color={color} value={value} className="h-2" />
        </div>
    );
}