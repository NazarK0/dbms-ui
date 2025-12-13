import { Type, Plus } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '../../../ui/card';
import { Button } from '../../../ui/button';

interface TypesHeaderProps {
  onCreateClick: () => void;
}

export default function TypesHeader({ onCreateClick }: TypesHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
            <Type className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>Типи даних</CardTitle>
            <CardDescription>Управління користувацькими типами даних PostgreSQL</CardDescription>
          </div>
        </div>
        <Button 
          onClick={onCreateClick}
          className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Створити тип
        </Button>
      </div>
    </CardHeader>
  );
}
