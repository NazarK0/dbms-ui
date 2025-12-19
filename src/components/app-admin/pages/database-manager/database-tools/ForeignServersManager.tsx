import { useState } from 'react';
import { Card, CardContent } from '../../../..//ui/card';
import { installedExtensions, hasFDWExtension, foreignServers } from '../../../../../mockData';
import {
  ServersHeader,
  ServersSearchBar,
  ServersInfoAlert,
  FDWNotInstalledAlert,
  ServersTable,
  CreateServerModal,
  type ServerFormData,
} from './foreign-servers';

interface ForeignServersManagerProps {
  selectedDatabase: string;
}

export default function ForeignServersManager({ selectedDatabase }: ForeignServersManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter servers based on search query
  const filteredServers = foreignServers.filter(server =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.wrapper.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateServer = (data: ServerFormData) => {
    // Mock creation - in real app, this would call API
    console.log('Creating server:', data);
    setShowCreateModal(false);
  };

  const handleDeleteServer = (serverName: string) => {
    if (confirm(`Ви впевнені, що хочете видалити зовнішній сервер "${serverName}"? Всі пов'язані зовнішні таблиці будуть видалені.`)) {
      // Mock deletion - in real app, this would call API
      console.log('Deleting server:', serverName);
    }
  };

  const handleTestConnection = (serverName: string) => {
    // Mock connection test - in real app, this would call API
    console.log('Testing connection to:', serverName);
  };

  const handleEditServer = (serverName: string) => {
    // Mock edit - in real app, this would open edit modal
    console.log('Editing server:', serverName);
  };

  // If FDW extension is not installed, show alert
  if (!hasFDWExtension) {
    return <FDWNotInstalledAlert />;
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <ServersHeader onAddServer={() => setShowCreateModal(true)} />

        <CardContent className="space-y-4">
          <ServersSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <ServersInfoAlert />

          <ServersTable
            servers={filteredServers}
            onTest={handleTestConnection}
            onEdit={handleEditServer}
            onDelete={handleDeleteServer}
          />
        </CardContent>
      </Card>

      <CreateServerModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateServer}
      />
    </div>
  );
}
