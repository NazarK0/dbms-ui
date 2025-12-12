import { useState } from 'react';
import { Terminal, Play, Trash2, Plus, Download, Clock, AlertCircle, CheckCircle, Database, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { Alert, AlertDescription } from '../../ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

export default function QueryExecutor({ selectedDatabase }: { selectedDatabase?: string }) {
  const [query, setQuery] = useState('SELECT * FROM users LIMIT 10;');
  const [results, setResults] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const queryHistory = [
    { query: 'SELECT COUNT(*) FROM orders WHERE status = \'completed\'', time: '10:45 AM', duration: '12мс' },
    { query: 'UPDATE users SET last_login = NOW() WHERE id = 123', time: '10:32 AM', duration: '8мс' },
    { query: 'INSERT INTO logs (message, level) VALUES (\'Test\', \'INFO\')', time: '10:15 AM', duration: '5мс' },
    { query: 'CREATE TABLE analytics (id SERIAL PRIMARY KEY, data JSONB)', time: '09:58 AM', duration: '145мс' },
  ];

  const sampleResults = {
    columns: ['id', 'username', 'email', 'created_at', 'status'],
    rows: [
      [1, 'john_doe', 'john@example.com', '2024-01-15 10:30:00', 'active'],
      [2, 'jane_smith', 'jane@example.com', '2024-01-16 14:22:00', 'active'],
      [3, 'bob_wilson', 'bob@example.com', '2024-01-17 09:15:00', 'inactive'],
      [4, 'alice_brown', 'alice@example.com', '2024-01-18 16:45:00', 'active'],
      [5, 'charlie_davis', 'charlie@example.com', '2024-01-19 11:20:00', 'active'],
    ],
    rowCount: 5,
    executionTime: '15мс',
  };

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setResults(sampleResults);
      setIsExecuting(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Query Editor */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-slate-700" />
              <CardTitle>Редактор SQL запитів</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Зберегти
              </Button>
              <Button 
                size="sm" 
                onClick={handleExecuteQuery}
                disabled={isExecuting}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                {isExecuting ? 'Виконується...' : 'Виконати'}
              </Button>
            </div>
          </div>
          {selectedDatabase && (
            <Alert className="mt-2 bg-blue-50 border-blue-200">
              <Database className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                Поточна база даних: <span className="font-medium">{selectedDatabase}</span>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[200px] font-mono text-sm border-0 rounded-none resize-none focus-visible:ring-0"
            placeholder="Введіть ваш SQL запит тут..."
          />
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50/50">
            <div className="flex items-center justify-between">
              <CardTitle>Результати запиту</CardTitle>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{results.rowCount} рядків</Badge>
                <Badge variant="outline">Час виконання: {results.executionTime}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {results.columns.map((col: string) => (
                      <TableHead key={col}>{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.rows.map((row: any[], index: number) => (
                    <TableRow key={index}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} className="font-mono text-sm">
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Query History */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-700" />
            <CardTitle>Історія запитів</CardTitle>
          </div>
          <CardDescription>Клацніть на запит, щоб відкрити його в редакторі</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {queryHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200"
                onClick={() => setQuery(item.query)}
              >
                <div className="flex-1">
                  <code className="text-sm text-slate-900 block bg-white px-3 py-2 rounded border border-slate-200">
                    {item.query}
                  </code>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="outline" className="text-xs">{item.time}</Badge>
                    <Badge variant="secondary" className="text-xs">{item.duration}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}