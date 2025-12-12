import { useState } from 'react';
import { Plus, Trash2, Edit, Layers, Download, Upload, ArrowLeft, Table2, Code, Zap, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import TableBrowser from './TableBrowser';
import FunctionsManager from './FunctionsManager';
import TriggersRules from './TriggersRules';

interface SchemasManagerProps {
  selectedDatabase: string;
}

type SchemaTab = 'tables' | 'views' | 'functions' | 'triggers';

export default function SchemasManager({ selectedDatabase }: SchemasManagerProps) {
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [activeSchemaTab, setActiveSchemaTab] = useState<SchemaTab>('tables');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [schemaName, setSchemaName] = useState('');
  const [schemaOwner, setSchemaOwner] = useState('postgres');
  const [schemaDescription, setSchemaDescription] = useState('');

  // Mock data - schemas for the selected database
  const getSchemas = () => {
    const allSchemas = [
      { name: 'public', owner: 'postgres', tables: 45, functions: 12, description: 'Схема за замовчуванням' },
      { name: 'auth', owner: 'admin', tables: 8, functions: 3, description: 'Схема аутентифікації' },
      { name: 'analytics', owner: 'analyst', tables: 15, functions: 7, description: 'Схема для аналітики' },
      { name: 'reporting', owner: 'analyst', tables: 13, functions: 5, description: 'Схема звітності' },
      { name: 'logs', owner: 'system', tables: 5, functions: 2, description: 'Схема логування' },
    ];

    // Filter schemas based on database (mock logic)
    if (selectedDatabase === 'production_db') {
      return allSchemas.filter(s => ['public', 'auth'].includes(s.name));
    } else if (selectedDatabase === 'analytics_db') {
      return allSchemas.filter(s => ['public', 'analytics', 'reporting'].includes(s.name));
    } else if (selectedDatabase === 'logs_db') {
      return allSchemas.filter(s => ['public', 'logs'].includes(s.name));
    }
    return [allSchemas[0]]; // default to public schema
  };

  const schemas = getSchemas();

  const handleCreateSchema = () => {
    if (schemaName.trim()) {
      // Mock creation
      setSchemaName('');
      setSchemaOwner('postgres');
      setSchemaDescription('');
      setShowCreateModal(false);
    }
  };

  const handleDeleteSchema = (schemaName: string) => {
    if (schemaName === 'public') {
      alert('Неможливо видалити схему "public"');
      return;
    }
    if (confirm(`Ви впевнені, що хочете видалити схему "${schemaName}"?`)) {
      // Mock deletion
    }
  };

  // If a schema is selected, show its tables
  if (selectedSchema) {
    return (
      <div className="space-y-6">
        {/* Back to schemas */}
        <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <Layers className="h-5 w-5 text-blue-600" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <p className="text-blue-900">Обрана схема</p>
              <p className="text-blue-700 text-sm">
                <code className="bg-blue-100 px-2 py-0.5 rounded">{selectedDatabase}.{selectedSchema}</code>
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSelectedSchema(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад до схем
            </Button>
          </AlertDescription>
        </Alert>

        {/* Tabs for schema content */}
        <Tabs defaultValue={activeSchemaTab} onValueChange={(value) => setActiveSchemaTab(value as SchemaTab)}>
          <TabsList className="w-full justify-start">
            <TabsTrigger value="tables" className="gap-2">
              <Table2 className="w-4 h-4" />
              Таблиці
            </TabsTrigger>
            <TabsTrigger value="views" className="gap-2">
              <Eye className="w-4 h-4" />
              Перегляди
            </TabsTrigger>
            <TabsTrigger value="functions" className="gap-2">
              <Code className="w-4 h-4" />
              Функції
            </TabsTrigger>
            <TabsTrigger value="triggers" className="gap-2">
              <Zap className="w-4 h-4" />
              Тригери
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tables">
            {/* Tables for this schema */}
            <TableBrowser selectedDatabase={selectedDatabase} selectedSchema={selectedSchema} />
          </TabsContent>
          <TabsContent value="views">
            {/* Views for this schema */}
            <TableBrowser selectedDatabase={selectedDatabase} selectedSchema={selectedSchema} type="views" />
          </TabsContent>
          <TabsContent value="functions">
            {/* Functions for this schema */}
            <FunctionsManager selectedDatabase={selectedDatabase} selectedSchema={selectedSchema} />
          </TabsContent>
          <TabsContent value="triggers">
            {/* Triggers for this schema */}
            <TriggersRules selectedDatabase={selectedDatabase} selectedSchema={selectedSchema} type="triggers" />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Схеми бази даних {selectedDatabase}</CardTitle>
                <CardDescription>Клацніть на схему для перегляду таблиць</CardDescription>
              </div>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Створити схему
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Назва схеми</TableHead>
                <TableHead>Власник</TableHead>
                <TableHead>Таблиці</TableHead>
                <TableHead>Функції</TableHead>
                <TableHead>Опис</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schemas.map((schema) => (
                <TableRow 
                  key={schema.name} 
                  onClick={() => setSelectedSchema(schema.name)}
                  className={`cursor-pointer hover:bg-blue-50/50 transition-colors ${schema.name === 'public' ? 'bg-blue-50/30' : ''}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Layers className="w-4 h-4 text-white" />
                      </div>
                      <code className="text-slate-900">{schema.name}</code>
                      {schema.name === 'public' && (
                        <Badge variant="secondary" className="ml-2">За замовчуванням</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{schema.owner}</TableCell>
                  <TableCell className="text-slate-600">{schema.tables}</TableCell>
                  <TableCell className="text-slate-600">{schema.functions}</TableCell>
                  <TableCell className="text-slate-600">{schema.description}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" title="Експорт схеми">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Редагувати">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {schema.name !== 'public' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSchema(schema.name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Видалити схему"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Schema Details */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Інформація про схему</CardTitle>
          <CardDescription>Детальна інформація про SQL схеми PostgreSQL</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Layers className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <strong>Що таке схема?</strong> Схема - це іменований простір імен, який містить іменовані об'єкти (таблиці, типи даних, функції, оператори). 
              Схеми дозволяють організувати об'єкти бази даних в логічні групи.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-slate-900 mb-2">Переваги використання схем</h4>
              <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                <li>Логічне групування об'єктів</li>
                <li>Запобігання конфліктів імен</li>
                <li>Контроль доступу на рівні схеми</li>
                <li>Ізоляція різних додатків</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-slate-900 mb-2">Системні схеми</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li><code className="text-blue-600">public</code> - схема за замовчуванням</li>
                <li><code className="text-blue-600">pg_catalog</code> - системні таблиці</li>
                <li><code className="text-blue-600">information_schema</code> - метадані</li>
                <li><code className="text-blue-600">pg_toast</code> - TOAST таблиці</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Schema Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Створити нову схему</DialogTitle>
            <DialogDescription>
              Створення нової схеми в базі даних {selectedDatabase}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="schema-name">Назва схеми</Label>
              <Input
                id="schema-name"
                value={schemaName}
                onChange={(e) => setSchemaName(e.target.value)}
                placeholder="my_schema"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schema-owner">Власник</Label>
              <Select value={schemaOwner} onValueChange={setSchemaOwner}>
                <SelectTrigger id="schema-owner">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postgres">postgres</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="developer">developer</SelectItem>
                  <SelectItem value="analyst">analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schema-description">Опис (необов'язково)</Label>
              <Textarea
                id="schema-description"
                value={schemaDescription}
                onChange={(e) => setSchemaDescription(e.target.value)}
                placeholder="Опис призначення схеми..."
                rows={3}
              />
            </div>
            <Alert>
              <AlertDescription>
                <strong>Примітка:</strong> Після створення схеми, не забудьте надати відповідні права доступу користувачам.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Скасувати
            </Button>
            <Button onClick={handleCreateSchema}>
              <Plus className="w-4 h-4 mr-2" />
              Створити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}