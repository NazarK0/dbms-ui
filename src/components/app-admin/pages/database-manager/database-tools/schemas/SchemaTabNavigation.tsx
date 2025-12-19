import { Table2, Eye, Code, Zap, Database, Type } from 'lucide-react';
import { TabsList, TabsTrigger } from '../../../../../ui/tabs';

export type SchemaTab = 'tables' | 'views' | 'functions' | 'triggers' | 'foreign-tables' | 'data-types';

interface SchemaTabNavigationProps {
  activeTab?: SchemaTab;
}

export default function SchemaTabNavigation({ activeTab }: SchemaTabNavigationProps) {
  return (
    <TabsList className="w-full justify-start">
      <TabsTrigger value="tables" className="gap-2">
        <Table2 className="w-4 h-4" />
        Таблиці
      </TabsTrigger>
      <TabsTrigger value="views" className="gap-2">
        <Eye className="w-4 h-4" />
        Перегляди
      </TabsTrigger>
      <TabsTrigger value="functions" className="gap-2">
        <Code className="w-4 h-4" />
        Функції
      </TabsTrigger>
      <TabsTrigger value="triggers" className="gap-2">
        <Zap className="w-4 h-4" />
        Тригери
      </TabsTrigger>
      <TabsTrigger value="foreign-tables" className="gap-2">
        <Database className="w-4 h-4" />
        Зовнішні таблиці
      </TabsTrigger>
      <TabsTrigger value="data-types" className="gap-2">
        <Type className="w-4 h-4" />
        Типи даних
      </TabsTrigger>
    </TabsList>
  );
}
