import { Plus, Database } from 'lucide-react';
import { CardTitle, CardDescription } from '../../../ui/card';
import { Button } from '../../../ui/button';

interface TablesHeaderProps {
  onCreateTable: () => void;
}

export default function TablesHeader({ onCreateTable }: TablesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
          <Database className="w-5 h-5 text-white" />
        </div>
        <div>
          <CardTitle>Зовнішні таблиці</CardTitle>
          <CardDescription>Управління Foreign Data Wrappers (FDW) таблицями</CardDescription>
        </div>
      </div>
      <Button 
        onClick={onCreateTable}
        className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        Створити зовнішню таблицю
      </Button>
    </div>
  );
}
