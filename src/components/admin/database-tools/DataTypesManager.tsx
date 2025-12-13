import { useState } from 'react';
import { Hash, Database, List } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { domainTypes, compositeTypes, enumTypes } from '../../../mockData';
import {
  TypesHeader,
  TypesSearchBar,
  TypesInfoAlert,
  DomainTypesTable,
  CompositeTypesTable,
  EnumTypesTable,
  CreateTypeModal,
  type TypeFormData,
} from './data-types';

interface DataTypesManagerProps {
  selectedDatabase: string;
}

export default function DataTypesManager({ selectedDatabase }: DataTypesManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'custom' | 'composite' | 'enum'>('custom');

  // Filter types based on search query
  const filteredDomainTypes = domainTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompositeTypes = compositeTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEnumTypes = enumTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateType = (data: TypeFormData) => {
    // Mock creation - in real app, this would call API
    console.log('Creating type:', data);
    setShowCreateModal(false);
  };

  const handleDeleteType = (typeName: string) => {
    if (confirm(`Ви впевнені, що хочете видалити тип даних "${typeName}"?`)) {
      // Mock deletion - in real app, this would call API
      console.log('Deleting type:', typeName);
    }
  };

  const handleEditType = (typeName: string) => {
    // Mock edit - in real app, this would open edit modal
    console.log('Editing type:', typeName);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <TypesHeader onCreateClick={() => setShowCreateModal(true)} />
        
        <CardContent className="space-y-4">
          <TypesSearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <TypesInfoAlert />

          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="custom" className="gap-2">
                <Hash className="w-4 h-4" />
                Domain типи
              </TabsTrigger>
              <TabsTrigger value="composite" className="gap-2">
                <Database className="w-4 h-4" />
                Composite типи
              </TabsTrigger>
              <TabsTrigger value="enum" className="gap-2">
                <List className="w-4 h-4" />
                Enum типи
              </TabsTrigger>
            </TabsList>

            <TabsContent value="custom">
              <DomainTypesTable 
                types={filteredDomainTypes}
                onDelete={handleDeleteType}
                onEdit={handleEditType}
              />
            </TabsContent>

            <TabsContent value="composite">
              <CompositeTypesTable 
                types={filteredCompositeTypes}
                onDelete={handleDeleteType}
                onEdit={handleEditType}
              />
            </TabsContent>

            <TabsContent value="enum">
              <EnumTypesTable 
                types={filteredEnumTypes}
                onDelete={handleDeleteType}
                onEdit={handleEditType}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <CreateTypeModal 
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateType}
      />
    </div>
  );
}
