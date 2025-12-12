import { useState } from 'react';
import { Settings, Save, RotateCcw, AlertTriangle, CheckCircle, Database, Cpu, HardDrive, Network, FileText, Zap, Upload, Download, Trash2, FolderOpen, Power } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface ConfigParam {
  name: string;
  value: string;
  defaultValue: string;
  unit?: string;
  description: string;
  requiresRestart: boolean;
  category: string;
}

export default function PostgresConfig() {
  const [hasChanges, setHasChanges] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [currentConfig, setCurrentConfig] = useState<Record<string, string>>({});

  const handleRestartServer = () => {
    setIsRestarting(true);
    // Simulate server restart
    setTimeout(() => {
      setIsRestarting(false);
      setRestartDialogOpen(false);
    }, 3000);
  };

  const [savedProfiles, setSavedProfiles] = useState([
    {
      id: '1',
      name: 'Production Optimized',
      description: 'Оптимізовано для продакшн серверів',
      createdAt: '2024-12-10 15:30',
      parametersCount: 22,
    },
    {
      id: '2',
      name: 'Development Setup',
      description: 'Налаштування для розробки',
      createdAt: '2024-12-08 09:15',
      parametersCount: 22,
    },
    {
      id: '3',
      name: 'High Load Server',
      description: 'Конфігурація для високого навантаження',
      createdAt: '2024-12-05 18:45',
      parametersCount: 22,
    },
  ]);

  const configParams: ConfigParam[] = [
    // Memory Settings
    {
      name: 'shared_buffers',
      value: '256MB',
      defaultValue: '128MB',
      unit: 'MB',
      description: 'Обсяг пам\'яті для кешування даних',
      requiresRestart: true,
      category: 'memory'
    },
    {
      name: 'work_mem',
      value: '8MB',
      defaultValue: '4MB',
      unit: 'MB',
      description: 'Пам\'ять для операцій сортування та хешування',
      requiresRestart: false,
      category: 'memory'
    },
    {
      name: 'maintenance_work_mem',
      value: '128MB',
      defaultValue: '64MB',
      unit: 'MB',
      description: 'Пам\'ять для операцій обслуговування (VACUUM, CREATE INDEX)',
      requiresRestart: false,
      category: 'memory'
    },
    {
      name: 'effective_cache_size',
      value: '1GB',
      defaultValue: '4GB',
      unit: 'GB',
      description: 'Оцінка доступної пам\'яті для кешування ОС',
      requiresRestart: false,
      category: 'memory'
    },
    // Connection Settings
    {
      name: 'max_connections',
      value: '200',
      defaultValue: '100',
      description: 'Максимальна кількість одночасних підключень',
      requiresRestart: true,
      category: 'connections'
    },
    {
      name: 'superuser_reserved_connections',
      value: '5',
      defaultValue: '3',
      description: 'Резервні підключення для суперкористувачів',
      requiresRestart: true,
      category: 'connections'
    },
    {
      name: 'idle_in_transaction_session_timeout',
      value: '30000',
      defaultValue: '0',
      unit: 'ms',
      description: 'Таймаут для неактивних транзакцій',
      requiresRestart: false,
      category: 'connections'
    },
    // WAL Settings
    {
      name: 'wal_level',
      value: 'replica',
      defaultValue: 'replica',
      description: 'Рівень деталізації WAL логів',
      requiresRestart: true,
      category: 'wal'
    },
    {
      name: 'max_wal_size',
      value: '2GB',
      defaultValue: '1GB',
      unit: 'GB',
      description: 'Максимальний розмір WAL між checkpoint',
      requiresRestart: false,
      category: 'wal'
    },
    {
      name: 'min_wal_size',
      value: '512MB',
      defaultValue: '80MB',
      unit: 'MB',
      description: 'Мінімальний розмір WAL',
      requiresRestart: false,
      category: 'wal'
    },
    {
      name: 'wal_buffers',
      value: '16MB',
      defaultValue: '-1',
      unit: 'MB',
      description: 'Буфери для WAL даних',
      requiresRestart: true,
      category: 'wal'
    },
    // Autovacuum Settings
    {
      name: 'autovacuum',
      value: 'on',
      defaultValue: 'on',
      description: 'Автоматичне очищення (vacuum) таблиць',
      requiresRestart: false,
      category: 'autovacuum'
    },
    {
      name: 'autovacuum_max_workers',
      value: '3',
      defaultValue: '3',
      description: 'Максимальна кількість процесів autovacuum',
      requiresRestart: true,
      category: 'autovacuum'
    },
    {
      name: 'autovacuum_naptime',
      value: '60s',
      defaultValue: '1min',
      description: 'Час між запусками autovacuum',
      requiresRestart: false,
      category: 'autovacuum'
    },
    // Logging Settings
    {
      name: 'logging_collector',
      value: 'on',
      defaultValue: 'off',
      description: 'Збір логів у фонові файли',
      requiresRestart: true,
      category: 'logging'
    },
    {
      name: 'log_min_duration_statement',
      value: '1000',
      defaultValue: '-1',
      unit: 'ms',
      description: 'Логувати запити довші за вказаний час',
      requiresRestart: false,
      category: 'logging'
    },
    {
      name: 'log_checkpoints',
      value: 'on',
      defaultValue: 'off',
      description: 'Логувати контрольні точки',
      requiresRestart: false,
      category: 'logging'
    },
    {
      name: 'log_connections',
      value: 'on',
      defaultValue: 'off',
      description: 'Логувати нові підключення',
      requiresRestart: false,
      category: 'logging'
    },
    {
      name: 'log_disconnections',
      value: 'on',
      defaultValue: 'off',
      description: 'Логувати відключення',
      requiresRestart: false,
      category: 'logging'
    },
    // Performance Settings
    {
      name: 'random_page_cost',
      value: '1.1',
      defaultValue: '4.0',
      description: 'Вартість випадкового читання сторінки (для SSD)',
      requiresRestart: false,
      category: 'performance'
    },
    {
      name: 'effective_io_concurrency',
      value: '200',
      defaultValue: '1',
      description: 'Паралельність I/O операцій (для SSD)',
      requiresRestart: false,
      category: 'performance'
    },
    {
      name: 'default_statistics_target',
      value: '100',
      defaultValue: '100',
      description: 'Ціль для збору статистики планувальника',
      requiresRestart: false,
      category: 'performance'
    },
  ];

  const statistics = {
    totalParams: configParams.length,
    changed: configParams.filter(p => p.value !== p.defaultValue).length,
    requiresRestart: configParams.filter(p => p.requiresRestart && p.value !== p.defaultValue).length,
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'memory': return HardDrive;
      case 'connections': return Network;
      case 'wal': return Database;
      case 'autovacuum': return Zap;
      case 'logging': return FileText;
      case 'performance': return Cpu;
      default: return Settings;
    }
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      memory: 'Пам\'ять',
      connections: 'Підключення',
      wal: 'WAL',
      autovacuum: 'Autovacuum',
      logging: 'Логування',
      performance: 'Продуктивність',
    };
    return names[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      memory: 'from-lime-500 to-green-600',
      connections: 'from-green-500 to-lime-600',
      wal: 'from-yellow-500 to-lime-600',
      autovacuum: 'from-lime-600 to-yellow-600',
      logging: 'from-green-600 to-lime-500',
      performance: 'from-lime-500 to-green-500',
    };
    return colors[category] || 'from-slate-500 to-slate-600';
  };

  const categories = Array.from(new Set(configParams.map(p => p.category)));

  return (
    <div className="space-y-6">
      {/* Header with Restart Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 text-2xl">Конфігурація PostgreSQL</h2>
          <p className="text-slate-600 text-sm mt-1">
            Управління параметрами сервера та налаштуваннями
          </p>
        </div>
        <Dialog open={restartDialogOpen} onOpenChange={setRestartDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="lg" className="gap-2">
              <Power className="w-4 h-4" />
              Перезапустити сервер
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Перезапуск сервера PostgreSQL</DialogTitle>
              <DialogDescription>
                Ви впевнені, що хочете перезапустити сервер PostgreSQL? Це призведе до переривання всіх активних підключень.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Power className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-slate-900">Активні підключення будуть перервані</p>
                <p className="text-sm text-slate-600">Сервер перезапуститься протягом кількох секунд</p>
              </div>
              {isRestarting && (
                <div className="w-full">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <p className="text-sm text-slate-600">Перезапуск сервера...</p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRestartDialogOpen(false)} disabled={isRestarting}>
                Скасувати
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleRestartServer}
                disabled={isRestarting}
                className="gap-2"
              >
                <Power className="w-4 h-4" />
                {isRestarting ? 'Перезапуск...' : 'Перезапустити'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Header Alert */}
      {statistics.requiresRestart > 0 && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-900">
            <strong>{statistics.requiresRestart}</strong> параметрів вимагають перезапуску сервера для застосування змін
          </AlertDescription>
        </Alert>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">{statistics.totalParams}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Всього параметрів</CardTitle>
            <CardDescription>Доступні налаштування</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <Badge variant="secondary" className="text-lg">{statistics.changed}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Змінених</CardTitle>
            <CardDescription>Відрізняються від default</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm border-yellow-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-white" />
              </div>
              <Badge variant="outline" className="text-lg border-yellow-500 text-yellow-700">{statistics.requiresRestart}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl mb-1">Потрібен restart</CardTitle>
            <CardDescription>Після зміни значення</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Tabs */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Налаштування PostgreSQL сервера</CardTitle>
              <CardDescription>Керування параметрами конфігурації postgresql.conf</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Скинути
              </Button>
              <Button disabled={!hasChanges}>
                <Save className="w-4 h-4 mr-2" />
                Зберегти зміни
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="memory" className="space-y-6">
            <TabsList className="bg-white shadow-sm border border-slate-200 p-1.5 h-auto inline-flex flex-wrap">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category);
                const count = configParams.filter(p => p.category === category).length;
                return (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="gap-2 data-[state=active]:bg-lime-600 data-[state=active]:text-white"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{getCategoryName(category)}</span>
                    <Badge variant="secondary" className="ml-1">{count}</Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => {
              const categoryParams = configParams.filter(p => p.category === category);
              const Icon = getCategoryIcon(category);
              const color = getCategoryColor(category);

              return (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                      <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-slate-900">{getCategoryName(category)}</h3>
                        <p className="text-slate-600 text-sm">{categoryParams.length} параметрів</p>
                      </div>
                    </div>

                    {/* Parameters Table */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-64">Параметр</TableHead>
                            <TableHead className="w-48">Поточне значення</TableHead>
                            <TableHead className="w-48">За замовчуванням</TableHead>
                            <TableHead>Опис</TableHead>
                            <TableHead className="w-32 text-center">Restart</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {categoryParams.map((param) => (
                            <TableRow key={param.name} className={param.value !== param.defaultValue ? 'bg-lime-50/50' : ''}>
                              <TableCell>
                                <code className="text-sm text-slate-900 font-mono">{param.name}</code>
                              </TableCell>
                              <TableCell>
                                <Input 
                                  defaultValue={param.value}
                                  className="font-mono text-sm"
                                  onChange={() => setHasChanges(true)}
                                />
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-mono">
                                  {param.defaultValue}
                                  {param.unit && <span className="ml-1 text-slate-500">{param.unit}</span>}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-slate-600 text-sm">
                                {param.description}
                              </TableCell>
                              <TableCell className="text-center">
                                {param.requiresRestart ? (
                                  <Badge variant="destructive" className="text-xs">
                                    <RotateCcw className="w-3 h-3 mr-1" />
                                    Так
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="text-xs">
                                    Ні
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Configuration File Preview */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Попередній перегляд postgresql.conf</CardTitle>
              <CardDescription>Згенерований конфігураційний файл</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Завантажити файл
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 font-mono text-sm">
              <code>{`# PostgreSQL Configuration File
# Generated by PostgreSQL DBMS Admin Panel
# Date: 2024-12-12

#------------------------------------------------------------------------------
# MEMORY SETTINGS
#------------------------------------------------------------------------------
shared_buffers = 256MB
work_mem = 8MB
maintenance_work_mem = 128MB
effective_cache_size = 1GB

#------------------------------------------------------------------------------
# CONNECTION SETTINGS
#------------------------------------------------------------------------------
max_connections = 200
superuser_reserved_connections = 5
idle_in_transaction_session_timeout = 30000

#------------------------------------------------------------------------------
# WRITE-AHEAD LOG (WAL)
#------------------------------------------------------------------------------
wal_level = replica
max_wal_size = 2GB
min_wal_size = 512MB
wal_buffers = 16MB

#------------------------------------------------------------------------------
# AUTOVACUUM
#------------------------------------------------------------------------------
autovacuum = on
autovacuum_max_workers = 3
autovacuum_naptime = 60s

#------------------------------------------------------------------------------
# LOGGING
#------------------------------------------------------------------------------
logging_collector = on
log_min_duration_statement = 1000
log_checkpoints = on
log_connections = on
log_disconnections = on

#------------------------------------------------------------------------------
# QUERY TUNING / PERFORMANCE
#------------------------------------------------------------------------------
random_page_cost = 1.1
effective_io_concurrency = 200
default_statistics_target = 100`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Saved Profiles Management */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Збережені профілі налаштувань</CardTitle>
              <CardDescription>Керування профілями конфігурацій для швидкого завантаження</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Імпорт з файлу
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Імпорт налаштувань з файлу</DialogTitle>
                    <DialogDescription>
                      Завантажте JSON файл з налаштуваннями PostgreSQL
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50/50">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 mb-2">Перетягніть файл сюди або клацніть для вибору</p>
                      <p className="text-slate-500 text-sm">Підтримуються файли .json та .conf</p>
                      <Input type="file" accept=".json,.conf" className="mt-4" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setLoadDialogOpen(false)}>Скасувати</Button>
                    <Button onClick={() => setLoadDialogOpen(false)}>Імпортувати</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Зберегти профіль
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Зберегти поточні налаштування як профіль</DialogTitle>
                    <DialogDescription>
                      Створіть новий профіль конфігурації для подальшого використання
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-name">Назва профілю</Label>
                      <Input 
                        id="profile-name" 
                        placeholder="Наприклад: Production Setup v2" 
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profile-description">Опис (необов'язково)</Label>
                      <Input 
                        id="profile-description" 
                        placeholder="Короткий опис профілю..."
                      />
                    </div>
                    <Alert className="bg-blue-50 border-blue-200">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-900">
                        Буде збережено <strong>{statistics.totalParams}</strong> параметрів з поточної конфігурації
                      </AlertDescription>
                    </Alert>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>Скасувати</Button>
                    <Button onClick={() => {
                      setSaveDialogOpen(false);
                      setProfileName('');
                    }}>
                      <Save className="w-4 h-4 mr-2" />
                      Зберегти профіль
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {savedProfiles.map((profile) => (
              <div key={profile.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/30 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-slate-900 mb-1">{profile.name}</h4>
                      <p className="text-slate-600 text-sm mb-2">{profile.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Settings className="w-3 h-3" />
                          {profile.parametersCount} параметрів
                        </span>
                        <span>Створено: {profile.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Завантажити
                    </Button>
                    <Button variant="outline" size="sm">
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Застосувати
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {savedProfiles.length === 0 && (
              <div className="text-center py-12 border border-dashed border-slate-300 rounded-lg bg-slate-50/50">
                <FolderOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 mb-2">Немає збережених профілів</p>
                <p className="text-slate-500 text-sm mb-4">Збережіть поточні налаштування як профіль для швидкого доступу</p>
                <Button variant="outline" onClick={() => setSaveDialogOpen(true)}>
                  <Save className="w-4 h-4 mr-2" />
                  Створити перший профіль
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Presets */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Швидкі пресети</CardTitle>
          <CardDescription>Попередньо налаштовані конфігурації для різних сценаріїв</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-600 rounded-lg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-slate-900">Розробка</h4>
              </div>
              <p className="text-slate-600 text-sm mb-4">Мінімальне споживання ресурсів, детальне логування</p>
              <Button variant="outline" size="sm" className="w-full">Застосувати</Button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-lime-600 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-slate-900">Продакшн</h4>
              </div>
              <p className="text-slate-600 text-sm mb-4">Оптимізація для продуктивності та стабільності</p>
              <Button variant="outline" size="sm" className="w-full">Застосувати</Button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-slate-900">Висока навантаження</h4>
              </div>
              <p className="text-slate-600 text-sm mb-4">Максимальна продуктивність для великих навантажень</p>
              <Button variant="outline" size="sm" className="w-full">Застосувати</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}