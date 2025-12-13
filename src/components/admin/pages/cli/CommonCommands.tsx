import { Plus, Copy, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import AddCommandDialog from './AddCommandDialog';
import type { CommonCommandsProps } from './types';
import { useState } from 'react';

export default function CommonCommands({
  commands,
  onCommandClick,
  onAddCommand,
  onDeleteCommand,
  onCopyCommand,
}: CommonCommandsProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Поширені команди psql</CardTitle>
            <CardDescription>Швидкий довідник найбільш використовуваних команд</CardDescription>
          </div>
          <Button size="sm" onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Додати команду
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commands.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
              onClick={() => onCommandClick(item.cmd)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <code className="text-sm text-slate-900 font-mono block mb-1">{item.cmd}</code>
                  <p className="text-xs text-slate-600">{item.desc}</p>
                  {item.isCustom && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Користувацька
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopyCommand(item.cmd);
                    }}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  {item.isCustom && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCommand(item.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <AddCommandDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={onAddCommand}
      />
    </Card>
  );
}
