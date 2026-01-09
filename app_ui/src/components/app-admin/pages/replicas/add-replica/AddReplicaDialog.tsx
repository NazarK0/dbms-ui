/**
 * AddReplicaDialog Component
 * 
 * Dialog for adding new replica clusters to the database system.
 * Provides form interface for configuring replica name, host, port,
 * location, and replication mode.
 * 
 * @module AddReplicaDialog
 */

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

interface AddReplicaDialogProps {
  /**
   * Dialog open state
   */
  open: boolean;
  
  /**
   * Callback to change dialog open state
   */
  onOpenChange: (open: boolean) => void;
  
  /**
   * Callback executed on successful form submission
   */
  onSubmit?: (data: AddReplicaFormData) => void;
}

/**
 * Add Replica Dialog Component
 * 
 * Modal dialog for creating new database replica clusters.
 * Validates input and manages form state internally.
 * 
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * 
 * <AddReplicaDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   onSubmit={(data) => {
 *     console.log('New replica:', data);
 *     // Create replica via API
 *   }}
 * />
 * ```
 */
export default function AddReplicaDialog({ open, onOpenChange, onSubmit }: AddReplicaDialogProps) {
  const { formData, updateField, handleSubmit } = useReplicaForm({
    onSubmit,
    onClose: () => onOpenChange(false),
  });

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
