import { Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

interface DatabaseGroup {
  group: string;
  databases: string[];
  grantedBy: string[];
}

interface DatabaseAccessCardProps {
  groupedDatabases: DatabaseGroup[];
}

export default function DatabaseAccessCard({ groupedDatabases }: DatabaseAccessCardProps) {
  return (
    <Card className="border-violet-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-violet-600" />
          Доступ до баз даних
        </CardTitle>
        <CardDescription>Бази даних доступні на основі ваших ролей</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {groupedDatabases.map((group, index) => (
          <div key={index} className="p-4 bg-violet-50 rounded-lg border border-violet-200">
            <h4 className="text-slate-900 font-medium mb-3">{group.group}</h4>
            <div className="space-y-2">
              {group.databases.map((db) => (
                <div key={db} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">{db}</span>
                  <div className="flex gap-1">
                    {group.grantedBy.map((role) => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
