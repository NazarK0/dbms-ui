import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Clock, User, Edit, Trash2, Plus } from 'lucide-react';

interface HistoryEvent {
  id: number;
  action: 'created' | 'updated' | 'deleted';
  role: string;
  user: string;
  timestamp: string;
  details?: string;
}

export default function RoleHistory() {
  const history: HistoryEvent[] = [
    {
      id: 1,
      action: 'created',
      role: 'Data Analyst',
      user: 'admin',
      timestamp: '2024-12-12 10:30',
      details: 'Створено нову роль з правами читання'
    },
    {
      id: 2,
      action: 'updated',
      role: 'Developer',
      user: 'superadmin',
      timestamp: '2024-12-11 15:45',
      details: 'Оновлено права доступу до БД'
    },
    {
      id: 3,
      action: 'deleted',
      role: 'Temporary Access',
      user: 'admin',
      timestamp: '2024-12-10 09:15',
      details: 'Видалено тимчасову роль'
    },
    {
      id: 4,
      action: 'updated',
      role: 'Content Manager',
      user: 'admin',
      timestamp: '2024-12-09 14:20',
      details: 'Додано права на редагування таблиць'
    },
    {
      id: 5,
      action: 'created',
      role: 'Report Viewer',
      user: 'superadmin',
      timestamp: '2024-12-08 11:00',
      details: 'Створено роль тільки для перегляду звітів'
    },
  ];

  const getActionIcon = (action: HistoryEvent['action']) => {
    switch (action) {
      case 'created':
        return <Plus className="size-4" />;
      case 'updated':
        return <Edit className="size-4" />;
      case 'deleted':
        return <Trash2 className="size-4" />;
    }
  };

  const getActionBadge = (action: HistoryEvent['action']) => {
    switch (action) {
      case 'created':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Створено</Badge>;
      case 'updated':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Оновлено</Badge>;
      case 'deleted':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Видалено</Badge>;
    }
  };

  return (
    <Card className="border-lime-200">
      <CardHeader>
        <CardTitle className="text-slate-900">Історія змін ролей</CardTitle>
        <CardDescription>Журнал всіх операцій з ролями та правами доступу</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 p-4 rounded-lg border border-lime-100 hover:bg-lime-50/50 transition-colors"
            >
              <div className={`
                p-2 rounded-lg
                ${event.action === 'created' ? 'bg-green-100 text-green-600' : ''}
                ${event.action === 'updated' ? 'bg-blue-100 text-blue-600' : ''}
                ${event.action === 'deleted' ? 'bg-red-100 text-red-600' : ''}
              `}>
                {getActionIcon(event.action)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getActionBadge(event.action)}
                  <span className="text-slate-900">{event.role}</span>
                </div>
                
                {event.details && (
                  <p className="text-sm text-slate-600 mb-2">{event.details}</p>
                )}
                
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <User className="size-3" />
                    <span>{event.user}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3" />
                    <span>{event.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
