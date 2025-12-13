import { useState } from 'react';
import { Paperclip, X, Check, Save, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader as TableHeaderUI, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { tableSchemas, defaultTableSchema } from '../../mockData/user';
import { TableHeader, TableInfoCard, TablePagination, TableSearchBar } from './table';

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

  const getTableSchema = () => {
    return tableSchemas[table] || defaultTableSchema;
  };

  const schema = getTableSchema();
  const [records, setRecords] = useState<TableRecord[]>(schema.data);

  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
      <TableHeader
        database={database}
        table={table}
        canInsert={canInsert}
        onBack={onBack}
        onCreateRecord={openCreateModal}
      />

      {/* Permissions Info */}
      <TableInfoCard 
        database={database}
        recordsCount={filteredRecords.length}
      />

      {/* Search */}
      <TableSearchBar
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* Table */}
      <Card className="border-violet-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Дані таблиці</CardTitle>
          <CardDescription>Перегляд та редагування записів</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t border-slate-200">
            <Table>
              <TableHeaderUI>
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
              </TableHeaderUI>
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
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              startIndex={startIndex}
              endIndex={endIndex}
              totalRecords={filteredRecords.length}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
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
