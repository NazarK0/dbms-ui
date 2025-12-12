import { Terminal, Layers, Network, Puzzle, Code, Zap, Archive } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import QueryExecutor from '../database-tools/QueryExecutor';
import SchemasManager from '../database-tools/SchemasManager';
import SchemaVisualizer from '../database-tools/SchemaVisualizer';
import ExtensionManager from '../database-tools/ExtensionManager';
import FunctionsManager from '../database-tools/FunctionsManager';
import TriggersRules from '../database-tools/TriggersRules';
import BackupRestore from '../database-tools/BackupRestore';

type SubTab = 'query' | 'schemas' | 'schema' | 'extensions' | 'functions' | 'triggers' | 'backup';

interface DatabaseToolsViewProps {
  selectedDatabase: string;
  activeSubTab: SubTab;
  onSubTabChange: (tab: SubTab) => void;
}

export default function DatabaseToolsView({
  selectedDatabase,
  activeSubTab,
  onSubTabChange,
}: DatabaseToolsViewProps) {
  return (
    <Tabs value={activeSubTab} onValueChange={(value) => onSubTabChange(value as SubTab)}>
      <TabsList className="bg-white shadow-sm border border-slate-200 h-auto">
        <TabsTrigger value="query" className="gap-2">
          <Terminal className="w-4 h-4" />
          Запити
        </TabsTrigger>
        <TabsTrigger value="schemas" className="gap-2">
          <Layers className="w-4 h-4" />
          Схеми
        </TabsTrigger>
        <TabsTrigger value="schema" className="gap-2">
          <Network className="w-4 h-4" />
          Схема БД
        </TabsTrigger>
        <TabsTrigger value="extensions" className="gap-2">
          <Puzzle className="w-4 h-4" />
          Розширення
        </TabsTrigger>
        <TabsTrigger value="functions" className="gap-2">
          <Code className="w-4 h-4" />
          Функції
        </TabsTrigger>
        <TabsTrigger value="triggers" className="gap-2">
          <Zap className="w-4 h-4" />
          Тригери
        </TabsTrigger>
        <TabsTrigger value="backup" className="gap-2">
          <Archive className="w-4 h-4" />
          Резервні копії
        </TabsTrigger>
      </TabsList>

      <TabsContent value="query">
        <QueryExecutor selectedDatabase={selectedDatabase} />
      </TabsContent>
      <TabsContent value="schemas">
        <SchemasManager selectedDatabase={selectedDatabase} />
      </TabsContent>
      <TabsContent value="schema">
        <SchemaVisualizer selectedDatabase={selectedDatabase} />
      </TabsContent>
      <TabsContent value="extensions">
        <ExtensionManager selectedDatabase={selectedDatabase} />
      </TabsContent>
      <TabsContent value="functions">
        <FunctionsManager selectedDatabase={selectedDatabase} />
      </TabsContent>
      <TabsContent value="triggers">
        <TriggersRules selectedDatabase={selectedDatabase} />
      </TabsContent>
      <TabsContent value="backup">
        <BackupRestore selectedDatabase={selectedDatabase} />
      </TabsContent>
    </Tabs>
  );
}