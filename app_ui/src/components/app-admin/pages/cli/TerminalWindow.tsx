import { Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import TerminalComponent from './TerminalComponent';

export default function TerminalWindow() {
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
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <TerminalComponent className="bg-slate-900 rounded-b-lg" />
      </CardContent>
    </Card>
  );
}