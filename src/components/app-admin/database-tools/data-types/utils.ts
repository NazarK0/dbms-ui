// Utility functions for data types management
import { Database, List, Hash, Type } from 'lucide-react';

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'composite':
      return Database;
    case 'enum':
      return List;
    case 'domain':
      return Hash;
    default:
      return Type;
  }
};

export const getCategoryBadgeColor = (category: string): string => {
  const colors: Record<string, string> = {
    composite: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    enum: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
    domain: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
  };
  return colors[category] || 'bg-slate-100 text-slate-700';
};

export const getCategoryGradient = (category: string): string => {
  const gradients: Record<string, string> = {
    composite: 'from-blue-500 to-indigo-600',
    enum: 'from-purple-500 to-pink-600',
    domain: 'from-orange-500 to-red-600',
  };
  return gradients[category] || 'from-slate-500 to-slate-600';
};

export const getBaseTypeOptions = () => [
  { value: 'varchar', label: 'VARCHAR' },
  { value: 'integer', label: 'INTEGER' },
  { value: 'numeric', label: 'NUMERIC' },
  { value: 'text', label: 'TEXT' },
  { value: 'boolean', label: 'BOOLEAN' },
  { value: 'timestamp', label: 'TIMESTAMP' },
  { value: 'date', label: 'DATE' },
  { value: 'json', label: 'JSON' },
  { value: 'jsonb', label: 'JSONB' },
];

export const getTypeCategoryOptions = () => [
  { value: 'domain', label: 'Domain (обмеження на базовий тип)' },
  { value: 'composite', label: 'Composite (структура з атрибутами)' },
  { value: 'enum', label: 'Enum (перелік значень)' },
];
