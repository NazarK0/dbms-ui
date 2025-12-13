import { Cpu, Database, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';

interface QuickPresetsProps {
  onApplyPreset?: (presetType: 'development' | 'production' | 'highload') => void;
}

export default function QuickPresets({ onApplyPreset }: QuickPresetsProps) {
  const presets = [
    {
      id: 'development',
      name: 'Розробка',
      description: 'Мінімальне споживання ресурсів, детальне логування',
      icon: Cpu,
      color: 'from-green-500 to-lime-600',
    },
    {
      id: 'production',
      name: 'Продакшн',
      description: 'Оптимізація для продуктивності та стабільності',
      icon: Database,
      color: 'from-yellow-500 to-lime-600',
    },
    {
      id: 'highload',
      name: 'Висока навантаження',
      description: 'Максимальна продуктивність для великих навантажень',
      icon: Zap,
      color: 'from-lime-500 to-green-600',
    },
  ];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Швидкі пресети</CardTitle>
        <CardDescription>Попередньо налаштовані конфігурації для різних сценаріїв</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presets.map((preset) => {
            const Icon = preset.icon;
            return (
              <div key={preset.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${preset.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-slate-900">{preset.name}</h4>
                </div>
                <p className="text-slate-600 text-sm mb-4">{preset.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onApplyPreset?.(preset.id as 'development' | 'production' | 'highload')}
                >
                  Застосувати
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
