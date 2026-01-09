import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../../../ui/dialog';
import { Button } from '../../../../../ui/button';
import { Input } from '../../../../../ui/input';
import { Label } from '../../../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../ui/select';
import { Alert, AlertDescription } from '../../../../../ui/alert';
import { foreignServersSimple } from '../../../../../../mockData';

export interface TableFormData {
  tableName: string;
  serverName: string;
  remoteSchema: string;
  remoteTable: string;
}

interface CreateTableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TableFormData) => void;
}

export default function CreateTableModal({
  open,
  onOpenChange,
  onSubmit
}: CreateTableModalProps) {
  const [tableName, setTableName] = useState('');
  const [serverName, setServerName] = useState('');
  const [remoteSchema, setRemoteSchema] = useState('');
  const [remoteTable, setRemoteTable] = useState('');

  const handleSubmit = () => {
    if (tableName.trim() && serverName && remoteSchema && remoteTable) {
      onSubmit({
        tableName,
        serverName,
        remoteSchema,
        remoteTable,
      });

      // Reset form
      setTableName('');
      setServerName('');
      setRemoteSchema('');
      setRemoteTable('');
    }
  };

  const handleCancel = () => {
    // Reset form on cancel
    setTableName('');
    setServerName('');
    setRemoteSchema('');
    setRemoteTable('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Створити зовнішню таблицю</DialogTitle>
          <DialogDescription>
            Створення нової зовнішньої таблиці для доступу до віддалених даних
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="table-name">Локальна назва таблиці</Label>
              <Input
                id="table-name"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="remote_users"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="server-name">Зовнішній сервер</Label>
              <Select value={serverName} onValueChange={setServerName}>
                <SelectTrigger id="server-name">
                  <SelectValue placeholder="Виберіть сервер" />
                </SelectTrigger>
                <SelectContent>
                  {foreignServersSimple.map((server) => (
                    <SelectItem key={server.name} value={server.name}>
                      {server.name} ({server.wrapper})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="remote-schema">Віддалена схема</Label>
              <Input
                id="remote-schema"
                value={remoteSchema}
                onChange={(e) => setRemoteSchema(e.target.value)}
                placeholder="public"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remote-table">Віддалена таблиця</Label>
              <Input
                id="remote-table"
                value={remoteTable}
                onChange={(e) => setRemoteTable(e.target.value)}
                placeholder="users"
              />
            </div>
          </div>

          <Alert>
            <AlertDescription>
              <strong>Примітка:</strong> Переконайтеся, що зовнішній сервер налаштований і доступний. Для налаштування серверів використовуйте розділ "Розширення".
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Скасувати
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
            disabled={!tableName.trim() || !serverName || !remoteSchema || !remoteTable}
          >
            <Plus className="w-4 h-4 mr-2" />
            Створити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
