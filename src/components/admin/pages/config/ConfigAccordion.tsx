import { Save, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Input } from '../../../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../ui/accordion';
import type { ConfigParam } from './types';
import { getCategoryIcon, getCategoryName, getCategoryColor, getCategories, getParamsByCategory } from './utils';

interface ConfigAccordionProps {
  params: ConfigParam[];
  hasChanges: boolean;
  onParamChange?: (paramName: string, value: string) => void;
  onSave?: () => void;
  onReset?: () => void;
}

export default function ConfigAccordion({
  params,
  hasChanges,
  onParamChange,
  onSave,
  onReset,
}: ConfigAccordionProps) {
  const categories = getCategories(params);

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Налаштування PostgreSQL сервера</CardTitle>
            <CardDescription>Керування параметрами конфігурації postgresql.conf</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {onReset && (
              <Button variant="outline" onClick={onReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Скинути
              </Button>
            )}
            {onSave && (
              <Button disabled={!hasChanges} onClick={onSave}>
                <Save className="w-4 h-4 mr-2" />
                Зберегти зміни
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={[]} className="space-y-3">
          {categories.map((category) => {
            const categoryParams = getParamsByCategory(params, category);
            const Icon = getCategoryIcon(category);
            const color = getCategoryColor(category);
            const count = categoryParams.length;

            return (
              <AccordionItem 
                key={category} 
                value={category} 
                className="border border-slate-200 rounded-lg px-6 bg-white shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-slate-900">{getCategoryName(category)}</h3>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-64">Параметр</TableHead>
                          <TableHead className="w-48">Поточне значення</TableHead>
                          <TableHead className="w-48">За замовчуванням</TableHead>
                          <TableHead>Опис</TableHead>
                          <TableHead className="w-32 text-center">Restart</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categoryParams.map((param) => (
                          <TableRow 
                            key={param.name} 
                            className={param.value !== param.defaultValue ? 'bg-lime-50/50' : ''}
                          >
                            <TableCell>
                              <code className="text-sm text-slate-900 font-mono">{param.name}</code>
                            </TableCell>
                            <TableCell>
                              <Input 
                                defaultValue={param.value}
                                className="font-mono text-sm"
                                onChange={(e) => onParamChange?.(param.name, e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-mono">
                                {param.defaultValue}
                                {param.unit && <span className="ml-1 text-slate-500">{param.unit}</span>}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-slate-600 text-sm">
                              {param.description}
                            </TableCell>
                            <TableCell className="text-center">
                              {param.requiresRestart ? (
                                <Badge variant="destructive" className="text-xs">
                                  <RotateCcw className="w-3 h-3 mr-1" />
                                  Так
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">
                                  Ні
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
