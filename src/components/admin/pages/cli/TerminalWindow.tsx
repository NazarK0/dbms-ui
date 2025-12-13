import { Terminal, Download, Trash2, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { ScrollArea } from '../../../ui/scroll-area';
import CommandHistoryItem from './CommandHistoryItem';
import { welcomeMessage, terminalPrompt } from './data';
import type { TerminalWindowProps } from './types';

export default function TerminalWindow({
  history,
  command,
  onCommandChange,
  onExecute,
  onClearHistory,
  onExportHistory,
  onCopyCommand,
  onKeyDown,
  inputRef,
  scrollRef,
}: TerminalWindowProps) {
  return (
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
            <Button variant="outline" size="sm" onClick={onExportHistory}>
              <Download className="w-4 h-4 mr-2" />
              Експорт історії
            </Button>
            <Button variant="outline" size="sm" onClick={onClearHistory}>
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
                <p>{welcomeMessage.version}</p>
                <p className="text-slate-500">{welcomeMessage.helpText}</p>
                <p className="text-slate-500 mb-4">{welcomeMessage.navigationText}</p>
              </div>

              {/* Command History */}
              {history.map((entry) => (
                <CommandHistoryItem key={entry.id} entry={entry} onCopy={onCopyCommand} />
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-slate-700 p-4">
            <div className="flex items-center gap-2">
              <span className="text-lime-400 font-mono">{terminalPrompt}</span>
              <Input
                ref={inputRef}
                value={command}
                onChange={(e) => onCommandChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Введіть команду SQL або psql..."
                className="flex-1 bg-slate-800 border-slate-700 text-white font-mono placeholder:text-slate-500 focus-visible:ring-lime-600"
              />
              <Button
                size="sm"
                onClick={onExecute}
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
  );
}
