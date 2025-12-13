import { Plus, Copy, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import AddExampleDialog from './AddExampleDialog';
import type { SQLExamplesProps } from './types';
import { useState } from 'react';

export default function SQLExamples({
  examples,
  onExampleClick,
  onAddExample,
  onDeleteExample,
  onCopyQuery,
}: SQLExamplesProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Приклади SQL запитів</CardTitle>
            <CardDescription>Готові шаблони для швидкого виконання</CardDescription>
          </div>
          <Button size="sm" onClick={() => setAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Додати приклад
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {examples.map((example) => (
            <div
              key={example.id}
              className="border border-slate-200 rounded-lg p-4 bg-slate-50/30 hover:bg-slate-50 transition-colors cursor-pointer group"
              onClick={() => onExampleClick(example.query)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-slate-900">{example.title}</h4>
                    {example.isCustom && (
                      <Badge variant="secondary" className="text-xs">
                        Користувацький
                      </Badge>
                    )}
                  </div>
                  <code className="text-xs text-slate-600 font-mono block bg-white p-2 rounded border border-slate-200">
                    {example.query}
                  </code>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopyQuery(example.query);
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Копіювати
                  </Button>
                  {example.isCustom && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteExample(example.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <AddExampleDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={onAddExample}
      />
    </Card>
  );
}
