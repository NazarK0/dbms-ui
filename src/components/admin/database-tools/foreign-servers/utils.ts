import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '../../../ui/badge';

// Get status badge component based on status
export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'connected':
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Підключено
        </Badge>
      );
    case 'disconnected':
      return (
        <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
          <AlertCircle className="w-3 h-3 mr-1" />
          Відключено
        </Badge>
      );
    case 'error':
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Помилка
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Get available FDW wrapper options
export const getWrapperOptions = () => [
  { value: 'postgres_fdw', label: 'postgres_fdw (PostgreSQL)' },
  { value: 'mysql_fdw', label: 'mysql_fdw (MySQL)' },
  { value: 'oracle_fdw', label: 'oracle_fdw (Oracle)' },
  { value: 'mongodb_fdw', label: 'mongodb_fdw (MongoDB)' },
  { value: 'multicorn', label: 'multicorn (API/Custom)' },
  { value: 'file_fdw', label: 'file_fdw (CSV/Text Files)' },
];

// Default port for different database types
export const getDefaultPort = (wrapper: string): string => {
  const ports: Record<string, string> = {
    postgres_fdw: '5432',
    mysql_fdw: '3306',
    oracle_fdw: '1521',
    mongodb_fdw: '27017',
  };
  return ports[wrapper] || '5432';
};
