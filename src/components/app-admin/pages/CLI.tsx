import { useState, useRef, useEffect } from 'react';
import { TerminalWindow, CommonCommands, SQLExamples } from './cli';
import {
  initialCommandHistory,
  defaultCommonCommands,
  defaultSQLExamples,
} from '@/mockData/admin/cli';
import {
  generateMockOutput,
  exportHistory,
  copyToClipboard,
  getHistoryCommand,
} from './cli/utils';
import type { CommandHistory, SavedCommand, SavedExample } from './cli/types';

export default function CLI() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>(initialCommandHistory);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
  const [commonCommands, setCommonCommands] = useState<SavedCommand[]>(defaultCommonCommands);
  const [sqlExamples, setSqlExamples] = useState<SavedExample[]>(defaultSQLExamples);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = () => {
    if (!command.trim()) return;

    const newEntry: CommandHistory = {
      id: Date.now().toString(),
      command: command.trim(),
      output: generateMockOutput(command.trim()),
      timestamp: new Date().toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      status: command.trim().toLowerCase().includes('error') ? 'error' : 'success',
      executionTime: Math.floor(Math.random() * 50) + 1 + 'ms',
    };

    setHistory([...history, newEntry]);
    setCommand('');
    setCommandHistoryIndex(-1);

    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const result = getHistoryCommand(history, commandHistoryIndex, 'up');
      setCommand(result.command);
      setCommandHistoryIndex(result.newIndex);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const result = getHistoryCommand(history, commandHistoryIndex, 'down');
      setCommand(result.command);
      setCommandHistoryIndex(result.newIndex);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleExportHistory = () => {
    exportHistory(history);
  };

  const handleCopyCommand = (cmd: string) => {
    copyToClipboard(cmd);
  };

  const handleAddCommand = (newCommand: SavedCommand) => {
    setCommonCommands([...commonCommands, newCommand]);
  };

  const handleDeleteCommand = (id: string) => {
    setCommonCommands(commonCommands.filter((cmd) => cmd.id !== id));
  };

  const handleAddExample = (newExample: SavedExample) => {
    setSqlExamples([...sqlExamples, newExample]);
  };

  const handleDeleteExample = (id: string) => {
    setSqlExamples(sqlExamples.filter((ex) => ex.id !== id));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-6">
      {/* Terminal */}
      <TerminalWindow
        history={history}
        command={command}
        onCommandChange={setCommand}
        onExecute={executeCommand}
        onClearHistory={clearHistory}
        onExportHistory={handleExportHistory}
        onCopyCommand={handleCopyCommand}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        scrollRef={scrollRef}
      />

      {/* Common Commands Reference */}
      <CommonCommands
        commands={commonCommands}
        onCommandClick={setCommand}
        onAddCommand={handleAddCommand}
        onDeleteCommand={handleDeleteCommand}
        onCopyCommand={handleCopyCommand}
      />

      {/* Quick SQL Examples */}
      <SQLExamples
        examples={sqlExamples}
        onExampleClick={setCommand}
        onAddExample={handleAddExample}
        onDeleteExample={handleDeleteExample}
        onCopyQuery={handleCopyCommand}
      />
    </div>
  );
}