import { Cpu, Database, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { quickPresets } from '../../../../mockData/admin/postgresConfig';
import { useState } from 'react';

interface QuickPresetsProps {
  onApplyPreset?: (presetType: 'development' | 'production' | 'highload') => void;
}

// Map icon names to actual icon components
const iconMap = {
  Cpu,
  Database,
  Zap,
} as const;

export default function QuickPresets({ onApplyPreset }: QuickPresetsProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const handleApplyPreset = (presetType: 'development' | 'production' | 'highload') => {
    console.log('Applying preset:', presetType);
    setHasChanges(true);
  };

  
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Швидкі пресети</CardTitle>
        <CardDescription>Попередньо налаштовані конфігурації для різних сценаріїв</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickPresets.map((preset) => {
            const Icon = iconMap[preset.icon as keyof typeof iconMap];
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
                  onClick={() => handleApplyPreset(preset.id)}
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
