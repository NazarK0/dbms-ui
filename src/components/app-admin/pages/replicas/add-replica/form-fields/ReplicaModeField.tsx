/**
 * ReplicaModeField Component
 * 
 * Select field for replication mode (async/sync).
 * 
 * @module form-fields/ReplicaModeField
 */

import { Label } from '../../../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../ui/select';

interface ReplicaModeFieldProps {
  /**
   * Current replication mode
   */
  value: 'async' | 'sync';
  
  /**
   * Change handler
   */
  onChange: (value: 'async' | 'sync') => void;
}

/**
 * Replication mode select field
 * 
 * Allows selection between asynchronous and synchronous replication modes.
 * 
 * **Modes:**
 * - **Async** - Higher performance, eventual consistency
 * - **Sync** - Lower performance, strong consistency
 * 
 * @example
 * ```tsx
 * <ReplicaModeField
 *   value={formData.replicationMode}
 *   onChange={(value) => updateField('replicationMode', value)}
 * />
 * ```
 */
export default function ReplicaModeField({ value, onChange }: ReplicaModeFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="replication-mode">Режим реплікації</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="replication-mode">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="async">Асинхронний</SelectItem>
          <SelectItem value="sync">Синхронний</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
