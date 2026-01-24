import { Copy, Download, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../ui/card';
import { Button } from '../../../../ui/button';
import { useCliHistoryData } from './useCliHistoryData';
import { SkeletonTable } from '../../../../ui/skeletons';
import { copyToClipboard } from '../utils/exporters';

export default function CliHistory() {
    const { data :history, isLoading, error } = useCliHistoryData();

    if (isLoading) return <SkeletonTable rows={10} columns={6} showActions />;
    if (error) return <div>Error: {error.message}</div>;

    const handleCopyCommand = (cmd: string) => {
        copyToClipboard(cmd);
      };

    const handleExportHistory = () => {
        // TODO: Implement export history functionality
    };

    const handleClearHistory = () => {
        // TODO: Implement clear history functionality
    };

    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Історія</CardTitle>
                        <CardDescription>Історія виконаних команд</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleExportHistory}>
                            <Download className="w-4 h-4 mr-2" />
                            Експорт історії
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleClearHistory}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Очистити
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {history!.map((item) => (
                        <div
                            key={item.id}
                            className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
                            onClick={() => handleCopyCommand(item.cmd)}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <code className="text-sm text-slate-900 font-mono block mb-1">{item.cmd}</code>
                                    <p className="text-xs text-slate-600">{item.time}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-2 opacity-0 group-hover:opacity-100"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            handleCopyCommand(item.cmd);
                                        }}
                                    >
                                        <Copy className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
