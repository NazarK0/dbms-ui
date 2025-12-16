/**
 * CRUD Example Component
 * Demonstrates how to use useUserCrud hook in User UI
 * This is a reference implementation for developers
 */

import { useState, useEffect } from 'react';
import { useUserCrud } from '../../../hooks/useUserCrud';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Plus, Edit, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CrudExampleProps {
  database: string;
  table: string;
}

export default function CrudExample({ database, table }: CrudExampleProps) {
  const {
    getRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
    isPreviewMode,
  } = useUserCrud();

  const [records, setRecords] = useState<Record<string, any>[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    priority: 1,
  });

  // Load records on mount
  useEffect(() => {
    loadRecords();
  }, [database, table]);

  const loadRecords = async () => {
    setIsLoading(true);
    try {
      const response = await getRecords(database, table, {
        orderBy: 'created_at',
        orderDir: 'desc',
      });
      setRecords(response.data);
      setTotal(response.total);
    } catch (error: any) {
      toast.error('Помилка завантаження', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const result = await createRecord(database, table, formData);
      if (result.success) {
        toast.success('Успіх!', {
          description: result.message || 'Запис успішно створено',
        });
        setFormData({ name: '', description: '', status: 'active', priority: 1 });
        loadRecords();
      } else {
        toast.error('Помилка', {
          description: result.error || 'Не вдалося створити запис',
        });
      }
    } catch (error: any) {
      toast.error('Помилка створення', {
        description: error.message,
      });
    }
  };

  const handleUpdate = async (id: string | number) => {
    try {
      const result = await updateRecord(database, table, id, formData);
      if (result.success) {
        toast.success('Успіх!', {
          description: result.message || 'Запис успішно оновлено',
        });
        setEditingId(null);
        setFormData({ name: '', description: '', status: 'active', priority: 1 });
        loadRecords();
      } else {
        toast.error('Помилка', {
          description: result.error || 'Не вдалося оновити запис',
        });
      }
    } catch (error: any) {
      toast.error('Помилка оновлення', {
        description: error.message,
      });
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Ви впевнені, що хочете видалити цей запис?')) {
      return;
    }

    try {
      const result = await deleteRecord(database, table, id);
      if (result.success) {
        toast.success('Успіх!', {
          description: result.message || 'Запис успішно видалено',
        });
        loadRecords();
      } else {
        toast.error('Помилка', {
          description: result.error || 'Не вдалося видалити запис',
        });
      }
    } catch (error: any) {
      toast.error('Помилка видалення', {
        description: error.message,
      });
    }
  };

  const startEdit = async (id: string | number) => {
    try {
      const record = await getRecord(database, table, id);
      if (record) {
        setEditingId(id);
        setFormData({
          name: record.name || '',
          description: record.description || '',
          status: record.status || 'active',
          priority: record.priority || 1,
        });
      }
    } catch (error: any) {
      toast.error('Помилка завантаження запису', {
        description: error.message,
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', status: 'active', priority: 1 });
  };

  return (
    <div className="space-y-6">
      {/* Preview Mode Indicator */}
      {isPreviewMode && (
        <Card className="border-violet-200 bg-violet-50">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-violet-700">
              <AlertCircle className="h-5 w-5" />
              <span>
                <strong>Режим попереднього перегляду:</strong> Всі CRUD операції виконуються в пам'яті
                та не зберігаються в реальній базі даних.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{editingId ? 'Редагувати запис' : 'Створити запис'}</span>
            <Badge variant="outline">
              {database}.{table}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Назва</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Введіть назву..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg"
              >
                <option value="active">Активний</option>
                <option value="pending">Очікує</option>
                <option value="archived">Архівований</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Опис</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Введіть опис..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Пріоритет</Label>
            <Input
              id="priority"
              type="number"
              min="1"
              max="5"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
            />
          </div>
          <div className="flex gap-2">
            {editingId ? (
              <>
                <Button onClick={() => handleUpdate(editingId)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Зберегти зміни
                </Button>
                <Button variant="outline" onClick={cancelEdit}>
                  Скасувати
                </Button>
              </>
            ) : (
              <Button onClick={handleCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Створити запис
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Записи ({total})</span>
            <Button variant="outline" size="sm" onClick={loadRecords} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Завантаження...</div>
          ) : records.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Немає записів. Створіть перший запис.
            </div>
          ) : (
            <div className="space-y-2">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{record.name}</span>
                      <Badge variant={record.status === 'active' ? 'default' : 'secondary'}>
                        {record.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Пріоритет: {record.priority}
                      </span>
                    </div>
                    {record.description && (
                      <p className="text-sm text-muted-foreground mt-1">{record.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEdit(record.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(record.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
