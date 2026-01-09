/**
 * ReplicaPortField Component
 * 
 * Input field for replica port number.
 * 
 * @module form-fields/ReplicaPortField
 */

import { Input } from '../../../../../ui/input';
import { Label } from '../../../../../ui/label';

interface ReplicaPortFieldProps {
  /**
   * Current port value
   */
  value: number;
  
  /**
   * Change handler
   */
  onChange: (value: number) => void;
}

/**
 * Port input field for replica configuration
 * 
 * @example
 * ```tsx
 * <ReplicaPortField
 *   value={formData.port}
 *   onChange={(value) => updateField('port', value)}
 * />
 * ```
 */
export default function ReplicaPortField({ value, onChange }: ReplicaPortFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="port">Port</Label>
      <Input 
        id="port" 
        type="number" 
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 5432)}
      />
    </div>
  );
}
