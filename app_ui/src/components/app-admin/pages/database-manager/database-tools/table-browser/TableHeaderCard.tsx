import { Table2, Database, Crown } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../../../../../ui/card';
import { useAdminUser } from '../../../../../../contexts/AdminUserContext';
import type { TableHeaderCardProps } from './types';

export default function TableHeaderCard({
  tableName,
  databaseName,
  columnCount,
  owner,
}: TableHeaderCardProps) {
  const { user } = useAdminUser();

  // Check if admin is owner of this table
  const isOwner = owner === 'admin' ||
    (user.permissions.ownedDatabases.includes('*'));

  return (
    <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Table2 className="w-5 h-5 text-blue-600" />
              {tableName}
              {isOwner && (
                <Crown className="w-4 h-4 text-olive-600" title="Ви власник цієї таблиці" />
              )}
            </CardTitle>
            <CardDescription className="mt-1">
              {databaseName} • {columnCount} колонок
            </CardDescription>
          </div>
          <Database className="w-6 h-6 text-blue-400" />
        </div>
      </CardHeader>
    </Card>
  );
}