import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Search, Filter, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Check, Paperclip } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface TableDataEditorProps {
  database: string;
  table: string;
  permissions: string[];
  highlightRecordId?: string;
  onBack: () => void;
  onCreateRecord?: () => void;
  onEditRecord?: (record: TableRecord) => void;
}

interface TableRecord {
  id: number;
  [key: string]: any;
}

export default function TableDataEditor({ database, table, permissions, highlightRecordId, onBack, onCreateRecord, onEditRecord }: TableDataEditorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TableRecord | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Mock data based on table name
  const getTableSchema = () => {
    const schemas: Record<string, any> = {
      users: {
        columns: [
          { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
          { name: 'email', type: 'varchar', required: true },
          { name: 'name', type: 'varchar', required: true },
          { name: 'role', type: 'varchar', required: false },
          { name: 'created_at', type: 'timestamp', required: false },
          { name: 'attachments', type: 'array', required: false },
        ],
        data: [
          { id: 1, email: 'john.doe@example.com', name: 'John Doe', role: 'admin', created_at: '2024-01-15 10:30:00', attachments: ['resume.pdf', 'certificate.jpg'] },
          { id: 2, email: 'jane.smith@example.com', name: 'Jane Smith', role: 'user', created_at: '2024-01-16 14:20:00', attachments: [] },
          { id: 3, email: 'bob.johnson@example.com', name: 'Bob Johnson', role: 'user', created_at: '2024-01-17 09:15:00', attachments: ['contract.pdf'] },
          { id: 4, email: 'alice.williams@example.com', name: 'Alice Williams', role: 'moderator', created_at: '2024-01-18 11:45:00', attachments: ['photo.jpg', 'docs.docx', 'data.xlsx'] },
          { id: 5, email: 'charlie.brown@example.com', name: 'Charlie Brown', role: 'user', created_at: '2024-01-19 16:00:00', attachments: [] },
          { id: 42, email: 'test.user@example.com', name: 'Test User', role: 'developer', created_at: '2024-02-10 14:20:00', attachments: ['report.pdf'] },
          { id: 43, email: 'new.user@example.com', name: 'New User', role: 'user', created_at: '2024-02-10 16:30:00', attachments: [] },
        ],
      },
      orders: {
        columns: [
          { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
          { name: 'user_id', type: 'integer', required: true },
          { name: 'product_name', type: 'varchar', required: true },
          { name: 'quantity', type: 'integer', required: true },
          { name: 'total_price', type: 'decimal', required: true },
          { name: 'status', type: 'varchar', required: true },
          { name: 'created_at', type: 'timestamp', required: false },
        ],
        data: [
          { id: 1, user_id: 1, product_name: 'Laptop', quantity: 1, total_price: '1299.99', status: 'completed', created_at: '2024-02-01 10:00:00' },
          { id: 2, user_id: 2, product_name: 'Mouse', quantity: 2, total_price: '49.98', status: 'pending', created_at: '2024-02-02 11:30:00' },
          { id: 3, user_id: 1, product_name: 'Keyboard', quantity: 1, total_price: '89.99', status: 'completed', created_at: '2024-02-03 14:15:00' },
          { id: 4, user_id: 3, product_name: 'Monitor', quantity: 1, total_price: '349.99', status: 'shipped', created_at: '2024-02-04 09:20:00' },
          { id: 158, user_id: 5, product_name: 'Headphones', quantity: 1, total_price: '199.99', status: 'pending', created_at: '2024-02-10 11:15:00' },
        ],
      },
      products: {
        columns: [
          { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
          { name: 'name', type: 'varchar', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'price', type: 'decimal', required: true },
          { name: 'stock', type: 'integer', required: true },
          { name: 'category', type: 'varchar', required: false },
        ],
        data: [
          { id: 1, name: 'Laptop', description: 'High-performance laptop', price: '1299.99', stock: 15, category: 'Electronics' },
          { id: 2, name: 'Mouse', description: 'Wireless mouse', price: '24.99', stock: 50, category: 'Accessories' },
          { id: 3, name: 'Keyboard', description: 'Mechanical keyboard', price: '89.99', stock: 30, category: 'Accessories' },
          { id: 4, name: 'Monitor', description: '27-inch 4K monitor', price: '349.99', stock: 20, category: 'Electronics' },
        ],
      },
      audit_logs: {
        columns: [
          { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
          { name: 'user_id', type: 'integer', required: true },
          { name: 'action', type: 'varchar', required: true },
          { name: 'table_name', type: 'varchar', required: true },
          { name: 'record_id', type: 'integer', required: false },
          { name: 'timestamp', type: 'timestamp', required: true },
        ],
        data: [
          { id: 1, user_id: 1, action: 'CREATE', table_name: 'users', record_id: 5, timestamp: '2024-01-19 16:00:00' },
          { id: 2, user_id: 2, action: 'UPDATE', table_name: 'orders', record_id: 2, timestamp: '2024-02-02 11:35:00' },
          { id: 3, user_id: 1, action: 'DELETE', table_name: 'products', record_id: 10, timestamp: '2024-02-03 15:20:00' },
        ],
      },
    };

    return schemas[table] || {
      columns: [
        { name: 'id', type: 'integer', primaryKey: true, autoIncrement: true },
        { name: 'data', type: 'text', required: false },
      ],
      data: [],
    };
  };

  const schema = getTableSchema();
  const [records, setRecords] = useState<TableRecord[]>(schema.data);

  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  const canInsert = permissions.includes('INSERT');
  const canUpdate = permissions.includes('UPDATE');
  const canDelete = permissions.includes('DELETE');

  const handleCreate = () => {
    const newRecord: TableRecord = { id: Math.max(...records.map(r => r.id)) + 1 };
    schema.columns.forEach((col: any) => {
      if (!col.autoIncrement && !col.primaryKey) {
        newRecord[col.name] = formData[col.name] || '';
      }
    });
    setRecords([...records, newRecord]);
    setIsCreateModalOpen(false);
    setFormData({});
    if (onCreateRecord) onCreateRecord();
  };

  const handleUpdate = () => {
    if (!selectedRecord) return;
    setRecords(records.map((r) => (r.id === selectedRecord.id ? { ...r, ...formData } : r)));
    setIsEditModalOpen(false);
    setFormData({});
    setSelectedRecord(null);
    if (onEditRecord) onEditRecord(selectedRecord);
  };

  const handleDelete = () => {
    if (!selectedRecord) return;
    setRecords(records.filter((r) => r.id !== selectedRecord.id));
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  const openCreateModal = () => {
    setFormData({});
    if (onCreateRecord) {
      onCreateRecord();
    } else {
      setIsCreateModalOpen(true);
    }
  };

  const openEditModal = (record: TableRecord) => {
    setSelectedRecord(record);
    setFormData(record);
    if (onEditRecord) {
      onEditRecord(record);
    } else {
      setIsEditModalOpen(true);
    }
  };

  const openDeleteModal = (record: TableRecord) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Назад
          </Button>
          <div>
            <h2 className="text-slate-900">Редактор даних: {table}</h2>
            <p className="text-slate-600">База даних: {database}</p>
          </div>
        </div>
        {canInsert && (
          <Button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Новий запис
          </Button>
        )}
      </div>

      {/* Permissions Info */}
      <Card className="border-violet-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              База даних: <span className="font-medium text-slate-900">{database}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>{filteredRecords.length} записів</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Пошук записів..."
          className="pl-10"
        />
      </div>

      {/* Table */}
      <Card className="border-violet-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Дані таблиці</CardTitle>
          <CardDescription>Перегляд та редагування записів</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                  {schema.columns.map((col: any) => (
                    <TableHead key={col.name} className="font-medium">
                      {col.name}
                      {col.primaryKey && <Badge variant="outline" className="ml-2 text-xs">PK</Badge>}
                    </TableHead>
                  ))}
                  {(canUpdate || canDelete) && (
                    <TableHead className="text-center font-medium w-[120px]">Дії</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((record) => (
                    <TableRow 
                      key={record.id} 
                      className={`hover:bg-violet-50/50 ${
                        highlightRecordId && record.id.toString() === highlightRecordId
                          ? 'bg-violet-100 border-l-4 border-l-violet-600 animate-pulse'
                          : ''
                      }`}
                    >
                      {schema.columns.map((col: any) => (
                        <TableCell key={col.name} className="text-sm">
                          {col.name === 'attachments' && Array.isArray(record[col.name]) ? (
                            record[col.name].length > 0 ? (
                              <div className="flex items-center gap-1.5">
                                <Paperclip className="w-4 h-4 text-violet-600" />
                                <span className="text-violet-600 font-medium">{record[col.name].length}</span>
                              </div>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )
                          ) : (
                            record[col.name]
                          )}
                        </TableCell>
                      ))}
                      {(canUpdate || canDelete) && (
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {canUpdate && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditModal(record)}
                                className="h-7 w-7 p-0"
                              >
                                <Edit className="w-3.5 h-3.5 text-blue-600" />
                              </Button>
                            )}
                            {canDelete && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openDeleteModal(record)}
                                className="h-7 w-7 p-0"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-600" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={schema.columns.length + (canUpdate || canDelete ? 1 : 0)}
                      className="h-24 text-center text-slate-500"
                    >
                      Записів не знайдено
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredRecords.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/30">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Показувати по:</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[70px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-slate-600">
                  Показано {startIndex + 1}-{Math.min(endIndex, filteredRecords.length)} з {filteredRecords.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 p-0 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700'
                          : ''
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Створити новий запис</DialogTitle>
            <DialogDescription>Заповніть поля для створення нового запису в таблиці {table}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {schema.columns
              .filter((col: any) => !col.autoIncrement && !col.primaryKey)
              .map((col: any) => (
                <div key={col.name} className="space-y-2">
                  <Label htmlFor={col.name}>
                    {col.name}
                    {col.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={col.name}
                    type={col.type === 'integer' ? 'number' : 'text'}
                    value={formData[col.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.name]: e.target.value })}
                    placeholder={`Введіть ${col.name}`}
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Скасувати
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Створити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редагувати запис</DialogTitle>
            <DialogDescription>Змініть дані запису #{selectedRecord?.id}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {schema.columns
              .filter((col: any) => !col.autoIncrement && !col.primaryKey)
              .map((col: any) => (
                <div key={col.name} className="space-y-2">
                  <Label htmlFor={col.name}>{col.name}</Label>
                  <Input
                    id={col.name}
                    type={col.type === 'integer' ? 'number' : 'text'}
                    value={formData[col.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.name]: e.target.value })}
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Скасувати
            </Button>
            <Button
              onClick={handleUpdate}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Зберегти
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Видалити запис</DialogTitle>
            <DialogDescription>
              Ви впевнені, що хочете видалити запис #{selectedRecord?.id}? Цю дію неможливо скасувати.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Скасувати
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Видалити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}