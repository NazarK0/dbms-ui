import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, Copy, Download, Clock, Database, CheckCircle2, Plus, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { ScrollArea } from '../../ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';

interface CommandHistory {
  id: string;
  command: string;
  output: string;
  timestamp: string;
  status: 'success' | 'error';
  executionTime: string;
}

interface SavedCommand {
  id: string;
  cmd: string;
  desc: string;
  isCustom: boolean;
}

interface SavedExample {
  id: string;
  title: string;
  query: string;
  isCustom: boolean;
}

export default function CLI() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      id: '1',
      command: '\\l',
      output: `                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 template0 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
 template1 | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
           |          |          |             |             | postgres=CTc/postgres
 production| postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
(4 rows)`,
      timestamp: '14:23:45',
      status: 'success',
      executionTime: '8ms'
    },
    {
      id: '2',
      command: 'SELECT version();',
      output: `                                                 version                                                  
----------------------------------------------------------------------------------------------------------
 PostgreSQL 16.1 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 13.2.0, 64-bit
(1 row)`,
      timestamp: '14:24:12',
      status: 'success',
      executionTime: '3ms'
    },
  ]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Dialogs state
  const [addCommandDialogOpen, setAddCommandDialogOpen] = useState(false);
  const [addExampleDialogOpen, setAddExampleDialogOpen] = useState(false);
  const [newCommandCmd, setNewCommandCmd] = useState('');
  const [newCommandDesc, setNewCommandDesc] = useState('');
  const [newExampleTitle, setNewExampleTitle] = useState('');
  const [newExampleQuery, setNewExampleQuery] = useState('');

  const [commonCommands, setCommonCommands] = useState<SavedCommand[]>([
    { id: '1', cmd: '\\l', desc: 'Список баз даних', isCustom: false },
    { id: '2', cmd: '\\dt', desc: 'Список таблиць', isCustom: false },
    { id: '3', cmd: '\\du', desc: 'Список користувачів', isCustom: false },
    { id: '4', cmd: '\\d table_name', desc: 'Опис таблиці', isCustom: false },
    { id: '5', cmd: '\\c database_name', desc: 'Підключитись до БД', isCustom: false },
    { id: '6', cmd: '\\q', desc: 'Вийти з psql', isCustom: false },
    { id: '7', cmd: 'SELECT version();', desc: 'Версія PostgreSQL', isCustom: false },
    { id: '8', cmd: 'SELECT current_database();', desc: 'Поточна база даних', isCustom: false },
    { id: '9', cmd: 'SHOW all;', desc: 'Всі параметри', isCustom: false },
    { id: '10', cmd: '\\x', desc: 'Розширений вивід', isCustom: false },
  ]);

  const [sqlExamples, setSqlExamples] = useState<SavedExample[]>([
    { 
      id: '1',
      title: 'Перевірка розміру баз даних',
      query: "SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) AS size FROM pg_database ORDER BY pg_database_size(pg_database.datname) DESC;",
      isCustom: false
    },
    { 
      id: '2',
      title: 'Активні підключення',
      query: "SELECT pid, usename, application_name, client_addr, state, query_start FROM pg_stat_activity WHERE state = 'active';",
      isCustom: false
    },
    { 
      id: '3',
      title: 'Розмір таблиць',
      query: "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC LIMIT 10;",
      isCustom: false
    },
    { 
      id: '4',
      title: 'Індекси без використання',
      query: "SELECT schemaname, tablename, indexname FROM pg_stat_user_indexes WHERE idx_scan = 0 ORDER BY schemaname, tablename;",
      isCustom: false
    },
  ]);

  const executeCommand = () => {
    if (!command.trim()) return;

    const newEntry: CommandHistory = {
      id: Date.now().toString(),
      command: command.trim(),
      output: generateMockOutput(command.trim()),
      timestamp: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: command.trim().toLowerCase().includes('error') ? 'error' : 'success',
      executionTime: Math.floor(Math.random() * 50) + 1 + 'ms'
    };

    setHistory([...history, newEntry]);
    setCommand('');
    setCommandHistoryIndex(-1);

    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const generateMockOutput = (cmd: string): string => {
    const lower = cmd.toLowerCase();
    
    if (lower.startsWith('\\l')) {
      return `                                  List of databases
   Name    |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
-----------+----------+----------+-------------+-------------+-----------------------
 postgres  | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 production| postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
 staging   | postgres | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 
(3 rows)`;
    }
    
    if (lower.startsWith('\\dt')) {
      return `                List of relations
 Schema |     Name      | Type  |  Owner   
--------+---------------+-------+----------
 public | users         | table | postgres
 public | orders        | table | postgres
 public | products      | table | postgres
 public | categories    | table | postgres
(4 rows)`;
    }
    
    if (lower.startsWith('\\du')) {
      return `                                   List of roles
 Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
 admin     | Superuser, Create role, Create DB                          | {}
 developer | Create DB                                                  | {}
 postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 readonly  |                                                            | {}`;
    }
    
    if (lower.includes('select version()')) {
      return `                                                 version                                                  
----------------------------------------------------------------------------------------------------------
 PostgreSQL 16.1 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 13.2.0, 64-bit
(1 row)`;
    }
    
    if (lower.includes('select current_database()')) {
      return ` current_database 
------------------
 production
(1 row)`;
    }
    
    if (lower.startsWith('select')) {
      return `Query executed successfully.
(${Math.floor(Math.random() * 100) + 1} rows affected)`;
    }
    
    if (lower.startsWith('insert') || lower.startsWith('update') || lower.startsWith('delete')) {
      const rows = Math.floor(Math.random() * 10) + 1;
      return `${lower.split(' ')[0].toUpperCase()} ${rows}`;
    }
    
    if (lower.startsWith('create')) {
      return 'CREATE TABLE';
    }
    
    if (lower.startsWith('\\x')) {
      return 'Expanded display is on.';
    }
    
    return `Command executed: ${cmd}
OK`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = commandHistoryIndex + 1;
        if (newIndex < history.length) {
          setCommandHistoryIndex(newIndex);
          setCommand(history[history.length - 1 - newIndex].command);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistoryIndex > 0) {
        const newIndex = commandHistoryIndex - 1;
        setCommandHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex].command);
      } else if (commandHistoryIndex === 0) {
        setCommandHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
  };

  const exportHistory = () => {
    const content = history.map(h => `[${h.timestamp}] ${h.command}\n${h.output}\n`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `postgresql-cli-history-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const addNewCommand = () => {
    if (!newCommandCmd.trim() || !newCommandDesc.trim()) return;
    
    const newCommand: SavedCommand = {
      id: Date.now().toString(),
      cmd: newCommandCmd.trim(),
      desc: newCommandDesc.trim(),
      isCustom: true
    };
    
    setCommonCommands([...commonCommands, newCommand]);
    setNewCommandCmd('');
    setNewCommandDesc('');
    setAddCommandDialogOpen(false);
  };

  const deleteCommand = (id: string) => {
    setCommonCommands(commonCommands.filter(cmd => cmd.id !== id));
  };

  const addNewExample = () => {
    if (!newExampleTitle.trim() || !newExampleQuery.trim()) return;
    
    const newExample: SavedExample = {
      id: Date.now().toString(),
      title: newExampleTitle.trim(),
      query: newExampleQuery.trim(),
      isCustom: true
    };
    
    setSqlExamples([...sqlExamples, newExample]);
    setNewExampleTitle('');
    setNewExampleQuery('');
    setAddExampleDialogOpen(false);
  };

  const deleteExample = (id: string) => {
    setSqlExamples(sqlExamples.filter(ex => ex.id !== id));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-6">
      {/* Terminal */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                PostgreSQL CLI
              </CardTitle>
              <CardDescription>Інтерактивний термінал для виконання команд psql</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportHistory}>
                <Download className="w-4 h-4 mr-2" />
                Експорт історії
              </Button>
              <Button variant="outline" size="sm" onClick={clearHistory}>
                <Trash2 className="w-4 h-4 mr-2" />
                Очистити
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-slate-900 rounded-b-lg">
            {/* Terminal Output */}
            <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
              <div className="space-y-4 font-mono text-sm">
                {/* Welcome Message */}
                <div className="text-green-400">
                  <p>PostgreSQL 16.1 - Інтерактивний термінал</p>
                  <p className="text-slate-500">Введіть "\?" для довідки або команду SQL для виконання.</p>
                  <p className="text-slate-500 mb-4">Використовуйте ↑/↓ для навігації по історії команд.</p>
                </div>

                {/* Command History */}
                {history.map((entry) => (
                  <div key={entry.id} className="border-l-2 border-lime-600 pl-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lime-400">postgres=#</span>
                        <span className="text-white">{entry.command}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-slate-400 hover:text-white"
                          onClick={() => copyCommand(entry.command)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant={entry.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                          {entry.status === 'success' ? 'OK' : 'ERROR'}
                        </Badge>
                        <span className="text-slate-500">{entry.executionTime}</span>
                        <span className="text-slate-600">{entry.timestamp}</span>
                      </div>
                    </div>
                    <pre className={`text-sm whitespace-pre-wrap ${entry.status === 'success' ? 'text-green-300' : 'text-red-400'}`}>
                      {entry.output}
                    </pre>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-slate-700 p-4">
              <div className="flex items-center gap-2">
                <span className="text-lime-400 font-mono">postgres=#</span>
                <Input
                  ref={inputRef}
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Введіть команду SQL або psql..."
                  className="flex-1 bg-slate-800 border-slate-700 text-white font-mono placeholder:text-slate-500 focus-visible:ring-lime-600"
                />
                <Button 
                  size="sm"
                  onClick={executeCommand}
                  disabled={!command.trim()}
                  className="bg-lime-600 hover:bg-lime-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Виконати
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-mono">
                Підказка: Натисніть Enter для виконання, ↑/↓ для історії команд
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Commands Reference */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Поширені команди psql</CardTitle>
              <CardDescription>Швидкий довідник найбільш використовуваних команд</CardDescription>
            </div>
            <Dialog open={addCommandDialogOpen} onOpenChange={setAddCommandDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Додати команду
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Додати нову команду</DialogTitle>
                  <DialogDescription>
                    Збережіть вашу власну команду для швидкого доступу
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cmd">Команда</Label>
                    <Input 
                      id="cmd" 
                      placeholder="Наприклад: SELECT * FROM users;" 
                      value={newCommandCmd}
                      onChange={(e) => setNewCommandCmd(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desc">Опис</Label>
                    <Input 
                      id="desc" 
                      placeholder="Короткий опис команди..."
                      value={newCommandDesc}
                      onChange={(e) => setNewCommandDesc(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddCommandDialogOpen(false)}>Скасувати</Button>
                  <Button onClick={addNewCommand} disabled={!newCommandCmd.trim() || !newCommandDesc.trim()}>
                    <Save className="w-4 h-4 mr-2" />
                    Зберегти
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonCommands.map((item) => (
              <div 
                key={item.id}
                className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => setCommand(item.cmd)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <code className="text-sm text-slate-900 font-mono block mb-1">{item.cmd}</code>
                    <p className="text-xs text-slate-600">{item.desc}</p>
                    {item.isCustom && (
                      <Badge variant="secondary" className="text-xs mt-1">Користувацька</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyCommand(item.cmd);
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
                          deleteCommand(item.id);
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
      </Card>

      {/* Quick SQL Examples */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Приклади SQL запитів</CardTitle>
              <CardDescription>Готові шаблони для швидкого виконання</CardDescription>
            </div>
            <Dialog open={addExampleDialogOpen} onOpenChange={setAddExampleDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Додати приклад
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Додати новий SQL приклад</DialogTitle>
                  <DialogDescription>
                    Збережіть ваш SQL запит для швидкого доступу
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Назва</Label>
                    <Input 
                      id="title" 
                      placeholder="Наприклад: Статистика користувачів" 
                      value={newExampleTitle}
                      onChange={(e) => setNewExampleTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="query">SQL запит</Label>
                    <Textarea 
                      id="query" 
                      placeholder="Введіть ваш SQL запит..."
                      value={newExampleQuery}
                      onChange={(e) => setNewExampleQuery(e.target.value)}
                      className="min-h-[120px] font-mono text-sm"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddExampleDialogOpen(false)}>Скасувати</Button>
                  <Button onClick={addNewExample} disabled={!newExampleTitle.trim() || !newExampleQuery.trim()}>
                    <Save className="w-4 h-4 mr-2" />
                    Зберегти
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sqlExamples.map((example) => (
              <div 
                key={example.id}
                className="border border-slate-200 rounded-lg p-4 bg-slate-50/30 hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => setCommand(example.query)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-slate-900">{example.title}</h4>
                      {example.isCustom && (
                        <Badge variant="secondary" className="text-xs">Користувацький</Badge>
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
                        copyCommand(example.query);
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
                          deleteExample(example.id);
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
      </Card>
    </div>
  );
}