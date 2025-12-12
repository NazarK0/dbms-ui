import { Database, Users, Table2, HardDrive, Clock, TrendingUp, ArrowUp, ArrowDown, Activity, Plus, Eye, EyeOff, LayoutDashboard, UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';
import StatCard from '../dashboard/StatCard';
import ActivityItem from '../dashboard/ActivityItem';
import ConnectionItem from '../dashboard/ConnectionItem';
import { useDashboardCustomization } from '../hooks/useDashboardCustomization';
import { statsData, recentActivity, activeConnections, performanceMetrics } from '../data/mockAdminData';

export default function Dashboard() {
  const {
    visibleCards,
    customizeDialogOpen,
    setCustomizeDialogOpen,
    toggleCardVisibility,
    isCardVisible,
    visibleCount,
  } = useDashboardCustomization();

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
              {['stats', 'performance', 'activity'].map((category) => (
                <div key={category} className="space-y-3">
                  <h4 className="text-sm text-slate-900">
                    {category === 'stats' ? 'Статистика' : category === 'performance' ? 'Продуктивність' : 'Активність'}
                  </h4>
                  {visibleCards.filter(c => c.category === category).map(card => (
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
              ))}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statsData.map((stat) => (
          <StatCard 
            key={stat.id}
            {...stat}
            visible={isCardVisible(stat.id)}
          />
        ))}
      </div>

      {/* Performance Overview */}
      {isCardVisible('performance') && (
        <Card className="border-lime-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-lime-600" />
              <CardTitle>Огляд продуктивності</CardTitle>
            </div>
            <CardDescription>Ключові метрики за останню годину</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {performanceMetrics.map(metric => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">{metric.label}</p>
                    <Badge variant="outline">{metric.value}%</Badge>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        {isCardVisible('activity') && (
          <Card className="border-lime-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-lime-600" />
                <CardTitle>Остання активність</CardTitle>
              </div>
              <CardDescription>Нещодавні події системи</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentActivity.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Connections */}
        {isCardVisible('connections') && (
          <Card className="border-lime-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-lime-600" />
                <CardTitle>Активні з'єднання</CardTitle>
              </div>
              <CardDescription>Поточні підключення до серверу</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {activeConnections.map((conn, index) => (
                  <ConnectionItem key={index} {...conn} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
