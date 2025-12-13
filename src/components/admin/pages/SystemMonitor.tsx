import { Database, Activity, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { systemStats, connections, slowQueries, databaseStats } from '../../../mockData/admin';

export default function SystemMonitor() {
  const getStateBadge = (state: string) => {
    switch(state) {
      case 'активний': return 'default';
      case 'очікує': return 'secondary';
      case 'в транзакції': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">Системний моніторинг</h2>
        <p className="text-slate-600">Моніторинг продуктивності PostgreSQL в реальному часі</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-slate-200 shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-slate-900 text-2xl">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Database Statistics */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-slate-700" />
            <CardTitle>Статистика баз даних</CardTitle>
          </div>
          <CardDescription>Метрики продуктивності для кожної бази даних</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>База даних</TableHead>
                <TableHead>Розмір</TableHead>
                <TableHead>З'єднання</TableHead>
                <TableHead>TPS</TableHead>
                <TableHead>Коеф. попадань кешу</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {databaseStats.map((db) => (
                <TableRow key={db.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Database className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-900">{db.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{db.size}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{db.connections}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{db.tps}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress value={db.cache_hit} className="h-2 flex-1 max-w-[120px]" />
                      <span className="text-slate-900 text-sm min-w-[50px]">{db.cache_hit}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Active Connections */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-700" />
            <CardTitle>Активні з'єднання</CardTitle>
          </div>
          <CardDescription>Поточні підключення до PostgreSQL серверу</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PID</TableHead>
                <TableHead>База даних</TableHead>
                <TableHead>Користувач</TableHead>
                <TableHead>Стан</TableHead>
                <TableHead>Запит</TableHead>
                <TableHead>Тривалість</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {connections.map((conn) => (
                <TableRow key={conn.pid}>
                  <TableCell className="text-slate-900 font-mono text-sm">{conn.pid}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{conn.database}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{conn.user}</TableCell>
                  <TableCell>
                    <Badge variant={getStateBadge(conn.state)}>
                      {conn.state}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <code className="text-xs text-slate-600 truncate block bg-slate-50 px-2 py-1 rounded">
                      {conn.query}
                    </code>
                  </TableCell>
                  <TableCell className="text-slate-600 font-mono text-sm">{conn.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Slow Queries */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <CardTitle>Повільні запити (за останні 24 години)</CardTitle>
          </div>
          <CardDescription>Запити з найдовшим часом виконання</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {slowQueries.map((query, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <code className="text-sm text-slate-900 flex-1 font-mono">{query.query}</code>
                  <Badge variant="destructive" className="shrink-0">{query.duration}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary">{query.calls} викликів</Badge>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">{query.database}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}