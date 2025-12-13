import { Plus } from 'lucide-react';
import { Button } from '../../ui/button';

interface NewTabButtonProps {
  onClick: () => void;
}

export default function NewTabButton({ onClick }: NewTabButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex-shrink-0 w-10 h-10 m-1 rounded-md hover:bg-slate-200/50 text-slate-600"
      onClick={onClick}
    >
      <Plus className="w-4 h-4" />
    </Button>
  );
}
