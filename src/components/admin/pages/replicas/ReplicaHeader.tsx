import { Plus } from 'lucide-react';
import { Button } from '../../../ui/button';

interface ReplicaHeaderProps {
  onAddReplica: () => void;
}

export default function ReplicaHeader({ onAddReplica }: ReplicaHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-slate-900">Кластери реплік</h2>
        <p className="text-slate-600">Управління топологією та моніторинг реплікації PostgreSQL</p>
      </div>
      <Button onClick={onAddReplica}>
        <Plus className="w-4 h-4 mr-2" />
        Додати репліку
      </Button>
    </div>
  );
}
