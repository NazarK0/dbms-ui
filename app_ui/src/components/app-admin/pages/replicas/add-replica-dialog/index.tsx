import { Button } from '../../../../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../../ui/dialog';
import { useReplicaForm } from './hooks/useReplicaForm';
import {
    ReplicaNameField,
    ReplicaHostField,
    ReplicaPortField,
    ReplicaLocationField,
    ReplicaModeField
} from './form-fields';
import type { AddReplicaFormData } from '../types';



export default function AddReplicaDialog() {
    const open = false;
    const { formData, updateField, handleSubmit } = useReplicaForm({
        onSubmit: (data: AddReplicaFormData) => {
            console.log('Adding replica with data:', data);

            // In a real app, this would make an API call to add the replica
        },
        onClose: () => {
            console.log('Add Replica Dialog closed');
        }
    });

    const onOpenChange = (open: boolean) => {
        console.log('Dialog open state changed:', open);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Додати кластер репліки</DialogTitle>
                    <DialogDescription>Налаштуйте новий сервер реплікації</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <ReplicaNameField
                        value={formData.name}
                        onChange={(value) => updateField('name', value)}
                    />

                    <ReplicaHostField
                        value={formData.host}
                        onChange={(value) => updateField('host', value)}
                    />

                    <ReplicaPortField
                        value={formData.port}
                        onChange={(value) => updateField('port', value)}
                    />

                    <ReplicaLocationField
                        value={formData.location}
                        onChange={(value) => updateField('location', value)}
                    />

                    <ReplicaModeField
                        value={formData.replicationMode}
                        onChange={(value) => updateField('replicationMode', value)}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Скасувати
                    </Button>
                    <Button onClick={handleSubmit}>
                        Додати репліку
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

