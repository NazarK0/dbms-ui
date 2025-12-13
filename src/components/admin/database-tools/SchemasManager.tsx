import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Tabs } from '../../ui/tabs';
import { getSchemasByDatabase } from '../../../mockData';
import {
  SchemasHeader,
  SelectedSchemaAlert,
  SchemasTable,
  SchemaTabNavigation,
  SchemaTabsContent,
  CreateSchemaModal,
  type SchemaFormData,
  type SchemaTab,
} from './schemas';

interface SchemasManagerProps {
  selectedDatabase: string;
}

export default function SchemasManager({ selectedDatabase }: SchemasManagerProps) {
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [activeSchemaTab, setActiveSchemaTab] = useState<SchemaTab>('tables');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Get schemas for the selected database
  const schemas = getSchemasByDatabase(selectedDatabase);

  const handleCreateSchema = (data: SchemaFormData) => {
    // Mock creation - in real app, this would call API
    console.log('Creating schema:', data);
    setShowCreateModal(false);
  };

  const handleDeleteSchema = (schemaName: string) => {
    if (schemaName === 'public') {
      alert('Неможливо видалити схему "public"');
      return;
    }
    if (confirm(`Ви впевнені, що хочете видалити схему "${schemaName}"?`)) {
      // Mock deletion - in real app, this would call API
      console.log('Deleting schema:', schemaName);
    }
  };

  const handleExportSchema = (schemaName: string) => {
    // Mock export - in real app, this would trigger download
    console.log('Exporting schema:', schemaName);
  };

  const handleEditSchema = (schemaName: string) => {
    // Mock edit - in real app, this would open edit modal
    console.log('Editing schema:', schemaName);
  };

  // If a schema is selected, show its content tabs
  if (selectedSchema) {
    return (
      <div className="space-y-6">
        <SelectedSchemaAlert
          database={selectedDatabase}
          schema={selectedSchema}
          onBack={() => setSelectedSchema(null)}
        />

        <Tabs 
          defaultValue={activeSchemaTab} 
          onValueChange={(value) => setActiveSchemaTab(value as SchemaTab)}
        >
          <SchemaTabNavigation activeTab={activeSchemaTab} />
          <SchemaTabsContent selectedDatabase={selectedDatabase} />
        </Tabs>
      </div>
    );
  }

  // Show schemas list
  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <SchemasHeader 
            selectedDatabase={selectedDatabase}
            onCreateSchema={() => setShowCreateModal(true)}
          />
        </CardHeader>
        
        <CardContent>
          <SchemasTable
            schemas={schemas}
            onSelectSchema={setSelectedSchema}
            onExport={handleExportSchema}
            onEdit={handleEditSchema}
            onDelete={handleDeleteSchema}
          />
        </CardContent>
      </Card>

      <CreateSchemaModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateSchema}
        selectedDatabase={selectedDatabase}
      />
    </div>
  );
}
