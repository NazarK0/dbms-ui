import { useState } from 'react';
import { Archive, Download, Upload, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

export default function BackupRestore({ selectedDatabase }: { selectedDatabase?: string }) {
  const [isBackingUp, setIsBackingUp] = useState(false);

  const backups = [
    {
      id: 1,
      filename: 'production_db_2024_01_20_full.sql',
      type: 'Повна',
      size: '1.2 ГБ',
      created: '2024-01-20 02:00:00',
      status: 'success',
      duration: '12м 34с',
    },
    {
      id: 2,
      filename: 'production_db_2024_01_19_full.sql',
      type: 'Повна',
      size: '1.18 ГБ',
      created: '2024-01-19 02:00:00',
      status: 'success',
      duration: '11м 58с',
    },
    {
      id: 3,
      filename: 'production_db_2024_01_18_incremental.sql',
      type: 'Інкрементна',
      size: '245 МБ',
      created: '2024-01-18 02:00:00',
      status: 'success',
      duration: '3м 12с',
    },
  ];

  const schedules = [
    { id: 1, name: 'Щоденне повне резервування', frequency: 'Щодня о 02:00', type: 'Повна', retention: '7 днів', enabled: true },
    { id: 2, name: 'Щотижневе архівування', frequency: 'Неділя о 03:00', type: 'Повна', retention: '30 днів', enabled: true },
    { id: 3, name: 'Погодинне інкрементне', frequency: 'Щогодини', type: 'Інкрементна', retention: '24 години', enabled: false },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="backups" className="space-y-6">
        <TabsList className="bg-white shadow-sm border border-slate-200">
          <TabsTrigger value="backups" className="gap-2">
            <Archive className="w-4 h-4" />
            Резервні копії
          </TabsTrigger>
          <TabsTrigger value="restore" className="gap-2">
            <Upload className="w-4 h-4" />
            Відновлення
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Clock className="w-4 h-4" />
            Розклад
          </TabsTrigger>
        </TabsList>

        <TabsContent value="backups">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Резервні копії</CardTitle>
                  <CardDescription>База даних: {selectedDatabase}</CardDescription>
                </div>
                <Button onClick={() => setIsBackingUp(true)}>
                  <Download className="w-4 h-4 mr-2" />
                  Створити резервну копію
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isBackingUp && (
                <div className="mb-6 border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-blue-900">Створення резервної копії...</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-blue-700 mt-2">45% завершено • Залишилось ~8 хвилин</p>
                </div>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Файл</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Розмір</TableHead>
                    <TableHead>Створено</TableHead>
                    <TableHead>Тривалість</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell className="font-mono text-sm text-slate-900">{backup.filename}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{backup.type}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">{backup.size}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{backup.created}</TableCell>
                      <TableCell className="text-slate-600 text-sm">{backup.duration}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Успішно
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Завантажити
                          </Button>
                          <Button variant="ghost" size="sm">
                            Відновити
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restore">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Відновлення з резервної копії</CardTitle>
              <CardDescription>Відновити базу даних з файлу резервної копії</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-50">
                <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">Завантажити файл резервної копії</h3>
                <p className="text-slate-600 mb-4">Перетягніть файл сюди або клацніть для вибору</p>
                <Badge variant="secondary">SQL, Custom, TAR, Directory формати</Badge>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-900 mb-1">Увага</h4>
                    <p className="text-yellow-700 text-sm">
                      Відновлення замінить всі поточні дані в базі даних. Переконайтеся, що ви створили резервну копію перед відновленням.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Розклад резервного копіювання</CardTitle>
                  <CardDescription>Автоматичне створення резервних копій</CardDescription>
                </div>
                <Button>
                  <Clock className="w-4 h-4 mr-2" />
                  Додати розклад
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Назва</TableHead>
                    <TableHead>Частота</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Зберігання</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium text-slate-900">{schedule.name}</TableCell>
                      <TableCell className="text-slate-600">{schedule.frequency}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{schedule.type}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">{schedule.retention}</TableCell>
                      <TableCell>
                        {schedule.enabled ? (
                          <Badge variant="default">Увімкнено</Badge>
                        ) : (
                          <Badge variant="secondary">Вимкнено</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            {schedule.enabled ? 'Вимкнути' : 'Увімкнути'}
                          </Button>
                          <Button variant="ghost" size="sm">
                            Редагувати
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}