/**
 * ReplicaHostField Component
 * 
 * Input field for replica host address.
 * 
 * @module form-fields/ReplicaHostField
 */

import { Input } from '../../../../../ui/input';
import { Label } from '../../../../../ui/label';

interface ReplicaHostFieldProps {
  /**
   * Current host value
   */
  value: string;
  
  /**
   * Change handler
   */
  onChange: (value: string) => void;
}

/**
 * Host input field for replica configuration
 * 
 * @example
 * ```tsx
 * <ReplicaHostField
 *   value={formData.host}
 *   onChange={(value) => updateField('host', value)}
 * />
 * ```
 */
export default function ReplicaHostField({ value, onChange }: ReplicaHostFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="host">Host</Label>
      <Input 
        id="host" 
        placeholder="replica-4.example.com" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
