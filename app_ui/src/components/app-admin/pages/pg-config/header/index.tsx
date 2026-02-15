import { Power } from 'lucide-react';
import { Button } from '../../../../ui/button';
import RestartDialog from './RestartDialog';
import { useState } from 'react';


export default function PgConfigHeader() {
    const [restartDialogOpen, setRestartDialogOpen] = useState(false);

    const handleRestart = () => {
        console.log('Server restarted');
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-slate-900 text-2xl">Конфігурація PostgreSQL</h2>
                    <p className="text-slate-600 text-sm mt-1">
                        Управління параметрами сервера та налаштуваннями
                    </p>
                </div>
                <Button
                    variant="destructive"
                    size="lg"
                    className="gap-2"
                    onClick={() => setRestartDialogOpen(true)}
                >
                    <Power className="w-4 h-4" />
                    Перезапустити сервер
                </Button>
            </div>

            <RestartDialog
                open={restartDialogOpen}
                onOpenChange={setRestartDialogOpen}
                onRestart={handleRestart}
            />
        </>
    );
}
