import { useState } from 'react';
import { Layers, Plus, Trash2, Edit, Search, Table2, Lock, Users, ArrowLeft, Download, Eye, Code, Zap, Database, Type } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Alert, AlertDescription } from '../../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Textarea } from '../../ui/textarea';
import TableBrowser from './TableBrowser';
import FunctionsManager from './FunctionsManager';
import TriggersRules from './TriggersRules';
import ForeignTablesManager from './ForeignTablesManager';
import DataTypesManager from './DataTypesManager';

interface SchemasManagerProps {
  selectedDatabase: string;
}

type SchemaTab = 'tables' | 'views' | 'functions' | 'triggers' | 'foreign-tables' | 'data-types';

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
            <TabsTrigger value="foreign-tables" className="gap-2">
              <Database className="w-4 h-4" />
              Зовнішні таблиці
            </TabsTrigger>
            <TabsTrigger value="data-types" className="gap-2">
              <Type className="w-4 h-4" />
              Типи даних
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tables">
            {/* Tables for this schema */}
            <TableBrowser selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="views">
            {/* Views for this schema */}
            <TableBrowser selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="functions">
            {/* Functions for this schema */}
            <FunctionsManager selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="triggers">
            {/* Triggers for this schema */}
            <TriggersRules selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="foreign-tables">
            {/* Foreign tables for this schema */}
            <ForeignTablesManager selectedDatabase={selectedDatabase} />
          </TabsContent>
          <TabsContent value="data-types">
            {/* Data types for this schema */}
            <DataTypesManager selectedDatabase={selectedDatabase} />
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
              <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Схеми бази даних {selectedDatabase}</CardTitle>
                <CardDescription>Клацніть на схему для перегляду таблиць</CardDescription>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
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
            <Button 
              onClick={handleCreateSchema}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Створити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}