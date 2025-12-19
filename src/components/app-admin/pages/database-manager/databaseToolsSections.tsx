/**
 * Database Tools Sections Configuration
 * 
 * Defines all available tool sections for database management:
 * - Schemas management
 * - SQL query executor
 * - Schema visualizer
 * - Extensions manager
 * - Foreign servers (FDW)
 * - Functions & procedures
 * - Triggers & rules
 * - Backup & restore
 */

import { Terminal, Layers, Network, Puzzle, Code, Zap, Archive, Server } from 'lucide-react';
import QueryExecutor from './database-tools/query-executor';
import SchemasManager from './database-tools/SchemasManager';
import SchemaVisualizer from './database-tools/SchemaVisualizer';
import ExtensionManager from './database-tools/ExtensionManager';
import FunctionsManager from './database-tools/FunctionsManager';
import TriggersRules from './database-tools/TriggersRules';
import BackupRestore from './database-tools/BackupRestore';
import ForeignServersManager from './database-tools/ForeignServersManager';

export interface DatabaseToolSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  component: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * Returns all database tool sections for a specific database
 * @param selectedDatabase - Name of the currently selected database
 */
export const getDatabaseToolsSections = (selectedDatabase: string): DatabaseToolSection[] => [
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

/**
 * Default open state for each section
 */
export const defaultOpenSections: Record<string, boolean> = {
  schemas: true,
  query: false,
  schema: false,
  extensions: false,
  functions: false,
  triggers: false,
  backup: false,
  foreign_servers: false,
};

/**
 * Section IDs enum for type safety
 */
export const SectionIds = {
  SCHEMAS: 'schemas',
  QUERY: 'query',
  SCHEMA_VISUALIZER: 'schema',
  EXTENSIONS: 'extensions',
  FOREIGN_SERVERS: 'foreign_servers',
  FUNCTIONS: 'functions',
  TRIGGERS: 'triggers',
  BACKUP: 'backup',
} as const;

export type SectionId = typeof SectionIds[keyof typeof SectionIds];