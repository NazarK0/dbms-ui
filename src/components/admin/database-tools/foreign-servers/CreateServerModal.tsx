import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Alert, AlertDescription } from '../../../ui/alert';
import { getWrapperOptions, getDefaultPort } from './utils';

interface CreateServerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ServerFormData) => void;
}

export interface ServerFormData {
  serverName: string;
  wrapperType: string;
  host: string;
  port: string;
  dbname: string;
  username?: string;
}

export default function CreateServerModal({ open, onOpenChange, onSubmit }: CreateServerModalProps) {
  const [serverName, setServerName] = useState('');
  const [wrapperType, setWrapperType] = useState('postgres_fdw');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('5432');
  const [dbname, setDbname] = useState('');
  const [username, setUsername] = useState('');

  const wrapperOptions = getWrapperOptions();

  // Update port when wrapper changes
  useEffect(() => {
    setPort(getDefaultPort(wrapperType));
  }, [wrapperType]);

  const handleSubmit = () => {
    if (serverName.trim() && host.trim()) {
      onSubmit({
        serverName: serverName.trim(),
        wrapperType,
        host: host.trim(),
        port,
        dbname: dbname.trim(),
        username: username.trim() || undefined,
      });

      // Reset form
      setServerName('');
      setWrapperType('postgres_fdw');
      setHost('');
      setPort('5432');
      setDbname('');
      setUsername('');
    }
  };

  const handleClose = () => {
    setServerName('');
    setWrapperType('postgres_fdw');
    setHost('');
    setPort('5432');
    setDbname('');
    setUsername('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Додати зовнішній сервер</DialogTitle>
          <DialogDescription>
            Налаштування підключення до віддаленої бази даних
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="server-name">Назва сервера</Label>
              <Input
                id="server-name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="external_db"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wrapper-type">Foreign Data Wrapper</Label>
              <Select value={wrapperType} onValueChange={setWrapperType}>
                <SelectTrigger id="wrapper-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {wrapperOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="host">Хост</Label>
              <Input
                id="host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="external.example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Порт</Label>
              <Input
                id="port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="5432"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dbname">База даних</Label>
            <Input
              id="dbname"
              value={dbname}
              onChange={(e) => setDbname(e.target.value)}
              placeholder="remote_database"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Користувач (опціонально)</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="remote_user"
            />
          </div>

          <Alert>
            <AlertDescription>
              <strong>Примітка:</strong> Після створення сервера, вам потрібно буде створити USER MAPPING для автентифікації та налаштувати foreign tables.
            </AlertDescription>
          </Alert>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Скасувати
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!serverName.trim() || !host.trim()}
            className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Додати сервер
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
