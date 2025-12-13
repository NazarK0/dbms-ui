import { useState } from 'react';
import { Type, Plus, Trash2, Edit, Search, Database, List, Hash, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Alert, AlertDescription } from '../../ui/alert';
import { Textarea } from '../../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { domainTypes, compositeTypes, enumTypes } from '../../../mockData';

interface DataTypesManagerProps {
  selectedDatabase: string;
}

export default function DataTypesManager({ selectedDatabase }: DataTypesManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'custom' | 'composite' | 'enum' | 'domain'>('custom');
  const [typeName, setTypeName] = useState('');
  const [baseType, setBaseType] = useState('');
  const [typeCategory, setTypeCategory] = useState('composite');

  const filteredCustomTypes = domainTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompositeTypes = compositeTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEnumTypes = enumTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateType = () => {
    if (typeName.trim()) {
      // Mock creation
      setTypeName('');
      setBaseType('');
      setTypeCategory('composite');
      setShowCreateModal(false);
    }
  };

  const handleDeleteType = (typeName: string) => {
    if (confirm(`Ви впевнені, що хочете видалити тип даних "${typeName}"?`)) {
      // Mock deletion
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'composite':
        return <Database className="w-4 h-4" />;
      case 'enum':
        return <List className="w-4 h-4" />;
      case 'domain':
        return <Hash className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      composite: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
      enum: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
      domain: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
    };
    return colors[category] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                <Type className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Типи даних</CardTitle>
                <CardDescription>Управління користувацькими типами даних PostgreSQL</CardDescription>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Створити тип
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Пошук типів даних..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Alert about custom types */}
          <Alert className="bg-blue-50 border-blue-200">
            <Type className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              PostgreSQL підтримує створення користувацьких типів: Domain (обмеження на базові типи), Composite (структури), Enum (переліки) та інші
            </AlertDescription>
          </Alert>

          {/* Tabs for different type categories */}
          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="custom" className="gap-2">
                <Hash className="w-4 h-4" />
                Domain типи
              </TabsTrigger>
              <TabsTrigger value="composite" className="gap-2">
                <Database className="w-4 h-4" />
                Composite типи
              </TabsTrigger>
              <TabsTrigger value="enum" className="gap-2">
                <List className="w-4 h-4" />
                Enum типи
              </TabsTrigger>
            </TabsList>

            <TabsContent value="custom">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Назва типу</TableHead>
                    <TableHead>Базовий тип</TableHead>
                    <TableHead>Обмеження</TableHead>
                    <TableHead>Опис</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomTypes.map((type) => (
                    <TableRow key={type.name}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(type.category)}
                            <span className="text-white text-xs"></span>
                          </div>
                          <code className="text-slate-900">{type.name}</code>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded">{type.baseType}</code>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs text-slate-600 max-w-xs truncate block">{type.constraint}</code>
                      </TableCell>
                      <TableCell className="text-slate-600">{type.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Редагувати">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteType(type.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Видалити тип"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="composite">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Назва типу</TableHead>
                    <TableHead>Атрибути</TableHead>
                    <TableHead>Опис</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompositeTypes.map((type) => (
                    <TableRow key={type.name}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(type.category)}
                            <span className="text-white text-xs"></span>
                          </div>
                          <code className="text-slate-900">{type.name}</code>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {type.attributes.map((attr, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {attr.name}: {attr.type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{type.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Редагувати">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteType(type.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Видалити тип"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="enum">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Назва типу</TableHead>
                    <TableHead>Значення</TableHead>
                    <TableHead>Опис</TableHead>
                    <TableHead className="text-right">Дії</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnumTypes.map((type) => (
                    <TableRow key={type.name}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(type.category)}
                            <span className="text-white text-xs"></span>
                          </div>
                          <code className="text-slate-900">{type.name}</code>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {type.values.map((value, idx) => (
                            <Badge key={idx} className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{type.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" title="Редагувати">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteType(type.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Видалити тип"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create Type Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Створити користувацький тип даних</DialogTitle>
            <DialogDescription>
              Створення нового типу даних у схемі
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type-category">Категорія типу</Label>
              <Select value={typeCategory} onValueChange={setTypeCategory}>
                <SelectTrigger id="type-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domain">Domain (обмеження на базовий тип)</SelectItem>
                  <SelectItem value="composite">Composite (структура з атрибутами)</SelectItem>
                  <SelectItem value="enum">Enum (перелік значень)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type-name">Назва типу</Label>
              <Input
                id="type-name"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                placeholder="email"
              />
            </div>

            {typeCategory === 'domain' && (
              <div className="space-y-2">
                <Label htmlFor="base-type">Базовий тип</Label>
                <Select value={baseType} onValueChange={setBaseType}>
                  <SelectTrigger id="base-type">
                    <SelectValue placeholder="Виберіть базовий тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="varchar">VARCHAR</SelectItem>
                    <SelectItem value="integer">INTEGER</SelectItem>
                    <SelectItem value="numeric">NUMERIC</SelectItem>
                    <SelectItem value="text">TEXT</SelectItem>
                    <SelectItem value="boolean">BOOLEAN</SelectItem>
                    <SelectItem value="timestamp">TIMESTAMP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Alert>
              <AlertDescription>
                <strong>Примітка:</strong> Після створення типу, ви зможете використовувати його при створенні або зміні таблиць.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Скасувати
            </Button>
            <Button 
              onClick={handleCreateType}
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