import { useState } from 'react';
import { Plus, Server, Activity, AlertCircle, CheckCircle, Clock, MapPin, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

export default function ReplicaClusters() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);

  const clusters = [
    {
      id: 1,
      name: 'Primary Cluster',
      role: 'Primary',
      status: 'healthy',
      host: 'primary-db.example.com',
      port: 5432,
      location: 'US East (Virginia)',
      version: 'PostgreSQL 15.4',
      uptime: '45 days 12:34:56',
      connections: 47,
      replicationLag: '0ms',
      databases: 12,
    },
    {
      id: 2,
      name: 'Read Replica 1',
      role: 'Replica',
      status: 'healthy',
      host: 'replica-1.example.com',
      port: 5432,
      location: 'US West (Oregon)',
      version: 'PostgreSQL 15.4',
      uptime: '42 days 08:15:22',
      connections: 23,
      replicationLag: '12ms',
      databases: 12,
    },
    {
      id: 3,
      name: 'Read Replica 2',
      role: 'Replica',
      status: 'healthy',
      host: 'replica-2.example.com',
      port: 5432,
      location: 'EU (Ireland)',
      version: 'PostgreSQL 15.4',
      uptime: '38 days 16:42:10',
      connections: 18,
      replicationLag: '45ms',
      databases: 12,
    },
    {
      id: 4,
      name: 'Read Replica 3',
      role: 'Replica',
      status: 'warning',
      host: 'replica-3.example.com',
      port: 5432,
      location: 'Asia Pacific (Singapore)',
      version: 'PostgreSQL 15.4',
      uptime: '15 days 04:18:33',
      connections: 31,
      replicationLag: '234ms',
      databases: 12,
    },
  ];

  const replicationStats = [
    { metric: 'Слоти реплікації', value: '3', icon: Server, color: 'from-lime-500 to-green-600' },
    { metric: 'Середня затримка', value: '97мс', icon: Clock, color: 'from-green-500 to-lime-600' },
    { metric: 'Передано даних', value: '2.4 ТБ', icon: Zap, color: 'from-yellow-500 to-lime-600' },
    { metric: 'Статус синхр.', value: 'Streaming', icon: Activity, color: 'from-lime-600 to-yellow-600' },
  ];

  const replicationActivity = [
    {
      replica: 'Read Replica 1',
      state: 'streaming',
      syncState: 'async',
      sentLSN: '0/8A2F4D8',
      writeLSN: '0/8A2F4D8',
      flushLSN: '0/8A2F4D8',
      lag: '12мс',
    },
    {
      replica: 'Read Replica 2',
      state: 'streaming',
      syncState: 'async',
      sentLSN: '0/8A2F4C0',
      writeLSN: '0/8A2F4C0',
      flushLSN: '0/8A2F4C0',
      lag: '45мс',
    },
    {
      replica: 'Read Replica 3',
      state: 'streaming',
      syncState: 'async',
      sentLSN: '0/8A2F3A8',
      writeLSN: '0/8A2F3A8',
      flushLSN: '0/8A2F3A8',
      lag: '234мс',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Кластери реплік</h2>
          <p className="text-slate-600">Управління топологією та моніторинг реплікації PostgreSQL</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Додати репліку
        </Button>
      </div>

      {/* Replication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {replicationStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.metric} className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-600 text-sm mb-1">{stat.metric}</p>
                    <p className="text-slate-900 text-2xl">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Topology Diagram */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Топологія реплікації</CardTitle>
          <CardDescription>Схема підключень primary та replica серверів</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-8">
            {/* Primary */}
            <div className="w-full max-w-md">
              <div className="bg-gradient-to-br from-lime-50 to-green-50 border-2 border-lime-500 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Server className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-900">Primary Cluster</span>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-sm text-slate-600">
                  <p className="font-mono">primary-db.example.com:5432</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-3 h-3" />
                    <p className="text-xs">US East (Virginia)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Lines */}
            <div className="relative w-full max-w-4xl h-16">
              <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-slate-300"></div>
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-300"></div>
              <div className="absolute top-8 left-1/4 w-0.5 h-8 bg-slate-300"></div>
              <div className="absolute top-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
              <div className="absolute top-8 left-3/4 w-0.5 h-8 bg-slate-300"></div>
            </div>

            {/* Replicas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-green-600" />
                    <span className="text-slate-900 text-sm">Replica 1</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-mono truncate">replica-1.example.com</p>
                  <p className="mt-1">US West • Lag: 12ms</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-green-600" />
                    <span className="text-slate-900 text-sm">Replica 2</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-mono truncate">replica-2.example.com</p>
                  <p className="mt-1">EU Ireland • Lag: 45ms</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-500 rounded-xl p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-yellow-600" />
                    <span className="text-slate-900 text-sm">Replica 3</span>
                  </div>
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-mono truncate">replica-3.example.com</p>
                  <p className="mt-1">AP Singapore • Lag: 234ms</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cluster Details */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Деталі кластерів</CardTitle>
          <CardDescription>Інформація про всі сервери в топології</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Назва</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Локація</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>З'єднання</TableHead>
                <TableHead>Затримка репл.</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clusters.map((cluster) => (
                <TableRow key={cluster.id} className="cursor-pointer" onClick={() => setSelectedCluster(cluster.id)}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-900">{cluster.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={cluster.role === 'Primary' ? 'default' : 'secondary'}>
                      {cluster.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {cluster.status === 'healthy' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 text-sm">Healthy</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                          <span className="text-yellow-600 text-sm">Warning</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-600 text-sm">{cluster.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                      {cluster.host}:{cluster.port}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{cluster.connections}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        parseInt(cluster.replicationLag) === 0 ? 'default' : 
                        parseInt(cluster.replicationLag) > 100 ? 'destructive' : 
                        'secondary'
                      }
                    >
                      {cluster.replicationLag}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">Налаштувати</Button>
                      {cluster.role !== 'Primary' && (
                        <Button variant="ghost" size="sm" className="text-green-600">Promote</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Replication Activity */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-700" />
            <CardTitle>Активність реплікації</CardTitle>
          </div>
          <CardDescription>Поточний стан потокової реплікації</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Репліка</TableHead>
                <TableHead>Стан</TableHead>
                <TableHead>Режим синхр.</TableHead>
                <TableHead>Sent LSN</TableHead>
                <TableHead>Write LSN</TableHead>
                <TableHead>Flush LSN</TableHead>
                <TableHead>Затримка</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {replicationActivity.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell className="text-slate-900">{activity.replica}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-green-600">
                      {activity.state}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{activity.syncState}</TableCell>
                  <TableCell>
                    <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">{activity.sentLSN}</code>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">{activity.writeLSN}</code>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">{activity.flushLSN}</code>
                  </TableCell>
                  <TableCell className="text-slate-600 font-mono text-sm">{activity.lag}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Replica Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Додати кластер репліки</DialogTitle>
            <DialogDescription>Налаштуйте новий сервер реплікації</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="replica-name">Назва репліки</Label>
              <Input id="replica-name" placeholder="Read Replica 4" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input id="host" placeholder="replica-4.example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input id="port" type="number" defaultValue="5432" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Локація</Label>
              <Select defaultValue="us-east">
                <SelectTrigger id="location">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east">US East (Virginia)</SelectItem>
                  <SelectItem value="us-west">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west">EU (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast">Asia Pacific (Singapore)</SelectItem>
                  <SelectItem value="ap-northeast">Asia Pacific (Tokyo)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="replication-mode">Режим реплікації</Label>
              <Select defaultValue="async">
                <SelectTrigger id="replication-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="async">Асинхронний</SelectItem>
                  <SelectItem value="sync">Синхронний</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Скасувати
            </Button>
            <Button onClick={() => setShowAddModal(false)}>
              Додати репліку
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}