
import { Plus } from 'lucide-react';
import { Button } from '../../../ui/button';

import RolesWidgets from './widgets';


export default function RolesManager() {
    const handleCreateRole = () => {
        
    };

    return (
        <div className="space-y-6">
            {/* Header with Create Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl text-slate-900">Управління ролями</h2>
                    <p className="text-sm text-slate-600 mt-1">Налаштування прав доступу та RBAC політик</p>
                </div>
                <Button
                    onClick={handleCreateRole}
                    className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Створити роль
                </Button>
            </div>

            <RolesWidgets />

            
        </div>
    );
}