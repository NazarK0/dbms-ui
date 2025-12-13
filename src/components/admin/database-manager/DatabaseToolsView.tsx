import { useState } from 'react';
import { Terminal, Layers, Network, Puzzle, Code, Zap, Archive, ChevronDown, ChevronUp, Server } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible';
import QueryExecutor from '../database-tools/QueryExecutor';
import SchemasManager from '../database-tools/SchemasManager';
import SchemaVisualizer from '../database-tools/SchemaVisualizer';
import ExtensionManager from '../database-tools/ExtensionManager';
import FunctionsManager from '../database-tools/FunctionsManager';
import TriggersRules from '../database-tools/TriggersRules';
import BackupRestore from '../database-tools/BackupRestore';
import ForeignServersManager from '../database-tools/ForeignServersManager';

interface DatabaseToolsViewProps {
  selectedDatabase: string;
  activeSubTab?: string;
  onSubTabChange?: (tab: string) => void;
}

interface Section {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  component: React.ReactNode;
  defaultOpen?: boolean;
}

export default function DatabaseToolsView({
  selectedDatabase,
}: DatabaseToolsViewProps) {
  // Track which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    schemas: true,
    query: false,
    schema: false,
    extensions: false,
    functions: false,
    triggers: false,
    backup: false,
    foreign_servers: false,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Mock check for installed extensions
  const getInstalledExtensions = () => {
    // Mock data - in real app this would query the database
    const extensions = [
      { name: 'postgres_fdw', version: '1.1', description: 'Foreign-data wrapper for remote PostgreSQL servers' },
      { name: 'pg_stat_statements', version: '1.10', description: 'Track planning and execution statistics' },
      { name: 'pgcrypto', version: '1.3', description: 'Cryptographic functions' },
    ];
    return extensions;
  };

  const installedExtensions = getInstalledExtensions();
  const hasFDWExtension = installedExtensions.some(ext => 
    ext.name === 'postgres_fdw' || ext.name === 'mysql_fdw' || ext.name === 'oracle_fdw' || ext.name === 'multicorn'
  );

  const sections: Section[] = [
    {
      id: 'schemas',
      title: 'Схеми',
      description: 'Управління схемами та таблицями бази даних',
      icon: Layers,
      component: <SchemasManager selectedDatabase={selectedDatabase} />,
      defaultOpen: true,
    },
    {
      id: 'query',
      title: 'SQL Запити',
      description: 'Виконання SQL запитів до бази даних',
      icon: Terminal,
      component: <QueryExecutor selectedDatabase={selectedDatabase} />,
    },
    {
      id: 'schema',
      title: 'Граф бази даних',
      description: 'Візуалізація структури та зв\'язків таблиць',
      icon: Network,
      component: <SchemaVisualizer selectedDatabase={selectedDatabase} />,
    },
    {
      id: 'extensions',
      title: 'Розширення',
      description: 'Керування розширеннями PostgreSQL',
      icon: Puzzle,
      component: <ExtensionManager selectedDatabase={selectedDatabase} />,
    },
    {
      id: 'foreign_servers',
      title: 'Зовнішні сервери',
      description: 'Керування зовнішніми серверами (FDW)',
      icon: Server,
      component: <ForeignServersManager selectedDatabase={selectedDatabase} />,
    },
    {
      id: 'functions',
      title: 'Функції',
      description: 'Управління функціями та процедурами',
      icon: Code,
      component: <FunctionsManager selectedDatabase={selectedDatabase} />,
    },
    {
      id: 'triggers',
      title: 'Тригери',
      description: 'Управління тригерами та правилами',
      icon: Zap,
      component: <TriggersRules selectedDatabase={selectedDatabase} />,
    },
    {
      id: 'backup',
      title: 'Резервні копії',
      description: 'Створення та відновлення резервних копій',
      icon: Archive,
      component: <BackupRestore selectedDatabase={selectedDatabase} />,
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const Icon = section.icon;
        const isOpen = openSections[section.id];

        return (
          <Collapsible
            key={section.id}
            open={isOpen}
            onOpenChange={() => toggleSection(section.id)}
          >
            <Card className="border-slate-200 shadow-sm">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-900">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  {section.component}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
}