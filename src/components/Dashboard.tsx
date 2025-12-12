import { Database, Users, Table2, HardDrive, Clock, TrendingUp, ArrowUp, ArrowDown, Activity, Plus, Eye, EyeOff, LayoutDashboard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { useState } from 'react';

interface DashboardCard {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  category: 'stats' | 'performance' | 'activity';
}

export default function Dashboard() {
  const [customizeDialogOpen, setCustomizeDialogOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState<DashboardCard[]>([
    { id: 'databases', name: 'Всього баз даних', description: 'Кількість баз даних у системі', visible: true, category: 'stats' },
    { id: 'users', name: 'Активних користувачів', description: 'Кількість активних користувачів', visible: true, category: 'stats' },
    { id: 'tables', name: 'Всього таблиць', description: 'Загальна кількість таблиць', visible: true, category: 'stats' },
    { id: 'storage', name: 'Використано сховища', description: 'Використаний дисковий простір', visible: true, category: 'stats' },
    { id: 'performance', name: 'Огляд продуктивності', description: 'Ключові метрики продуктивності', visible: true, category: 'performance' },
    { id: 'activity', name: 'Остання активність', description: 'Нещодавні події системи', visible: true, category: 'activity' },
    { id: 'connections', name: 'Активні з\'єднання', description: 'Поточні підключення', visible: true, category: 'activity' },
  ]);

  const toggleCardVisibility = (cardId: string) => {
    setVisibleCards(visibleCards.map(card => 
      card.id === cardId ? { ...card, visible: !card.visible } : card
    ));
  };

  const isCardVisible = (cardId: string) => {
    return visibleCards.find(card => card.id === cardId)?.visible ?? true;
  };

  const visibleCount = visibleCards.filter(card => card.visible).length;

  const stats = [
    { label: 'Всього баз даних', value: '12', icon: Database, color: 'from-lime-500 to-green-600', change: '+2', trend: 'up' },
    { label: 'Активних користувачів', value: '47', icon: Users, color: 'from-green-500 to-lime-600', change: '+5', trend: 'up' },
    { label: 'Всього таблиць', value: '248', icon: Table2, color: 'from-yellow-500 to-lime-600', change: '+12', trend: 'up' },
    { label: 'Використано сховища', value: '3.2 ГБ', icon: HardDrive, color: 'from-lime-600 to-yellow-600', change: '-0.4 ГБ', trend: 'down' },
  ];

  const recentActivity = [
    { action: 'База даних створена', details: 'production_db', user: 'admin', time: '2 хвилини тому', type: 'success' },
    { action: 'Користувач створений', details: 'developer_user', user: 'root', time: '15 хвилин тому', type: 'info' },
    { action: 'Таблицю змінено', details: 'users.customers', user: 'admin', time: '1 годину тому', type: 'warning' },
    { action: 'Резервне копіювання завершено', details: 'staging_db', user: 'system', time: '2 години тому', type: 'success' },
    { action: 'Запит виконано', details: 'SELECT * FROM orders', user: 'analyst', time: '3 години тому', type: 'info' },
  ];

  const activeConnections = [
    { database: 'production_db', user: 'app_user', state: 'активний', duration: '00:45:32', queries: 1234 },
    { database: 'analytics_db', user: 'analyst', state: 'очікує', duration: '01:23:45', queries: 45 },
    { database: 'staging_db', user: 'developer', state: 'активний', duration: '00:12:18', queries: 678 },
    { database: 'production_db', user: 'api_service', state: 'активний', duration: '05:34:21', queries: 8921 },
  ];

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Customize Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 text-2xl">Панель керування</h2>
          <p className="text-slate-600 text-sm mt-1">
            Показано {visibleCount} з {visibleCards.length} віджетів
          </p>
        </div>
        <Dialog open={customizeDialogOpen} onOpenChange={setCustomizeDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Налаштувати панель
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Налаштування панелі керування</DialogTitle>
              <DialogDescription>
                Виберіть, які віджети відображати на панелі керування
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              {/* Stats Cards */}
              <div className="space-y-3">
                <h4 className="text-sm text-slate-900">Статистика</h4>
                {visibleCards.filter(c => c.category === 'stats').map(card => (
                  <div 
                    key={card.id} 
                    className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Checkbox
                      id={card.id}
                      checked={card.visible}
                      onCheckedChange={() => toggleCardVisibility(card.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={card.id}
                        className="text-sm cursor-pointer block mb-1"
                      >
                        {card.name}
                      </Label>
                      <p className="text-xs text-slate-600">{card.description}</p>
                    </div>
                    {card.visible ? (
                      <Eye className="w-4 h-4 text-green-600 mt-1" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-400 mt-1" />
                    )}
                  </div>
                ))}
              </div>

              {/* Performance Cards */}
              <div className="space-y-3">
                <h4 className="text-sm text-slate-900">Продуктивність</h4>
                {visibleCards.filter(c => c.category === 'performance').map(card => (
                  <div 
                    key={card.id} 
                    className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Checkbox
                      id={card.id}
                      checked={card.visible}
                      onCheckedChange={() => toggleCardVisibility(card.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={card.id}
                        className="text-sm cursor-pointer block mb-1"
                      >
                        {card.name}
                      </Label>
                      <p className="text-xs text-slate-600">{card.description}</p>
                    </div>
                    {card.visible ? (
                      <Eye className="w-4 h-4 text-green-600 mt-1" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-400 mt-1" />
                    )}
                  </div>
                ))}
              </div>

              {/* Activity Cards */}
              <div className="space-y-3">
                <h4 className="text-sm text-slate-900">Активність</h4>
                {visibleCards.filter(c => c.category === 'activity').map(card => (
                  <div 
                    key={card.id} 
                    className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Checkbox
                      id={card.id}
                      checked={card.visible}
                      onCheckedChange={() => toggleCardVisibility(card.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={card.id}
                        className="text-sm cursor-pointer block mb-1"
                      >
                        {card.name}
                      </Label>
                      <p className="text-xs text-slate-600">{card.description}</p>
                    </div>
                    {card.visible ? (
                      <Eye className="w-4 h-4 text-green-600 mt-1" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-slate-400 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCustomizeDialogOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={() => setCustomizeDialogOpen(false)}>
                Застосувати
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      {isCardVisible('databases') || isCardVisible('users') || isCardVisible('tables') || isCardVisible('storage') ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const cardIds = ['databases', 'users', 'tables', 'storage'];
            if (!isCardVisible(cardIds[index])) return null;
            
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
            return (
              <Card key={stat.label} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                      <p className="text-slate-900 text-3xl">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                      <TrendIcon className="w-3 h-3 mr-1" />
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-slate-500">за останній тиждень</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}

      {/* Performance Overview */}
      {isCardVisible('performance') && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <CardTitle>Огляд продуктивності</CardTitle>
            </div>
            <CardDescription>Ключові метрики за останню годину</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Продуктивність запитів</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    ↓ 8%
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900 text-2xl">12.4</span>
                  <span className="text-slate-500">мс</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Коефіцієнт попадань кешу</p>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    ↑ 2%
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900 text-2xl">98.2</span>
                  <span className="text-slate-500">%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Використання CPU</p>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    ↑ 5%
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900 text-2xl">34</span>
                  <span className="text-slate-500">%</span>
                </div>
                <Progress value={34} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        {isCardVisible('activity') && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-700" />
                <CardTitle>Остання активність</CardTitle>
              </div>
              <CardDescription>Нещодавні події системи</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full mt-2 flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 text-sm">{activity.action}</p>
                      <p className="text-slate-600 text-sm truncate">{activity.details}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {activity.user}
                        </Badge>
                        <span className="text-slate-500 text-xs">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Connections */}
        {isCardVisible('connections') && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-slate-700" />
                <CardTitle>Активні з'єднання</CardTitle>
              </div>
              <CardDescription>Поточні підключення до серверу</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeConnections.map((conn, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-slate-900 text-sm">{conn.database}</p>
                        <Badge 
                          variant={conn.state === 'активний' ? 'default' : 'secondary'} 
                          className="text-xs"
                        >
                          {conn.state}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-xs">{conn.user}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-900 text-sm">{conn.duration}</p>
                      <p className="text-slate-500 text-xs">{conn.queries} запитів</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}