import { LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

interface StatCardProps {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  change: string;
  trend: 'up' | 'down';
  visible?: boolean;
}

export default function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  color, 
  change, 
  trend,
  visible = true 
}: StatCardProps) {
  if (!visible) return null;

  return (
    <Card className="border-lime-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm text-slate-600">{label}</CardTitle>
          <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-md`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <p className="text-slate-900 text-3xl">{value}</p>
          <Badge variant={trend === 'up' ? 'default' : 'secondary'} className="gap-1">
            {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
