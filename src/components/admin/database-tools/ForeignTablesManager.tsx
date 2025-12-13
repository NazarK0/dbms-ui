import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { foreignTables } from '../../../mockData';
import {
  TablesHeader,
  TablesSearchBar,
  TablesInfoAlert,
  ForeignTablesTable,
  CreateTableModal,
  type TableFormData,
} from './foreign-tables';

interface ForeignTablesManagerProps {
  selectedDatabase: string;
}

export default function ForeignTablesManager({ selectedDatabase }: ForeignTablesManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter tables based on search query
  const filteredTables = foreignTables.filter(table =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.server.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.remoteTable.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTable = (data: TableFormData) => {
    // Mock creation - in real app, this would call API
    console.log('Creating foreign table:', data);
    setShowCreateModal(false);
  };

  const handleDeleteTable = (tableName: string) => {
    if (confirm(`Ви впевнені, що хочете видалити зовнішню таблицю "${tableName}"?`)) {
      // Mock deletion - in real app, this would call API
      console.log('Deleting foreign table:', tableName);
    }
  };

  const handleRefreshTable = (tableName: string) => {
    // Mock refresh/sync - in real app, this would call API
    console.log('Refreshing foreign table:', tableName);
  };

  const handleEditTable = (tableName: string) => {
    // Mock edit - in real app, this would open edit modal
    console.log('Editing foreign table:', tableName);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <TablesHeader onCreateTable={() => setShowCreateModal(true)} />
        </CardHeader>
        
        <CardContent className="space-y-4">
          <TablesSearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <TablesInfoAlert />

          <ForeignTablesTable
            tables={filteredTables}
            onRefresh={handleRefreshTable}
            onEdit={handleEditTable}
            onDelete={handleDeleteTable}
          />
        </CardContent>
      </Card>

      <CreateTableModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateTable}
      />
    </div>
  );
}
