import { useState, useEffect } from 'react';
import { Code, Plus, Trash2, Search, Edit, FileCode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { functions, functionCode } from '../../../mockData/admin';
import { API, api } from '../../../utils/api';
import { SkeletonTable, SkeletonCodeEditor } from '../../ui/skeletons';

export default function FunctionsManager({ selectedDatabase }: { selectedDatabase?: string }) {
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [isLoadingFunctions, setIsLoadingFunctions] = useState(true);
  const [functionsList, setFunctionsList] = useState<any[]>([]);

  useEffect(() => {
    // Load functions
    api.get(API.admin.databaseTools.functions.list(), { database: selectedDatabase })
      .then((data) => {
        setFunctionsList(data);
        setIsLoadingFunctions(false);
      })
      .catch((error) => {
        console.error('Error loading functions:', error);
        setIsLoadingFunctions(false);
      });
  }, [selectedDatabase]);

  return (
    <div className="space-y-6">
      {/* Functions List */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-slate-700" />
              <CardTitle>Функції</CardTitle>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Створити функцію
            </Button>
          </div>
          <CardDescription>База даних: {selectedDatabase}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingFunctions ? (
            <SkeletonTable rows={6} columns={6} showActions />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Назва</TableHead>
                  <TableHead>Схема</TableHead>
                  <TableHead>Аргументи</TableHead>
                  <TableHead>Повертає</TableHead>
                  <TableHead>Мова</TableHead>
                  <TableHead className="text-right">Дії</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {functionsList.map((func) => (
                  <TableRow 
                    key={func.name}
                    onClick={() => setSelectedFunction(func.name)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-medium text-slate-900">{func.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{func.schema}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-600">
                      {func.arguments || <span className="text-slate-400">—</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{func.returns}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{func.language}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Function Details */}
      {selectedFunction && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Код функції: {selectedFunction}</CardTitle>
            <CardDescription>Вихідний код SQL функції</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded-lg p-4">
              <pre className="text-slate-100 text-sm font-mono overflow-x-auto">
                <code>{functionCode}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}